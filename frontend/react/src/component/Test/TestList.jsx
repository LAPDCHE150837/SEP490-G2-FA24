import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Trophy } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const TestListUser = () => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuthConfig = () => ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/tests', getAuthConfig());
                if (!response.ok) {
                    throw new Error('Failed to fetch tests');
                }
                const result = await response.json();
                if (result.code === 'MSG000000') {
                    // Filter tests for the current lesson
                    const lessonTests = result.data.filter(test => test.lessonId === lessonId);
                    setTests(lessonTests);
                } else {
                    throw new Error(result.message);
                }
            } catch (err) {
                setError(err.message);
                if (err.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, [lessonId, navigate]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                Error: {error}
            </div>
        );
    }

    if (tests.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Không có bài kiểm tra nào cho bài học này
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button
                    onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}`)}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ChevronLeft className="h-5 w-5" />
                    <span>Quay lại bài học</span>
                </button>
                <h1 className="text-2xl font-bold">Danh sách bài kiểm tra</h1>
            </div>

            {/* Test List */}
            <div className="space-y-4">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{test.title}</h3>
                                    <p className="text-gray-600 mb-4">{test.description}</p>
                                    <div className="flex space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>{test.duration} phút</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Trophy className="h-4 w-4 mr-1" />
                                            <span>Điểm đạt: {test.passScore}/100</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test/${test.id}`)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Bắt đầu
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestListUser;