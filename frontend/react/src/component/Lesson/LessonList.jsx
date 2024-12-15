import {useParams, useNavigate} from 'react-router-dom';
import {ArrowLeft, Book, ChevronLeft, GraduationCap} from 'lucide-react';
import React, {useState, useEffect} from 'react';
import {getLesson} from "../../service/Lesson.js";
import {getCourseById} from "../../service/Course.js";
import axios from "axios";

const LessonHeader = ({course, userTotal, contentsTotal}) => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold mb-2">{course?.title}</h1>
                <p className="text-gray-600">{course?.description}</p>
            </div>
            <div className="text-right">
                <div className="text-sm text-gray-500 mb-2">Trình độ: {course?.level}</div>
            </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                    Tiến độ khóa học
                </span>
                <span className="text-sm font-medium text-gray-700">
                    {userTotal}/{contentsTotal} ({contentsTotal > 0 ? Math.round((userTotal / contentsTotal) * 100) : 0}%)
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                        width: `${contentsTotal > 0 ? (userTotal / contentsTotal) * 100 : 0}%`
                    }}
                ></div>
            </div>
        </div>
    </div>
);

const LessonAccordionItem = ({lesson, index, courseId, navigate}) => (
    <div className="mb-2">
        <div className="bg-gray-100 rounded-lg p-4 cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div
                        className="bg-blue-100 text-blue-800 text-xl font-semibold rounded-full w-8 h-8 flex items-center justify-center">
                        {lesson.orderIndex || index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                </div>
                <button
                    onClick={() =>
                        navigate(`/courses/${courseId}/lessons/${lesson.id}`)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Bắt đầu học
                </button>
            </div>

            <div className="mt-4">
                <p className="text-gray-600 mb-4">{lesson.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Vocabulary Section */}
                    <div className="border bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-3">
                            <Book className="h-5 w-5 text-blue-500"/>
                            <h4 className="font-semibold">Từ vựng</h4>
                        </div>
                        <p className="text-gray-600">{lesson.vocabularies?.length || 0} từ mới</p>

                    </div>

                    {/* Grammar Section */}
                    <div className="border bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-3">
                            <GraduationCap className="h-5 w-5 text-green-500"/>
                            <h4 className="font-semibold">Ngữ pháp</h4>
                        </div>
                        <p className="text-gray-600">{lesson.grammars?.length || 0} cấu trúc</p>

                    </div>

                    {/* Kanji Section */}
                    <div className="border bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-3">
                            <Book className="h-5 w-5 text-red-500"/>
                            <h4 className="font-semibold">Kanji</h4>
                        </div>
                        <p className="text-gray-600">{lesson.kanjis?.length || 0} chữ Kanji</p>

                    </div>
                </div>

                {/* Progress Bar - You might want to add this to your API response */}

            </div>
        </div>
    </div>
);

const LessonList = () => {
    const {courseId} = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userTotal, setUserTotal] = useState(0);
    const [contentsTotal, setContentsTotal] = useState(0);
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });
    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}`)
                setLessons(response.data.data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                setCourse(response.data.data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
        fetchCourse();
    }, [courseId]);
    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const [userResponse, contentsResponse] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/user/total`,
                        getAuthConfig()
                    ),
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/contents/total`,
                        getAuthConfig()
                    )
                ]);

                setUserTotal(userResponse.data);
                setContentsTotal(contentsResponse.data);
            } catch (error) {
                console.error('Error fetching course totals:', error);
            }
        };

        fetchTotals();
    }, [courseId]);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Error: {error}</h2>
            </div>
        );
    }

    if (!lessons.length) {
        return (
            <>
                <div className="space-y-6">
                    <button
                        onClick={() => navigate(`/course`)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={24}/>
                        <span>Khóa học/Danh sách bài học</span>
                    </button>

                </div>
                <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-red-500">Không tìm thấy khóa học</h2>
                </div>
            </>
        );
    }

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(`/course`)}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={24}/>
                <span>Khóa học/Danh sách bài học</span>
            </button>
            <LessonHeader
                course={course}
                userTotal={userTotal}
                contentsTotal={contentsTotal}
            />

            <div className="space-y-2">


                {lessons.map((lesson, index) => (
                    <LessonAccordionItem
                        key={lesson.id}
                        lesson={lesson}
                        index={index}
                        courseId={courseId}
                        navigate={navigate}
                    />
                ))}
            </div>
        </div>
    );
};

export default LessonList;