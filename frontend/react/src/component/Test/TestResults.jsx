import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, ChevronRight, RotateCcw, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TestResults = () => {
    const navigate = useNavigate();
    const { courseId, lessonId, testId } = useParams();
    const [testData, setTestData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const userAnswers = location.state?.answers || {};
    const timeTaken = location.state?.timeTaken || 0;
    // Get user answers from location state

    const getAuthConfig = () => ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });
    const formatTimeTaken = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tests/${testId}`, getAuthConfig());
                if (!response.ok) {
                    throw new Error('Failed to fetch test data');
                }
                const result = await response.json();
                if (result.code === 'MSG000000') {
                    setTestData(result.data);
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

        fetchTest();
    }, [testId, navigate]);

    // Calculate results
    const results = React.useMemo(() => {
        if (!testData) return null;

        const questions = testData.questions;
        const correctAnswers = questions.reduce((count, question) => {
            const correctOption = question.options?.find(opt => opt.isCorrect)?.optionText;
            return userAnswers[question.id] === correctOption ? count + 1 : count;
        }, 0);

        const score = Math.round((correctAnswers / questions.length) * 100);
        const passed = score >= testData.passScore;




        return {
            score,
            passed,
            correctAnswers,
            totalQuestions: questions.length,
            timeTaken: formatTimeTaken(timeTaken), // Use the formatted time
            questions: questions.map(question => ({
                ...question,
                userAnswer: userAnswers[question.id],
                correctAnswer: question.options?.find(opt => opt.isCorrect)?.optionText
            }))
        };
    }, [testData, userAnswers, timeTaken]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
    }

    if (!results) {
        return <div>No results available</div>;
    }

    const getScoreColor = (passed) => passed ? 'text-green-500' : 'text-red-500';
    const getScoreIcon = (passed) => passed ? <CheckCircle className="w-16 h-16 text-green-500" /> : <XCircle className="w-16 h-16 text-red-500" />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
                <button
                    onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test`)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">{testData.title}</h1>
                    <p className="text-gray-500">Kết quả bài kiểm tra</p>
                </div>
            </div>

            {/* Score Overview */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
                <div className="mb-4 flex justify-center">
                    {getScoreIcon(results.passed)}
                </div>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.passed)}`}>
                    {results.score}%
                </div>
                <p className="text-gray-600 mb-2">
                    Đúng {results.correctAnswers}/{results.totalQuestions} câu
                </p>
                <p className={`font-medium ${results.passed ? 'text-green-500' : 'text-red-500'}`}>
                    {results.passed ? 'Đạt' : 'Chưa đạt'} (Yêu cầu: {testData.passScore}%)
                </p>

                <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
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
                        onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test/${testId}`)}
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
                                {question.questionType}
                            </span>
                        </div>

                        {/* Question Content */}
                        <div className="space-y-4">
                            <div>
                                <div className="font-medium mb-1">{question.questionText}</div>
                                <div className="text-sm text-gray-600">{question.questionTranslation}</div>
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {question.options?.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`p-3 rounded-lg ${
                                            option.isCorrect
                                                ? 'bg-green-50 border-2 border-green-500'
                                                : option.optionText === question.userAnswer && !option.isCorrect
                                                    ? 'bg-red-50 border-2 border-red-500'
                                                    : 'bg-gray-50'
                                        }`}
                                    >
                                        {option.optionText}
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