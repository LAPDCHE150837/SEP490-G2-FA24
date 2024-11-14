import React from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {MOCK_COURSES} from "../../../../mockDara.js";

const TestResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { courseId, lessonId } = useParams();

    // Get test data and user answers from location state
    const userAnswers = location.state?.answers || {};

    // Get lesson test data from mock courses
    const lessonData = MOCK_COURSES
        .find(course => course.id === Number(courseId))
        ?.lessons.find(lesson => lesson.id === Number(lessonId));

    const testData = lessonData?.test;

    // Calculate results
    const results = React.useMemo(() => {
        if (!testData) return null;

        const questions = testData.questions;
        const correctAnswers = questions.reduce((count, question) =>
            userAnswers[question.id] === question.correctAnswer ? count + 1 : count, 0);

        return {
            score: Math.round((correctAnswers / questions.length) * 100),
            correctAnswers,
            totalQuestions: questions.length,
            timeTaken: "10:30", // This should come from the test component
            questions: questions.map(question => ({
                ...question,
                userAnswer: userAnswers[question.id]
            }))
        };
    }, [testData, userAnswers]);

    if (!results) {
        return <div>Loading...</div>;
    }

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getScoreIcon = (score) => {
        if (score >= 80) return <CheckCircle className="w-16 h-16 text-green-500" />;
        if (score >= 60) return <AlertCircle className="w-16 h-16 text-yellow-500" />;
        return <XCircle className="w-16 h-16 text-red-500" />;
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">{testData.title}</h1>
                    <p className="text-gray-500">{lessonData?.title}</p>
                </div>
            </div>

            {/* Score Overview */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
                <div className="mb-4 flex justify-center">
                    {getScoreIcon(results.score)}
                </div>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.score)}`}>
                    {results.score}%
                </div>
                <p className="text-gray-600 mb-6">
                    Đúng {results.correctAnswers}/{results.totalQuestions} câu
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-500">{results.correctAnswers}</div>
                        <div className="text-sm text-gray-600">Câu đúng</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-red-500">
                            {results.totalQuestions - results.correctAnswers}
                        </div>
                        <div className="text-sm text-gray-600">Câu sai</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">{results.timeTaken}</div>
                        <div className="text-sm text-gray-600">Thời gian làm bài</div>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test`)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <RotateCcw size={20} />
                        <span>Làm lại bài kiểm tra</span>
                    </button>
                    <button
                        onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}`)}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <span>Tiếp tục học</span>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Detailed Review */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold">Chi tiết bài làm</h2>
                {results.questions.map((question, index) => (
                    <div
                        key={question.id}
                        className={`bg-white rounded-lg shadow p-6 ${
                            question.userAnswer === question.correctAnswer
                                ? 'border-l-4 border-green-500'
                                : 'border-l-4 border-red-500'
                        }`}
                    >
                        {/* Question Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-600">Câu {index + 1}</span>
                                {question.userAnswer === question.correctAnswer ? (
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                ) : (
                                    <XCircle className="text-red-500 w-5 h-5" />
                                )}
                            </div>
                            <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                                {question.type === 'vocabulary' ? 'Từ vựng' :
                                    question.type === 'grammar' ? 'Ngữ pháp' : 'Kanji'}
                            </span>
                        </div>

                        {/* Question Content */}
                        <div className="space-y-4">
                            <div>
                                <div className="font-medium mb-1">{question.question}</div>
                                <div className="text-sm text-gray-600">{question.translation}</div>
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {question.options.map((option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className={`p-3 rounded-lg ${
                                            option === question.correctAnswer
                                                ? 'bg-green-50 border-2 border-green-500'
                                                : option === question.userAnswer && option !== question.correctAnswer
                                                    ? 'bg-red-50 border-2 border-red-500'
                                                    : 'bg-gray-50'
                                        }`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>

                            {/* Explanation */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <span className="font-medium">Giải thích: </span>
                                    {question.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestResults;