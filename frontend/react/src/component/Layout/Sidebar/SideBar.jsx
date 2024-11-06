    import React, { useState } from 'react';
import { Search, ChevronDown, Bell, User, Menu } from 'lucide-react';
import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, text, path, isActive }) => {
    const location = useLocation();
    const active = isActive || location.pathname === path;

    return (
        <Link
            to={path}
            className={`
                flex items-center space-x-2 p-2 rounded-lg transition-all duration-200
                ${active
                ? 'text-cyan-400 font-semibold bg-cyan-500/10 border-r-4 border-cyan-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }
            `}
        >
            <span className="text-xl">{icon}</span>
            <span>{text}</span>
        </Link>
    );
};

const Sidebar = ({ isOpen, onClose }) => {
    const { customer } = useAuth();
    const location = useLocation();

    const navigationItems = [
        { icon: '📊', text: 'Khóa học của tôi', path: '/dashboard' },
        { icon: '📊', text: 'Thống kê', path: '/statistics' },
        { icon: '🎓', text: 'Khóa học', path: '/courses' },
        { icon: '❤️', text: 'Video yêu thích', path: '/favorite-videos' },
        { icon: '🗂️', text: 'Flashcard', path: '/flashCardLession' },
        { icon: '📝', text: 'Ghi chú của tôi', path: '/notes' },
        { icon: '🔠', text: 'Bảng chữ cái', path: '/alphabet' }

    ];

    const bottomNavItems = [
        { icon: '🧪', text: 'Kiểm tra năng lực', path: '/assessment' },
        { icon: '🕒', text: 'Lịch sử làm bài', path: '/history' }
    ];

    return (
        <div
            className={`
                fixed inset-y-0 left-0 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:relative lg:translate-x-0 transition duration-200 ease-in-out 
                lg:block bg-gray-900 text-white w-64 p-6 space-y-6 z-30
            `}
        >
            {/* Logo Section */}
            <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center space-x-2 group">
                    <img
                        src="/api/placeholder/40/40"
                        alt="Riki Logo"
                        className="w-10 h-10 transition-transform duration-300 group-hover:scale-105"
                    />
                    <h1 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        NihonGo!
                    </h1>
                </Link>
                <button
                    onClick={onClose}
                    className="lg:hidden hover:text-cyan-400 transition-colors"
                >
                    <Menu size={24}/>
                </button>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-3 pb-6 border-b border-gray-700/50">
                <img
                    src="/api/placeholder/48/48"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full ring-2 ring-cyan-400/30"
                />
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

            {/* Main Navigation */}
            <nav className="space-y-1">
                {navigationItems.map((item, index) => (
                    <NavItem
                        key={index}
                        {...item}
                    />
                ))}
            </nav>

            {/* Bottom Navigation */}
            <div className="pt-6 border-t border-gray-700/50">
                <nav className="space-y-1">
                    {bottomNavItems.map((item, index) => (
                        <NavItem
                            key={index}
                            {...item}
                        />
                    ))}
                </nav>
            </div>

            {/* Version or Additional Info */}
            <div className="absolute bottom-4 left-0 right-0 px-6 text-center">
                <p className="text-xs text-gray-500">
                    Version 1.0.0
                </p>
            </div>
        </div>
    );
};

export default Sidebar;