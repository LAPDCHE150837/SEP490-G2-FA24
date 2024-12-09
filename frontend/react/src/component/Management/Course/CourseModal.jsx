import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CourseModal = ({ isOpen, onClose, mode, courseData, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        level: '',
        imageUrl: '',
        totalLessons: 0,
        status: true,
        createdAt: '',
        updatedAt: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                title: '',
                description: '',
                level: '',
                imageUrl: '',
                totalLessons: 0,
                status: true,
                createdAt: '',
                updatedAt: ''
            });
            setErrors({});
        } else if (mode === 'edit' && courseData) {
            setFormData({
                title: courseData.title || '',
                description: courseData.description || '',
                level: courseData.level || '',
                imageUrl: courseData.imageUrl || '',
                totalLessons: courseData.totalLessons || 0,
                status: courseData.status ?? true,
                createdAt: courseData.createdAt || '',
                updatedAt: courseData.updatedAt || ''
            });
        }
    }, [isOpen, mode, courseData]);

    const validateForm = () => {
        const errors = {};
        if (!formData.title) {
            errors.title = 'Tên khóa học không được để trống';
        }
        if (!formData.description) {
            errors.description = 'Mô tả không được để trống';
        }
        if (!formData.level) {
            errors.level = 'Cấp độ không được để trống';
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

    const formatDateTime = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resizedImage = await resizeImage(file);
                setFormData({ ...formData, imageUrl: resizedImage });
            } catch (error) {
                console.error('Error handling image:', error);
            }
        }
    };

    const resizeImage = async (file, maxWidth = 800) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ratio = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * ratio;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Reduce quality to minimize base64 string length
                    resolve(canvas.toDataURL('image/jpeg', 0.5));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
                <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {mode === 'view' ? 'Chi tiết khóa học' :
                                    mode === 'edit' ? 'Sửa khóa học' : 'Thêm khóa học mới'}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {mode === 'view' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tên khóa học</label>
                                    <p className="mt-1">{courseData.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                                    <p className="mt-1">{courseData.description}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cấp độ</label>
                                    <p className="mt-1">{courseData.level}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                    <p className="mt-1">{courseData.status ? 'Đang hoạt động' : 'Không hoạt động'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Thời gian tạo</label>
                                    <p className="mt-1">{formatDateTime(courseData.createdAt)}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cập nhật lần cuối</label>
                                    <p className="mt-1">{formatDateTime(courseData.updatedAt)}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tên khóa học
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
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
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                                        Cấp độ
                                    </label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({...formData, level: e.target.value})}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.level ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    >
                                        <option value="">Chọn cấp độ</option>
                                        <option value="N5">N5</option>
                                        <option value="N4">N4</option>
                                        <option value="N3">N3</option>
                                        <option value="N2">N2</option>
                                        <option value="N1">N1</option>
                                    </select>
                                    {errors.level && (
                                        <p className="mt-1 text-sm text-red-600">{errors.level}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        URL ảnh khóa học
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                                        placeholder="Nhập URL ảnh (https://...)"
                                    />
                                    {formData.imageUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.imageUrl}
                                                alt="Course preview"
                                                className="max-h-40 rounded-lg"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x300?text=Invalid+Image+URL';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Số bài học
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.totalLessons}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            totalLessons: parseInt(e.target.value) || 0
                                        })}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                                        min="0"
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
                                                onChange={(e) => setFormData({...formData, status: e.target.checked})}
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

export default CourseModal;