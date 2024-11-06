import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Book, GraduationCap, Check, X, Volume2 } from 'lucide-react';
import {MOCK_COURSES} from "../../../../mockDara.js";

const LessonDetail = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('vocabulary');

    const course = MOCK_COURSES.find(c => c.id === Number(courseId));
    const lesson = course?.lessons.find(l => l.id === Number(lessonId));

    if (!lesson) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Không tìm thấy bài học</h2>
            </div>
        );
    }

    const handleBack = () => {
        navigate(`/courses/${courseId}/lessons`);
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </button>
    );