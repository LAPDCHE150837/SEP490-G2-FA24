import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff, Loader, Check } from 'lucide-react';
import { resetPassword } from "../../service/Authenticate.js";

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
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        match: false
    });

    const validatePassword = (password, confirmPassword) => {
        const validation = {
            minLength: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            match: password === confirmPassword && password !== ''
        };
        setPasswordValidation(validation);
        return Object.values(validation).every(value => value);
    };

    const handlePasswordChange = (field, value) => {
        const newPasswords = {
            ...passwords,
            [field]: value
        };
        setPasswords(newPasswords);
        validatePassword(
            field === 'password' ? value : newPasswords.password,
            field === 'confirmPassword' ? value : newPasswords.confirmPassword
        );
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword(passwords.password, passwords.confirmPassword)) {
            setError('Vui lòng đảm bảo mật khẩu đáp ứng tất cả các yêu cầu');
            return;
        }

        setIsLoading(true);

        try {
            await resetPassword(token, {
                email: "",
                oldPassword: "",
                newPassword: passwords.password
            });
            setSuccess("Đổi mật khẩu thành công, đang chuyển tới trang đăng nhập");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError('Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.');
            console.error('Reset password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderPasswordRequirement = (met, text) => (
        <div className={`flex items-center space-x-2 ${met ? 'text-green-600' : 'text-gray-500'}`}>
            {met ? <Check size={16} /> : <div className="w-4 h-4 border rounded-full" />}
            <span className="text-sm">{text}</span>
        </div>
    );

    return (
        <div className="flex h-screen bg-cyan-50">
            {/* Left side remains unchanged */}
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

            {/* Right side with enhanced password form */}
            <div className="w-1/3 flex items-center justify-center bg-white">
                <div className="w-full max-w-md p-8">
                    <h2 className="text-2xl font-bold mb-6">Đặt lại mật khẩu</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu mới
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.password ? "text" : "password"}
                                    id="password"
                                    value={passwords.password}
                                    onChange={(e) => handlePasswordChange('password', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                    placeholder="••••••••"
                                    required
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
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

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Yêu cầu mật khẩu:
                            </h3>
                            {renderPasswordRequirement(passwordValidation.minLength, "Ít nhất 6 ký tự")}
                            {renderPasswordRequirement(passwordValidation.uppercase, "Ít nhất 1 chữ in hoa")}
                            {renderPasswordRequirement(passwordValidation.lowercase, "Ít nhất 1 chữ thường")}
                            {renderPasswordRequirement(passwordValidation.number, "Ít nhất 1 số")}
                            {renderPasswordRequirement(passwordValidation.match, "Mật khẩu xác nhận khớp")}
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 flex items-center justify-center
                                ${Object.values(passwordValidation).every(v => v)
                                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            disabled={isLoading || !Object.values(passwordValidation).every(v => v)}
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