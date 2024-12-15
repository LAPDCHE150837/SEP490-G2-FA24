import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Certificate() {
    const { certificateId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certificateData, setCertificateData] = useState(null);

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });

    useEffect(() => {
        const fetchCertificateData = async () => {
            try {
                setLoading(true);

                // Fetch achievement data
                const achievementResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-achievements/course/${certificateId}`,
                    getAuthConfig()
                );

                // Fetch course data
                const courseResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/${achievementResponse.data.data.courseId}`,
                    getAuthConfig()
                );

                const userResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${achievementResponse.data.data?.userId}`,
                    getAuthConfig()
                );

                // Format the data
                setCertificateData({
                    user: userResponse.data.data?.username,
                    email: userResponse.data.data?.email,
                    courseId: achievementResponse.data.data.courseId,
                    courseTitle: courseResponse.data.data.title,
                    courseDescription: courseResponse.data.data.description,
                    courseLevel: courseResponse.data.data.level,
                    courseTotalLessons: courseResponse.data.data.totalLessons
                });

            } catch (error) {
                console.error('Error fetching certificate data:', error);
                setError('Không thể tải thông tin chứng chỉ. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificateData();
    }, [certificateId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-500 text-center">
                    <h2 className="text-2xl font-bold mb-2">Lỗi</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!certificateData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500 text-center">
                    <h2 className="text-2xl font-bold mb-2">Không tìm thấy chứng chỉ</h2>
                    <p>Chứng chỉ không tồn tại hoặc bạn không có quyền truy cập.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white text-center">
                        <div className="flex justify-center mb-4">
                            <Award className="w-16 h-16" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Chứng chỉ hoàn thành</h1>
                        <p className="text-blue-100">Chứng nhận học viên đã hoàn thành khóa học</p>
                    </div>

                    <div className="p-8">
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8">
                                <p className="text-gray-600">Chúc mừng bạn đã hoàn thành xuất sắc khóa học</p>
                                <p className="font-semibold text-gray-800">{certificateData.courseTitle}</p>
                                <p className="text-gray-600 text-sm mb-1">Cấp độ: {certificateData.courseLevel}</p>
                                <p className="text-gray-600 text-sm mb-1">Tổng bài học: {certificateData.courseTotalLessons}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="text-center">
                                    <p className="text-gray-600 text-sm mb-1">Họ và tên</p>
                                    <p className="font-semibold text-gray-800">{certificateData.user}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-gray-600 text-sm mb-1">Email</p>
                                    <p className="font-semibold text-gray-800">{certificateData.email}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-8">
                                <div className="text-center">
                                    <p className="text-gray-600 text-sm mb-1">Mã chứng chỉ</p>
                                    <p className="text-gray-600 text-sm mb-1">{certificateId}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
