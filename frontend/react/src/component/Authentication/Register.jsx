import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader, CheckCircle } from 'lucide-react';
import { register } from "../../service/Authenticate.js";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        // Username validation
        if (!username.trim()) {
            newErrors.username = 'Vui lòng nhập tên người dùng';
        } else if (username.length < 3) {
            newErrors.username = 'Tên người dùng phải có ít nhất 3 ký tự';
        } else if (username.length > 50) {
            newErrors.username = 'Tên người dùng không được vượt quá 50 ký tự';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ in hoa';
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất 1 số';
        }

        // Confirm password validation
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        setValidationErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleInputChange = (field, value) => {
        // Update field value
        switch (field) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }

        // Clear field-specific validation error
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Clear general error message
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await register({ username, email, password, role: "USER" });
            setSuccess('Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Đăng ký thất bại');
            } else if (err.request) {
                setError('Máy chủ không có phản hồi, vui lòng thử lại');
            } else {
                setError('Có lỗi xảy ra, vui lòng thử lại');
            }
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-cyan-50">
            {/* Left side remains the same */}
            <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-teal-600 opacity-75" />
                <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                    <div className="w-24 h-24 bg-white rounded-full mb-8 flex items-center justify-center text-cyan-500 font-bold text-2xl">
                        <img src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/04/cropped-cropped-2021-FPTU-Long.png" alt="FPT Logo" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Tham gia ngay với</h1>
                    <h2 className="text-3xl font-bold mb-2">hệ thống học tập tiếng Nhật</h2>
                    <h3 className="text-3xl font-bold">hàng đầu Việt Nam</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="w-full max-w-lg mx-auto h-64 bg-white/20 rounded-t-full flex items-center justify-center text-white text-6xl">
                        日本語
                    </div>
                </div>
            </div>

            {/* Right side with validated register form */}
            <div className="w-1/3 flex items-center justify-center bg-white">
                <div className="w-full max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Đăng ký</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span>{success}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Tên người dùng
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 
                                    ${validationErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="abczyz"
                            />
                            {validationErrors.username && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500
                                    ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="abc@gmail.com"
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500
                                        ${validationErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-400" /> :
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    }
                                </button>
                            </div>
                            {validationErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500
                                        ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-400" /> :
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    }
                                </button>
                            </div>
                            {validationErrors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex items-center justify-center"
                            disabled={isLoading || success}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Đang xử lý...
                                </>
                            ) : (
                                'ĐĂNG KÝ'
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Bạn đã có tài khoản? <a href="/login" className="font-medium text-cyan-600 hover:underline">Đăng nhập</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;