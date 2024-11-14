import {useState} from "react";
import {useAuth} from "../../../context/AuthContext.jsx";
import { Search, ChevronDown, Bell, User, Menu } from 'lucide-react';



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
                <h2 className="text-xl font-semibold">  <span className="text-cyan-500">Chào mừng đã đến với FPT NihonGo!</span></h2>
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
                        <a href="/reset" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Đổi mật khẩu</a>

                    </DropdownMenu>
                </div>

                <button onClick={logOut} className="p-2 hover:bg-gray-100 rounded-full text-red-600 transition duration-150">
                    Đăng xuất
                </button>
            </div>
        </header>
    );
};

export default Header