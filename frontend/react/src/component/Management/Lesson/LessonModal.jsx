import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const LessonModal = ({ isOpen, onClose, mode, lessonData, courses, onSubmit }) => {
    const [formData, setFormData] = useState({
        course: { id: '' },
        title: '',
        description: '',
        orderIndex: 1,
        status: true
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                course: { id: '' },
                title: '',
                description: '',
                orderIndex: 1,
                status: true
            });
            setErrors({});
        } else if (mode === 'edit' && lessonData) {
            setFormData({
                course: { id: lessonData.courseId },  // Change from lessonData.course.id to lessonData.courseId
                title: lessonData.title,
                description: lessonData.description,
                orderIndex: lessonData.orderIndex,
                status: lessonData.status
            });
        }
    }, [isOpen, mode, lessonData]);

    const validateForm = () => {
        const errors = {};
        if (!formData.course.id) {
            errors.courseId = 'Vui lòng chọn khóa học';
        }
        if (!formData.title) {
            errors.title = 'Tên bài học không được để trống';
        }
        if (!formData.description) {
            errors.description = 'Mô tả không được để trống';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
                <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {mode === 'view' ? 'Chi tiết bài học' :
                                    mode === 'edit' ? 'Sửa bài học' : 'Thêm bài học mới'}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {mode === 'view' ? (
                            <div className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tên bài học</label>
                                    <p className="mt-1">{lessonData.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                                    <p className="mt-1">{lessonData.description}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Thứ tự</label>
                                    <p className="mt-1">{lessonData.orderIndex}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                    <p className="mt-1">{lessonData.status ? 'Hoạt động' : 'Không hoạt động'}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Khóa học
                                    </label>
                                    <select
                                        value={formData.course.id}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            course: { id: e.target.value }
                                        })}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.courseId ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    >
                                        <option value="">Chọn khóa học</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>
                                                {course.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.courseId && (
                                        <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tên bài học
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.title ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mô tả
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.description ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Thứ tự
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.orderIndex}
                                        onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 1 })}
                                        min="1"
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Trạng thái
                                    </label>
                                    <div className="mt-1">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                            <span className="ml-2">Hoạt động</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        {mode === 'edit' ? 'Cập nhật' : 'Thêm mới'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonModal;