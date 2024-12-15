import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Clock, Target, Award, TrendingUp, BookOpen } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const StudyStats = () => {
    const [answerStats, setAnswerStats] = useState(null);
    const [userProgress, setUserProgress] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const [courseNames, setCourseNames] = useState({});
    const navigate = useNavigate();
    // Add this useEffect to fetch certificates
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                // First get all certificates
                const certificatesResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-achievements`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                        }
                    }
                );

                // Then fetch course details for each certificate
                const courseDetailsPromises = certificatesResponse.data.map(cert =>
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/${cert.courseId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                            }
                        }
                    )
                );

                const courseResponses = await Promise.all(courseDetailsPromises);

                // Create course map with full details
                const courseMap = {};
                courseResponses.forEach(response => {
                    const courseData = response.data.data;
                    courseMap[courseData.id] = {
                        title: courseData.title,
                        level: courseData.level,
                        description: courseData.description
                    };
                });

                setCertificates(certificatesResponse.data);
                setCourseNames(courseMap);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            }
        };

        fetchCertificates();
    }, []);    useEffect(() => {
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


            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Question Performance Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Chứng chỉ đã đạt được</h3>
                        <span className="text-sm text-gray-500">{certificates.length} chứng chỉ</span>
                    </div>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Award className="h-5 w-5 text-blue-600"/>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            {courseNames[cert.courseId]?.title || 'Loading...'}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            Level: {courseNames[cert.courseId]?.level}
                                        </p>

                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/certificate/${cert.id}`)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    Xem chứng chỉ
                                </button>
                            </div>
                        ))}                        {certificates.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Chưa có chứng chỉ nào
                        </div>
                    )}
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
                            <BookOpen className="h-5 w-5 text-blue-500"/>
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
                            <BookOpen className="h-5 w-5 text-purple-500"/>
                            <span className="text-gray-600">Tổng ngữ pháp</span>
                        </div>
                        <span className="text-xl font-bold">
                            {userProgress?.reduce((sum, course) => sum + course.grammars.length, 0) || 0}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5 text-purple-500"/>
                            <span className="text-gray-600">Tổng hán tự</span>
                        </div>
                        <span className="text-xl font-bold">
                            {userProgress?.reduce((sum, course) => sum + course.kanjis.length, 0) || 0}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyStats;