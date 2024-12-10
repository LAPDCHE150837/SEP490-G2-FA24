import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, Home, AlertCircle } from 'lucide-react';

const AccessDenied = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                {/* Japanese Pattern Background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0L40 20L20 40z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '24px 24px'
                    }}/>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="mb-6 flex justify-center">
                        <div className="bg-red-100 p-3 rounded-full">
                            <LockKeyhole className="w-8 h-8 text-red-600" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Truy cập từ chối
                    </h1>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Không thể truy cập trang web này
                    </h2>

                    <div className="bg-red-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">Xin lỗi</span>
                        </div>
                        <p className="text-gray-600">
                            Bạn không có quyền truy cập vào trang này
                        </p>

                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                        Chuyển tiếp tới trang home trong<span className="font-bold text-red-600">{countdown}</span> s
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        <Home className="w-5 h-5" />
                        Trở về ngay
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4">
                    <div className="w-2 h-2 bg-red-200 rounded-full" />
                </div>
                <div className="absolute bottom-4 right-4">
                    <div className="w-2 h-2 bg-red-200 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;