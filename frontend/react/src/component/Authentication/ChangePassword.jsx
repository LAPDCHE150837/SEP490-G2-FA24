import React, { useState } from 'react';
import { Search, ChevronDown, Bell, User, Menu, Eye, EyeOff, Lock } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
    const { customer } = useAuth();
    return (
        <div
            className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:block bg-gray-900 text-white w-64 p-6 space-y-6 z-30`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                    <img src="/api/placeholder/40/40" alt="Riki Logo" className="w-10 h-10"/>
                    <h1 className="text-xl font-bold text-cyan-400">Minano Nihongo</h1>
                </div>
                <button onClick={onClose} className="lg:hidden">
                    <Menu size={24}/>
                </button>
            </div>
            <div className="flex items-center space-x-3 pb-6 border-b border-gray-700">
                <img src="/api/placeholder/48/48" alt="User Avatar" className="w-12 h-12 rounded-full"/>
                <div>
                    <p className="font-semibold">{customer?.username}</p>
                    <div className="flex items-center text-sm">
                        <span className="text-yellow-500 mr-1">●</span>
                        <span>0</span>
                        <span className="text-blue-500 mx-1">●</span>
                        <span>3</span>
                        <span className="text-green-500 ml-1">N4</span>
                    </div>
                </div>
            </div>
            <nav className="space-y-4">
                <NavItem icon="📊" text="Thống kê" />
                <NavItem icon="📚" text="Lớp học của tôi" />
                <NavItem icon="🎓" text="Khóa học" />
                <NavItem icon="❤️" text="Bài học video yêu thích" />
                <NavItem icon="🗂️" text="Flashcard" />
                <NavItem icon="📝" text="Ghi chú của tôi" />
            </nav>
            <div className="pt-6 border-t border-gray-700">
                <nav className="space-y-4">
                    <NavItem icon="🧪" text="Kiểm tra năng lực" />
                    <NavItem icon="🕒" text="Lịch sử làm bài" />
                </nav>
            </div>
        </div>
    );
};

// NavItem Component
const NavItem = ({ icon, text, active }) => (
    <a
        href="#"
        className={`flex items-center space-x-2 ${active ? 'text-cyan-400 font-semibold' : 'text-gray-300 hover:text-white'} transition duration-150`}
    >
        <span>{icon}</span>
        <span>{text}</span>
    </a>
);

// DropdownMenu Component
const DropdownMenu = ({ children, isOpen, position = "right" }) => (
    <div className={`
        absolute top-full mt-2 
        ${position === "right" ? "right-0" : "left-0"}
        w-48 bg-white rounded-lg shadow-lg 
        transition-all duration-200 ease-in-out
        ${isOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'}
        z-50
    `}>
        <div className="py-1">
            {children}
        </div>
    </div>
);

// Header Component
const Header = ({ onMenuClick }) => {
    const { logOut } = useAuth();
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center relative">
            <div className="flex items-center space-x-4">
                <button onClick={onMenuClick} className="lg:hidden">
                    <Menu size={24} />
                </button>
                <h2 className="text-xl font-semibold">Thay đổi mật khẩu</h2>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition duration-150"
                        onClick={() => {
                            setNotificationOpen(!notificationOpen);
                            setUserMenuOpen(false);
                        }}
                    >
                        <Bell size={20}/>
                    </button>
                    <DropdownMenu isOpen={notificationOpen}>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">Thông báo</div>
                        <div className="px-4 py-2 text-sm text-gray-500">Không có thông báo mới</div>
                    </DropdownMenu>
                </div>

                <div className="relative">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-full transition duration-150"
                        onClick={() => {
                            setUserMenuOpen(!userMenuOpen);
                            setNotificationOpen(false);
                        }}
                    >
                        <User size={20}/>
                    </button>
                    <DropdownMenu isOpen={userMenuOpen}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hồ sơ</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đổi mật khẩu</a>

                    </DropdownMenu>
                </div>

                <button onClick={logOut} className="p-2 hover:bg-gray-100 rounded-full text-red-600 transition duration-150">
                    Đăng xuất
                </button>
            </div>
        </header>
    );
};




// RecentCourse Component
const RecentCourse = ({ title, status }) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-3 hover:shadow-md transition duration-300">
        <span className="text-cyan-500 text-2xl">📘</span>
        <div>
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs text-cyan-500">{status}</p>
        </div>
    </div>
);

// Main Dashboard Component
const ChangePassword = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        // Clear error when user starts typing
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
                // Add your API call here
                // await changePassword(formData);
                setSuccessMessage('Đổi mật khẩu thành công!');
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } catch (error) {
                setErrors({
                    submit: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
                });
            }
            setIsSubmitting(false);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center space-x-2 mb-6">
                                <Lock className="text-cyan-500" size={24} />
                                <h2 className="text-xl font-semibold">Đổi mật khẩu</h2>
                            </div>

                            {successMessage && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">
                                    {successMessage}
                                </div>
                            )}

                            {errors.submit && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                                    {errors.submit}
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
                </main>
            </div>
        </div>
    );
};

export default ChangePassword;