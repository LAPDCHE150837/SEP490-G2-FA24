import React, {useEffect, useState} from 'react';
import { Eye, EyeOff, Loader, X } from 'lucide-react';
import {sendEmailToResetPassword} from "../../service/Authenticate.js";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Here you would make your API call
            await sendEmailToResetPassword({email, oldPassword: "", newPassword: ""})// Simulate API call
            setStatus({
                type: 'success',
                message: 'Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn.'
            });
            setEmail('');
        } catch (err) {
            setStatus({
                type: 'error',
                message: 'Có lỗi xảy ra, vui lòng thử lại.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold mb-6">Quên mật khẩu</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="reset-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>

                    {status.message && (
                        <div className={`mb-4 p-3 rounded ${
                            status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {status.message}
                        </div>
                    )}

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
                            'Gửi yêu cầu'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;