import React, { useState } from 'react';
import { Search, ChevronDown, Bell, User, Menu, BarChart3, Award, Book, BookOpen, AlignJustify, History, Brain, GraduationCap } from 'lucide-react';
import { useAuth } from "../../../context/AuthContext.jsx";
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon: Icon, text, path, isActive }) => {
    const location = useLocation();
    const active = isActive || location.pathname.startsWith(path);

    return (
        <Link
            to={path}
            className={`
                flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200
                group relative
                ${active
                ? 'text-cyan-400 font-semibold bg-cyan-500/10 border-r-4 border-cyan-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }
            `}
        >
            <div className="flex items-center">
                <Icon size={20} className={`${active ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`} />
            </div>
            <span className="font-medium">{text}</span>

            {/* Active indicator dot */}
            {active && (
                <div className="absolute left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full
                             transform -translate-x-1/2 top-1/2 -translate-y-1/2" />
            )}
        </Link>
    );
};

const Sidebar = ({ isOpen, onClose }) => {
    const { customer } = useAuth();
    const location = useLocation();

    const navigationItems = [
        { icon: BookOpen, text: 'Khóa học', path: '/course' },
        { icon: BarChart3, text: 'Thống kê', path: '/statistics' },
        { icon: Award, text: 'Thành tựu', path: '/achievements' },
        { icon: Brain, text: 'Ôn tập', path: '/review' },
        { icon: AlignJustify, text: 'Flashcard', path: '/flashcards' },
        { icon: Book, text: 'Bảng chữ cái', path: '/alphabet' },
    ];

    const bottomNavItems = [
        { icon: GraduationCap, text: 'Kiểm tra năng lực', path: '/assessment' },
        { icon: History, text: 'Lịch sử làm bài', path: '/history' }
    ];

    return (
        <div
            className={`
                fixed top-0 bottom-0 left-0
                lg:static
                w-64 h-screen
                bg-gray-900
                overflow-y-auto
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0
                z-30
                border-r border-gray-800/50
            `}
        >
            <div className="flex flex-col h-full p-6">
                {/* Logo Section */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center
                                    transition-transform duration-300 group-hover:scale-105">
                            <span className="text-xl font-bold text-cyan-400">日</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                 NihonGo!
                            </h1>
                            <p className="text-xs text-gray-500">Japanese Learning</p>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden hover:text-cyan-400 transition-colors"
                    >
                        <Menu size={24}/>
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="relative p-4 mb-6 rounded-xl bg-gray-800/50 border border-gray-700/50">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDMByswAybXBOBJ4Bl6lXfWn4vFsnpx4Iusw&s"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-xl ring-2 ring-cyan-400/30"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div>
                            <p className="font-semibold text-white">{customer?.username || 'User'}</p>
                            <div className="flex items-center space-x-2 mt-0.5">
                                <div className="flex items-center">
                                    <span className="text-yellow-500 mr-1">●</span>
                                    <span className="text-sm text-gray-400">120</span>
                                </div>
                                <div className="w-px h-3 bg-gray-700"></div>
                                <div className="px-1.5 py-0.5 text-xs font-medium text-green-400 bg-green-400/10 rounded">
                                    N4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    {navigationItems.map((item, index) => (
                        <NavItem key={index} {...item} />
                    ))}
                </nav>

                {/* Bottom Navigation */}
                <div className="pt-6 border-t border-gray-800/50">
                    <nav className="space-y-1">
                        {bottomNavItems.map((item, index) => (
                            <NavItem key={index} {...item} />
                        ))}
                    </nav>

                    {/* Version */}
                    <div className="mt-6 px-3 py-3 rounded-lg bg-gray-800/30">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Version</span>
                            <span className="text-xs font-medium text-cyan-400">1.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;