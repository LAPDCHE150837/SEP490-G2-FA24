import React, {useEffect, useState} from 'react';
import { Lock, Eye, EyeOff,User  } from 'lucide-react';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/users/id', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setUserData(data.data);
                } else {
                    setError('Failed to load user data');
                }
            } catch (error) {
                setError('Error connecting to server');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="text-gray-500">Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.oldPassword) {
            newErrors.oldPassword = 'Vui lòng nhập mật khẩu cũ';
        }
        if (!formData.newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/users/change-password', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage('Đổi mật khẩu thành công!');
                    setFormData({
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                    setErrors({});
                } else {
                    setSuccessMessage('Mật khẩu cũ không chính xác!');
                }
            } catch (error) {
                setSuccessMessage("Có lỗi xảy ra")
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <User className="text-cyan-500" size={24}/>
                        <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}

                    {userData && (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="w-32 font-medium text-gray-700">Tên tài khoản:</span>
                                <span>{userData.username}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-32 font-medium text-gray-700">Email:</span>
                                <span>{userData.email}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <Lock className="text-cyan-500" size={24}/>
                        <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
                    </div>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-lg">
                            {successMessage}
                        </div>
                    )}


                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Old Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu cũ
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.old ? "text" : "password"}
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                    placeholder="Nhập mật khẩu cũ"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, old: !prev.old }))}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPasswords.old ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.oldPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.oldPassword}</p>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu mới
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                    placeholder="Nhập mật khẩu mới"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Xác nhận mật khẩu mới
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                                    placeholder="Xác nhận mật khẩu mới"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition duration-150 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;