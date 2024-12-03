import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Clock, Target, Award, TrendingUp, BookOpen } from 'lucide-react';

const StudyStats = () => {
    const [answerStats, setAnswerStats] = useState(null);
    const [userProgress, setUserProgress] = useState(null);

    useEffect(() => {
        // Fetch statistics data
        const fetchData = async () => {
            try {
                const [answersResponse, progressResponse] = await Promise.all([
                    fetch('http://localhost:8080/api/v1/user-answers'),
                    fetch('http://localhost:8080/api/v1/user-progress')
                ]);

                const answersData = await answersResponse.json();
                const progressData = await progressResponse.json();

                setAnswerStats(answersData);
                setUserProgress(progressData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Calculate category counts from user progress
    const calculateCategoryCounts = () => {
        if (!userProgress) return [];

        return [
            {
                name: 'Từ vựng',
                total: userProgress.reduce((sum, course) => sum + course.vocabularies.length, 0)
            },
            {
                name: 'Kanji',
                total: userProgress.reduce((sum, course) => sum + course.kanjis.length, 0)
            },
            {
                name: 'Ngữ pháp',
                total: userProgress.reduce((sum, course) => sum + course.grammars.length, 0)
            }
        ];
    };

    // Transform question stats for the chart
    const transformQuestionStats = () => {
        if (!answerStats?.questionStats) return [];

        return answerStats.questionStats.map(stat => ({
            name: stat.questionName,
            correctRate: stat.correctPercentage,
            incorrectRate: stat.incorrectPercentage
        }));
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Thống kê học tập</h2>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Tổng câu trả lời</p>
                            <p className="text-2xl font-bold">{answerStats?.totalAnswers || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Award className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Độ chính xác</p>
                            <p className="text-2xl font-bold">
                                {answerStats?.totalCorrectPercentage.toFixed(1) || 0}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <BookOpen className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Tổng khóa học</p>
                            <p className="text-2xl font-bold">{userProgress?.length || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Question Performance Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Hiệu suất câu hỏi</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={transformQuestionStats()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="correctRate" fill="#10b981" name="Tỷ lệ đúng" />
                                <Bar dataKey="incorrectRate" fill="#ef4444" name="Tỷ lệ sai" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Phân bố nội dung học tập</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={calculateCategoryCounts()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#3b82f6" name="Tổng số" />
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
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <span className="text-gray-600">Câu trả lời đúng</span>
                        </div>
                        <span className="text-xl font-bold">{answerStats?.totalCorrect || 0}</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Target className="h-5 w-5 text-red-500" />
                            <span className="text-gray-600">Câu trả lời sai</span>
                        </div>
                        <span className="text-xl font-bold">{answerStats?.totalIncorrect || 0}</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-600">Tổng từ vựng</span>
                        </div>
                        <span className="text-xl font-bold">
                            {userProgress?.reduce((sum, course) => sum + course.vocabularies.length, 0) || 0}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-purple-500" />
                            <span className="text-gray-600">Tổng ngữ pháp</span>
                        </div>
                        <span className="text-xl font-bold">
                            {userProgress?.reduce((sum, course) => sum + course.grammars.length, 0) || 0}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyStats;