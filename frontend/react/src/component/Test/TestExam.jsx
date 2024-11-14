import React, { useState } from 'react';
import { Clock, Flag, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import {MOCK_COURSES} from "../../../../mockDara.js";

const TestExam = () => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState(new Set());
    const [remainingTime, setRemainingTime] = useState(30 * 60); // 30 minutes in seconds

    // Get test data from mock courses
    const examData = MOCK_COURSES
        .find(course => course.id === Number(courseId))
        ?.lessons.find(lesson => lesson.id === Number(lessonId))
        ?.test;

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

    const handleSubmit = () => {
        navigate(`/courses/${courseId}/lessons/${lessonId}/test/result`, {
            state: { answers: selectedAnswers }
        });
    };

    const currentQuestionData = examData.questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">{examData.title}</h1>
                        {/* Timer */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="h-5 w-5" />
                                <span>{Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</span>
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
                            <Flag className="h-4 w-4" />
                            <span>Đánh dấu</span>
                        </button>
                    </div>

                    {/* Question Content */}
                    <div className="space-y-6">
                        <div>
                            <div className="text-sm text-blue-600 mb-2">{currentQuestionData.type === 'vocabulary' ? 'Từ vựng' : 'Ngữ pháp'}</div>
                            <h2 className="text-lg font-medium mb-2">{currentQuestionData.question}</h2>
                            <p className="text-gray-600 text-sm">{currentQuestionData.translation}</p>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3">
                            {currentQuestionData.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAnswer(currentQuestionData.id, option)}
                                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                        selectedAnswers[currentQuestionData.id] === option
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {option}
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