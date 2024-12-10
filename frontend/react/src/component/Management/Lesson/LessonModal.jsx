import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

const LessonModal = ({ isOpen, onClose, mode, lessonData, courses, onSubmit }) => {
    const [formData, setFormData] = useState({
        course: { id: '' },
        title: '',
        description: '',
        orderIndex: 1,
        imageUrl: '',
        status: true,
        videoUrl: '',
        videoFile: null,
        isDeleted:true
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                course: { id: '' },
                title: '',
                description: '',
                orderIndex: 1,
                imageUrl: '',
                status: true,
                videoUrl: '',
                videoFile: null,
                isDeleted:true

            });
            setErrors({});
        } else if (mode === 'edit' && lessonData) {
            setFormData({
                course: { id: lessonData.courseId },
                title: lessonData.title,
                description: lessonData.description,
                imageUrl: lessonData.imageUrl,
                orderIndex: lessonData.orderIndex,
                status: lessonData.status,
                videoUrl: lessonData.videoUrl || '',
                videoFile: null
            });
        }
    }, [isOpen, mode, lessonData]);

    const validateForm = () => {
        const errors = {};
        if (!formData.course.id) errors.courseId = 'Vui lòng chọn khóa học';
        if (!formData.title) errors.title = 'Tên bài học không được để trống';
        if (!formData.description) errors.description = 'Mô tả không được để trống';
        if (!formData.videoUrl && !formData.videoFile && mode === 'add') {
            errors.video = 'Vui lòng tải lên video bài học';
        }
        return errors;
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                videoFile: file,
                videoUrl: URL.createObjectURL(file)
            });
        }
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
                                    <label className="block text-sm font-medium text-gray-700">Video bài học</label>
                                    {lessonData.videoUrl && (
                                        <video
                                            controls
                                            className="mt-2 w-full rounded-lg"
                                            src={lessonData.videoUrl}
                                        />
                                    )}
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
                                        Video bài học
                                    </label>
                                    <div className="mt-1">
                                        <div className="flex items-center justify-center w-full">
                                            <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
                                                errors.video ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
                                            } hover:bg-gray-100`}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-4 text-gray-500"/>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click để tải lên</span> hoặc kéo thả video
                                                    </p>
                                                    <p className="text-xs text-gray-500">MP4, WebM hoặc Ogg</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="video/*"
                                                    onChange={handleVideoChange}
                                                />
                                            </label>
                                        </div>
                                        {formData.videoUrl && (
                                            <video
                                                controls
                                                className="w-full h-full rounded-lg"
                                                src={`http://localhost:8080/api/v1/lessons/video/${formData.id}`}
                                            />
                                        )}
                                        {errors.video && (
                                            <p className="mt-1 text-sm text-red-600">{errors.video}</p>
                                        )}
                                    </div>
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