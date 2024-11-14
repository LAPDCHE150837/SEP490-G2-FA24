import React, { useState } from 'react';
import { Brain, Clock, Calendar, BarChart2, ChevronRight, Timer } from 'lucide-react';
import {DashboardLayout} from "../Layout/DashBoardLayout.jsx";

const SmartReview = () => {
    // Mock review data - will come from backend later
    const [dueCards, setDueCards] = useState([
        {
            id: 1,
            front: "私",
            type: "kanji",
            back: {
                reading: "わたし",
                meaning: "Tôi",
                example: "私は学生です。"
            },
            dueDate: new Date(),
            interval: 1, // days
            repetitions: 2,
            easeFactor: 2.5
        },
        // Add more cards...
    ]);

    const reviewStats = {
        dueToday: 15,
        dueThisWeek: 45,
        averageAccuracy: 85,
        cardsReviewed: 120,
        streakDays: 7
    };

    const timeSlots = [
        { id: 'morning', label: 'Buổi sáng', time: '8:00', cardsDue: 5 },
        { id: 'afternoon', label: 'Buổi chiều', time: '14:00', cardsDue: 5 },
        { id: 'evening', label: 'Buổi tối', time: '20:00', cardsDue: 5 }
    ];

    const calculateNextReview = (quality) => {
        // Implement SuperMemo-2 Algorithm
        // quality: 0-5 (0 = complete blackout, 5 = perfect recall)
        const intervals = [0, 1, 3, 7, 14, 30]; // days
        return intervals[quality];
    };

    const handleStartReview = (timeSlot) => {
        // Navigate to review session
        console.log(`Starting review for ${timeSlot.label}`);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Ôn tập thông minh</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date().toLocaleDateString('vi-VN')}</span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Brain className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Cần ôn tập hôm nay</p>
                            <p className="text-2xl font-bold">{reviewStats.dueToday} thẻ</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <BarChart2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Độ chính xác trung bình</p>
                            <p className="text-2xl font-bold">{reviewStats.averageAccuracy}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Chuỗi ngày ôn tập</p>
                            <p className="text-2xl font-bold">{reviewStats.streakDays} ngày</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Schedule */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Lịch ôn tập hôm nay</h3>
                </div>
                <div className="divide-y">
                    {timeSlots.map((slot) => (
                        <div key={slot.id} className="p-6 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <Timer className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{slot.label}</h4>
                                    <p className="text-sm text-gray-600">{slot.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="font-semibold">{slot.cardsDue} thẻ</p>
                                    <p className="text-sm text-gray-600">cần ôn tập</p>
                                </div>
                                <button
                                    onClick={() => handleStartReview(slot)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                                >
                                    <span>Bắt đầu</span>
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Progress */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Tiến độ tuần này</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-500 rounded-full h-3"
                                style={{ width: `${(reviewStats.cardsReviewed / reviewStats.dueThisWeek) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="text-gray-600">
                        <span className="font-semibold">{reviewStats.cardsReviewed}</span>
                        <span className="text-gray-400"> / {reviewStats.dueThisWeek} thẻ</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartReview;