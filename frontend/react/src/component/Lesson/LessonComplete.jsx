import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

const LessonComplete = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    const handleNextLesson = () => {
        const nextLessonId = Number(lessonId) + 1;
        navigate(`/courses/${courseId}/lessons/${nextLessonId}`);
    };

    const handleReviewLesson = () => {
        navigate(`/courses/${courseId}/lessons/${lessonId}`);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Chúc mừng!</h1>
            <p className="text-xl text-gray-600 mb-8">
                Bạn đã hoàn thành bài học thành công!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-700">Từ vựng đã học</h3>
                    <p className="text-2xl font-bold text-green-600">10</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-700">Điểm kiểm tra</h3>
                    <p className="text-2xl font-bold text-blue-600">90%</p>
                </div>
            </div>

            <div className="space-y-4">
                <button
                    onClick={handleNextLesson}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                    <span>Bài học tiếp theo</span>
                    <ArrowRight size={20} />
                </button>
                <button
                    onClick={handleReviewLesson}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                    <RotateCcw size={20} />
                    <span>Xem lại bài học</span>
                </button>
            </div>
        </div>
    );
};

export default LessonComplete;