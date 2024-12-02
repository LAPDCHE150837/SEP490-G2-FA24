import { useParams, useNavigate } from 'react-router-dom';
import { Book, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import {getLesson} from "../../service/Lesson.js";
import {getCourseById} from "../../service/Course.js";
import axios from "axios";

const LessonHeader = ({ course }) => (
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
    </div>
);

const LessonAccordionItem = ({ lesson, index, courseId, navigate }) => (
    <div className="mb-2">
        <div className="bg-gray-100 rounded-lg p-4 cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 text-blue-800 text-xl font-semibold rounded-full w-8 h-8 flex items-center justify-center">
                        {lesson.orderIndex || index + 1}
                    </div>
                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                </div>
                <button
                    onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
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
                            <Book className="h-5 w-5 text-blue-500" />
                            <h4 className="font-semibold">Từ vựng</h4>
                        </div>
                        <p className="text-gray-600">{lesson.vocabularies?.length || 0} từ mới</p>

                    </div>

                    {/* Grammar Section */}
                    <div className="border bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-3">
                            <GraduationCap className="h-5 w-5 text-green-500" />
                            <h4 className="font-semibold">Ngữ pháp</h4>
                        </div>
                        <p className="text-gray-600">{lesson.grammars?.length || 0} cấu trúc</p>

                    </div>

                    {/* Kanji Section */}
                    <div className="border bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-2 mb-3">
                            <Book className="h-5 w-5 text-red-500" />
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
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Không tìm thấy khóa học</h2>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <LessonHeader course={course} />

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