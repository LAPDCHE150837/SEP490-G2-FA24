import React, { useState, useEffect } from 'react';
import { Clock, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const TestExam = () => {
    const navigate = useNavigate();
    const { courseId, lessonId, testId } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState(new Set());
    const [examData, setExamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const getAuthConfig = () => ({
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    const formatTime = (seconds) => {
        if (seconds === null) return "--:--";
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
                    setExamData({
                        ...result.data,
                        totalQuestions: result.data.questions.length
                    });
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


    useEffect(() => {
        if (examData?.duration) {
            setRemainingTime(examData.duration * 60);
        }
    }, [examData?.duration]);

    useEffect(() => {
        if (!remainingTime) return;

        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTime]);


    useEffect(() => {
        if (remainingTime === 300) {
            alert("Còn 5 phút nữa là hết giờ!");
        } else if (remainingTime === 60) {
            alert("Còn 1 phút nữa là hết giờ!");
        }
    }, [remainingTime]);


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

    if (!examData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Không có bài kiểm tra nào cho bài học này

            </div>
        );
    }

    const handleSelectAnswer = (questionId, answer) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const handleMarkQuestion = (questionId) => {
        setMarkedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    const handleSubmit = async () => {
        const timeTaken = examData.duration * 60 - remainingTime;
        const questions = examData.questions;
        const correctAnswers = questions.reduce((count, question) => {
            if (!selectedAnswers[question.id]) return count;
            const correctOption = question.options?.find(opt => opt.isCorrect)?.optionText;
            return selectedAnswers[question.id] === correctOption ? count + 1 : count;
        }, 0);
        const score = Math.round((correctAnswers / questions.length) * 100);

        try {
            // First, save the test result
            const resultResponse = await fetch('http://localhost:8080/api/v1/test-results', {
                method: 'POST',
                ...getAuthConfig(),
                body: JSON.stringify({
                    test: { id: testId },
                    score: score,
                    timeTaken: Math.round(timeTaken)
                })
            });

            if (!resultResponse.ok) {
                throw new Error('Failed to save test results');
            }



            // Then save each user answer
            for (const question of questions) {
                if (!selectedAnswers[question.id]) continue; // Skip unanswered questions

                const selectedOptionText = selectedAnswers[question.id];
                const selectedOption = question.options.find(opt => opt.optionText === selectedOptionText);

                if (!selectedOption) continue;

                const userAnswer = {
                    testResult: { id: "c839ee20-655a-4173-ab23-d2cd3b5ed6fe" },
                    question: { id: question.id },
                    selectedOption: { id: selectedOption.id },
                    isCorrect: selectedOption.isCorrect
                };

                await fetch('http://localhost:8080/api/v1/user-answers', {
                    method: 'POST',
                    ...getAuthConfig(),
                    body: JSON.stringify(userAnswer)
                });
            }


            // Navigate to results page
            navigate(`/courses/${courseId}/lessons/${lessonId}/test/${testId}/result`, {
                state: {
                    answers: selectedAnswers,
                    timeTaken: timeTaken
                }
            });
        } catch (error) {
            alert('Failed to save test results. Please try again.');
            console.error('Error saving test results:', error);
        }

    };

    const currentQuestionData = examData.questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            <div className="bg-white border-b">
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test`)}
                                    className="flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    <ChevronLeft className="h-5 w-5"/>
                                    <span>Quay lại danh sách</span>
                                </button>
                                <h1 className="text-xl font-bold">{examData?.title}</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Clock className="h-5 w-5"/>
                                    <span className={`${remainingTime < 300 ? 'text-red-500 font-bold' : ''}`}>
                                    {formatTime(remainingTime)}
                                </span>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Nộp bài
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
                {/* Question Area */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                    {/* Question Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-600">
                            Câu hỏi {currentQuestion + 1}/{examData.questions.length}
                        </div>
                        <button
                            onClick={() => handleMarkQuestion(currentQuestionData.id)}
                            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                                markedQuestions.has(currentQuestionData.id)
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            <Flag className="h-4 w-4"/>
                            <span>Đánh dấu</span>
                        </button>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-6">
                        <div>
                            <div className="text-sm text-blue-600 mb-2">{currentQuestionData.questionType}</div>
                            <h2 className="text-lg font-medium mb-2">{currentQuestionData.questionText}</h2>
                            <p className="text-gray-600 text-sm">{currentQuestionData.questionTranslation}</p>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3">
                            {currentQuestionData.options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelectAnswer(currentQuestionData.id, option.optionText)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                        selectedAnswers[currentQuestionData.id] === option.optionText
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {option.optionText}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:text-gray-400"
                        >
                            <ChevronLeft className="h-5 w-5" />
                            <span>Câu trước</span>
                        </button>
                        <button
                            onClick={() => setCurrentQuestion(prev => Math.min(examData.questions.length - 1, prev + 1))}
                            disabled={currentQuestion === examData.questions.length - 1}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:text-gray-400"
                        >
                            <span>Câu tiếp</span>
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Question Navigator */}
                <div className="w-80 bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold mb-4">Tổng quan câu hỏi</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {examData.questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestion(index)}
                                className={`
                                    w-10 h-10 rounded-lg flex items-center justify-center text-sm
                                    ${currentQuestion === index ? 'ring-2 ring-blue-500' : ''}
                                    ${selectedAnswers[q.id]
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600'}
                                    ${markedQuestions.has(q.id) ? 'ring-2 ring-yellow-400' : ''}
                                `}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span>Đã trả lời ({Object.keys(selectedAnswers).length})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-4 h-4 bg-gray-100 rounded"></div>
                            <span>Chưa trả lời ({examData.questions.length - Object.keys(selectedAnswers).length})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-4 h-4 border-2 border-yellow-400 rounded"></div>
                            <span>Đã đánh dấu ({markedQuestions.size})</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestExam;