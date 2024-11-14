// EditCourseDialog.jsx
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCourse } from '../../../service/Course.js';

const EditCourseDialog = ({ isOpen, onClose, course }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        courseName: '',
        description: ''
    });

    useEffect(() => {
        if (course) {
            setFormData({
                courseName: course.courseName,
                description: course.description
            });
        }
    }, [course]);

    const updateMutation = useMutation({
        mutationFn: ({ courseId, data }) => updateCourse(courseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            onClose();
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({
            courseId: course.id,
            data: formData
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Sửa khóa học</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tên khóa học
                        </label>
                        <input
                            type="text"
                            value={formData.courseName}
                            onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            disabled={updateMutation.isPending}
                        >
                            {updateMutation.isPending ? 'Đang lưu...' : 'Lưu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCourseDialog;