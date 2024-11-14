import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Clock, Target, Award, TrendingUp, BookOpen } from 'lucide-react';
import {DashboardLayout} from "../Layout/DashBoardLayout.jsx";

const StudyStats = () => {
    // Mock data - will come from backend later
    const dailyProgress = [
        { date: '3/1', minutes: 20, cards: 30, accuracy: 75 },
        { date: '3/2', minutes: 25, cards: 40, accuracy: 80 },
        { date: '3/3', minutes: 15, cards: 25, accuracy: 85 },
        { date: '3/4', minutes: 30, cards: 45, accuracy: 82 },
        { date: '3/5', minutes: 35, cards: 50, accuracy: 88 },
        { date: '3/6', minutes: 40, cards: 55, accuracy: 90 },
        { date: '3/7', minutes: 20, cards: 35, accuracy: 85 },
    ];

    const cardsByCategory = [
        { name: 'Từ vựng', mastered: 150, learning: 80, new: 50 },
        { name: 'Kanji', mastered: 75, learning: 45, new: 30 },
        { name: 'Ngữ pháp', mastered: 45, learning: 25, new: 15 },
    ];

    const stats = {
        totalMinutes: 185,
        cardsReviewed: 280,
        averageAccuracy: 83.6,
        currentStreak: 7,
        totalSets: 12,
        masteredCards: 270
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Thống kê học tập</h2>
                <select className="border rounded-lg px-3 py-2">
                    <option value="7">7 ngày qua</option>
                    <option value="30">30 ngày qua</option>
                    <option value="90">90 ngày qua</option>
                </select>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Thời gian học</p>
                            <p className="text-2xl font-bold">{stats.totalMinutes} phút</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Target className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Độ chính xác</p>
                            <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Chuỗi ngày học</p>
                            <p className="text-2xl font-bold">{stats.currentStreak} ngày</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Progress Line Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Tiến độ học tập</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyProgress}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="cards"
                                    stroke="#3b82f6"
                                    name="Số thẻ"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="accuracy"
                                    stroke="#10b981"
                                    name="Độ chính xác (%)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Phân bố theo loại thẻ</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cardsByCategory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="mastered" stackId="a" fill="#10b981" name="Đã thuộc" />
                                <Bar dataKey="learning" stackId="a" fill="#3b82f6" name="Đang học" />
                                <Bar dataKey="new" stackId="a" fill="#6b7280" name="Chưa học" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-600">Tổng số bộ thẻ</span>
                        </div>
                        <span className="text-xl font-bold">{stats.totalSets}</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <span className="text-gray-600">Thẻ đã học</span>
                        </div>
                        <span className="text-xl font-bold">{stats.cardsReviewed}</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <span className="text-gray-600">Thẻ đã thuộc</span>
                        </div>
                        <span className="text-xl font-bold">{stats.masteredCards}</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Target className="h-5 w-5 text-purple-500" />
                            <span className="text-gray-600">Độ chính xác TB</span>
                        </div>
                        <span className="text-xl font-bold">{stats.averageAccuracy}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyStats;