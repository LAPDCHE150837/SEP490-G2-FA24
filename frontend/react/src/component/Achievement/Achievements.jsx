import React, { useState } from 'react';
import { Trophy, Star, Target, Calendar, Clock, Zap, BookOpen, Award } from 'lucide-react';
import {DashboardLayout} from "../Layout/DashBoardLayout.jsx";

const AchievementCard = ({ icon: Icon, title, description, progress, max, unlocked }) => {
    return (
        <div className={`bg-white rounded-lg p-6 border ${unlocked ? 'border-yellow-400' : 'border-gray-200'}`}>
            <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                    unlocked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                }`}>
                    <Icon size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`rounded-full h-2 ${
                                unlocked ? 'bg-yellow-400' : 'bg-blue-500'
                            }`}
                            style={{ width: `${(progress / max) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-600">{progress} / {max}</span>
                        {unlocked && <span className="text-yellow-600">Đã đạt được!</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Achievements = () => {
    // Mock achievements data - will come from backend later
    const achievements = [
        {
            id: 1,
            icon: Trophy,
            title: "Học sinh chăm chỉ",
            description: "Học tập 7 ngày liên tiếp",
            progress: 5,
            max: 7,
            unlocked: false,
            category: "streak"
        },
        {
            id: 2,
            icon: Star,
            title: "Bậc thầy từ vựng",
            description: "Thuộc 100 từ vựng",
            progress: 100,
            max: 100,
            unlocked: true,
            category: "vocabulary"
        },
        {
            id: 3,
            icon: Target,
            title: "Độ chính xác cao",
            description: "Đạt độ chính xác 90% trong 5 bài kiểm tra liên tiếp",
            progress: 3,
            max: 5,
            unlocked: false,
            category: "accuracy"
        },
        {
            id: 4,
            icon: Calendar,
            title: "Thói quen học tập",
            description: "Hoàn thành ít nhất 1 bài học trong 30 ngày",
            progress: 25,
            max: 30,
            unlocked: false,
            category: "streak"
        },
        {
            id: 5,
            icon: Clock,
            title: "Thời gian vàng",
            description: "Học tập tổng cộng 24 giờ",
            progress: 18,
            max: 24,
            unlocked: false,
            category: "time"
        },
        {
            id: 6,
            icon: Zap,
            title: "Tốc độ ánh sáng",
            description: "Hoàn thành 10 bài học trong 1 ngày",
            progress: 10,
            max: 10,
            unlocked: true,
            category: "speed"
        },
        {
            id: 7,
            icon: BookOpen,
            title: "Kanji Master",
            description: "Học thuộc 50 Kanji",
            progress: 35,
            max: 50,
            unlocked: false,
            category: "kanji"
        },
        {
            id: 8,
            icon: Award,
            title: "Chiến binh JLPT",
            description: "Hoàn thành toàn bộ khóa học N5",
            progress: 80,
            max: 100,
            unlocked: false,
            category: "course"
        }
    ];

    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'Tất cả' },
        { id: 'unlocked', label: 'Đã đạt được' },
        { id: 'locked', label: 'Chưa đạt được' },
        { id: 'streak', label: 'Chuỗi ngày' },
        { id: 'vocabulary', label: 'Từ vựng' },
        { id: 'kanji', label: 'Kanji' },
        { id: 'course', label: 'Khóa học' }
    ];

    const filteredAchievements = achievements.filter(achievement => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'unlocked') return achievement.unlocked;
        if (activeFilter === 'locked') return !achievement.unlocked;
        return achievement.category === activeFilter;
    });

    return (

        <div className="space-y-6 p-6">
            {/* Header with Progress Overview */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Thành tích của tôi</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-yellow-400 rounded-full h-3"
                                style={{ width: '35%' }}
                            />
                        </div>
                    </div>
                    <div className="text-gray-600">
                        <span className="font-semibold">7</span> / 20 thành tích
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-full ${
                            activeFilter === filter.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAchievements.map(achievement => (
                    <AchievementCard
                        key={achievement.id}
                        icon={achievement.icon}
                        title={achievement.title}
                        description={achievement.description}
                        progress={achievement.progress}
                        max={achievement.max}
                        unlocked={achievement.unlocked}
                    />
                ))}
            </div>
        </div>
    );

};

export default Achievements;