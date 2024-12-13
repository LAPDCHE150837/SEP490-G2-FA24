import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import ForgotPasswordModal from "./ForgotPasswordModal.jsx";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = () => {
        const newErrors = {
            username: '',
            password: ''
        };

        // Username validation
        if (!username.trim()) {
            newErrors.username = 'Vui lòng nhập tài khoản';
        } else if (username.trim().length < 3) {
            newErrors.username = 'Tài khoản phải có ít nhất 3 ký tự';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setValidationErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const handleInputChange = (field, value) => {
        if (field === 'username') {
            setUsername(value);
        } else if (field === 'password') {
            setPassword(value);
        }

        // Clear validation error when user types
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
        // Clear general error message when user types
        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await login({ username, password });
            navigate('/course');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Tài khoản hoặc mật khẩu không đúng');
            } else if (err.request) {
                setError('Máy chủ không có phản hồi, vui lòng thử lại');
            } else {
                setError('Có lỗi xảy ra, vui lòng thử lại.');
            }
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-cyan-50">
            {/* Left side with illustration */}
            <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-teal-600 opacity-75" />
                <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                    <div className="w-24 h-24 bg-white rounded-full mb-8 flex items-center justify-center text-cyan-500 font-bold text-2xl">
                        <img src="https://daihoc.fpt.edu.vn/wp-content/uploads/2023/04/cropped-cropped-2021-FPTU-Long.png" alt="FPT Logo" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Chào mừng bạn đến với</h1>
                    <h2 className="text-3xl font-bold mb-2">hệ thống học tập tiếng Nhật</h2>
                    <h3 className="text-3xl font-bold">hàng đầu Việt Nam</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="w-full max-w-lg mx-auto h-64 bg-white/20 rounded-t-full flex items-center justify-center text-white text-6xl">
                        日本語
                    </div>
                </div>
            </div>

            {/* Right side with login form */}
            <div className="w-1/3 flex items-center justify-center bg-white">
                <div className="w-full max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Tài khoản
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 
                                    ${validationErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="abc"
                            />
                            {validationErrors.username && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>
                            )}
                        </div>
                        <div className="mb-6">
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
                        <div className="flex items-center justify-between mb-6">
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsForgotPasswordOpen(true);
                                }}
                                href="#"
                                className="text-sm text-cyan-600 hover:underline cursor-pointer"
                            >
                                Quên mật khẩu?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    Đang xử lý...
                                </>
                            ) : (
                                'ĐĂNG NHẬP'
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Bạn chưa có tài khoản? <a href="/register" className="font-medium text-cyan-600 hover:underline">Đăng ký ngay</a>
                    </p>
                </div>
            </div>
            <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
            />
        </div>
    );
};

export default LoginPage;