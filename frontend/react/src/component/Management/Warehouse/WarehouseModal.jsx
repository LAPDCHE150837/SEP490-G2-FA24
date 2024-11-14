
// components/Users/Modal/UserModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

const WarehouseModal = ({ isOpen, onClose, mode, userData, onSubmit }) => {
    const [formData, setFormData] = useState(userData || {
        name: '',
        address: '',
        size: '',
        status: '',
        description: '',
        warehouse_manager_id: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setErrors({});
            if (!userData) {
                setFormData({
                    name: '',
                    address: '',
                    size: '',
                    status: '',
                    description: '',
                    warehouse_manager_id: ''
                });
            }
        }
    }, [isOpen, userData]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Tên không được để trống';
        if (!formData.address) newErrors.address = 'Tên không được để trống';


        if (!formData.size) newErrors.size = 'Kích cỡ không được để trống';
        if (!formData.description) newErrors.description = 'Miểu tả không được để trống';
        return newErrors;
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    if (!isOpen) return null;

    const inputClasses = (error) => `
mt-1 block w-full rounded-xl border
${error ? 'border-red-300' : 'border-gray-300'}
px-3 py-2
focus:outline-none focus:ring-2
${error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'}
transition-colors
    `;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0  backdrop-blur-sm transition-opacity z-40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="fixed inset-0 z-50 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex min-h-screen items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-md shadow-xl transform transition-all animate-modal">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                                    {mode === 'create' ? 'Thêm mới kho' : 'Sửa thông tin kho'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label="Đóng"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tên kho
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputClasses(errors.name)}
                                        placeholder="Nhập họ tên"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={inputClasses(errors.address)}
                                        placeholder="example@email.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>

                                {/* Size Fields  */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Kích cỡ
                                    </label>
                                    <input
                                        type="number"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className={inputClasses(errors.size)}
                                        placeholder="0123456789"
                                    />
                                    {errors.size && (
                                        <p className="mt-1 text-sm text-red-600">{errors.size}</p>
                                    )}
                                </div>

                                {/* Trạng thái */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Trạng thái
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={inputClasses(errors.gender)}
                                    >
                                        <option value="">Chọn trạng thái</option>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="UNACTIVE">UNACTIVE</option>
                                    </select>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mô tả
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className={inputClasses(errors.description)}
                                        placeholder="Nhập mô tả"
                                    />
                                </div>



                                {/* Form Actions */}
                                <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700
                                                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                                 focus:ring-indigo-500 transition-colors"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl
                                                 hover:bg-indigo-700 focus:outline-none focus:ring-2
                                                 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                    >
                                        {mode === 'create' ? 'Thêm mới' : 'Cập nhật'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WarehouseModal;




