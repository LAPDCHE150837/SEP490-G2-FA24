import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {CheckCircle, Eye, EyeOff, Loader} from 'lucide-react';
import {resetPassword} from "../../service/Authenticate.js";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        confirmPassword: false
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (passwords.password !== passwords.confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        // Validate password strength
        if (passwords.password.length < 8) {
            setError('Mật khẩu phải có ít nhất 8 ký tự');
            return;
        }

        setIsLoading(true);

        try {
            // Here you would make your API call to reset the password
            // await resetPassword({ token, newPassword: passwords.password });
            await resetPassword(token, {email: "",oldPassword: "", newPassword:  passwords.password})
            // Show success message and redirect
            setSuccess("Đổi mật khẩu thành công, đang chuyển tới trang đăng nhập")
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 3 seconds
        } catch (err) {
            setError('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.');
            console.error('Reset password error:', err);
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
                    <h1 className="text-4xl font-bold mb-4">Đặt lại mật khẩu</h1>
                    <h2 className="text-3xl font-bold mb-2">Tạo mật khẩu mới</h2>
                    <h3 className="text-3xl font-bold">cho tài khoản của bạn</h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="w-full max-w-lg mx-auto h-64 bg-white/20 rounded-t-full flex items-center justify-center text-white text-6xl">
                        日本語
                    </div>
                </div>
            </div>

            {/* Right side with reset password form */}
            <div className="w-1/3 flex items-center justify-center bg-white">
                <div className="w-full max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Đặt lại mật khẩu</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center" role="alert">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span>{success}</span>
                        </div>
                    )}                    <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.password ? "text" : "password"}
                                id="password"
                                value={passwords.password}
                                onChange={(e) => setPasswords(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({
                                    ...prev,
                                    password: !prev.password
                                }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.password ?
                                    <EyeOff className="h-5 w-5 text-gray-400" /> :
                                    <Eye className="h-5 w-5 text-gray-400" />
                                }
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({
                                    ...prev,
                                    confirmPassword: !prev.confirmPassword
                                }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.confirmPassword ?
                                    <EyeOff className="h-5 w-5 text-gray-400" /> :
                                    <Eye className="h-5 w-5 text-gray-400" />
                                }
                            </button>
                        </div>
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
                            'ĐẶT LẠI MẬT KHẨU'
                        )}
                    </button>
                </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Quay lại trang <a href="/login" className="font-medium text-cyan-600 hover:underline">đăng nhập</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;