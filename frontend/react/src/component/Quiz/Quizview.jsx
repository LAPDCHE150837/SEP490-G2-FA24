// QuizView.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

const QuizView = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [answers, setAnswers] = useState([]);

    // Mock quiz data - you would typically generate this based on the lesson content
    const quizQuestions = [
        {
            type: 'vocabulary',
            question: 'What does わたし mean?',
            options: ['I/Me', 'You', 'He/She', 'We'],
            correctAnswer: 'I/Me'
        },
        {
            type: 'grammar',
            question: 'Complete the sentence: わたしは___です。',
            options: ['がくせい', 'がくせいです', 'です', 'は'],
            correctAnswer: 'がくせい'
        },
        {
            type: 'kanji',
            question: 'What is the reading for 私?',
            options: ['わたし', 'あなた', 'かれ', 'かのじょ'],
            correctAnswer: 'わたし'
        },
    ];

    const handleAnswerSelect = (answer) => {
        if (showResult) return;
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer;
        const newAnswers = [...answers, {
            question: currentQuestionIndex,
            selected: selectedAnswer,
            correct: isCorrect
        }];
        setAnswers(newAnswers);

        if (currentQuestionIndex + 1 < quizQuestions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            const correctCount = newAnswers.filter(a => a.correct).length;
            setScore({ correct: correctCount, total: quizQuestions.length });
            setShowResult(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore({ correct: 0, total: 0 });
        setAnswers([]);
    };

    const handleFinish = () => {
        navigate(`/courses/${courseId}/lessons/${lessonId}/complete`);
    };

    if (showResult) {
        const passThreshold = 0.7; // 70% to pass
        const passed = score.correct / score.total >= passThreshold;

        return (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                    {passed ? (
                        <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    ) : (
                        <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
                    )}
                    <h2 className="text-2xl font-bold mb-4">
                        {passed ? 'Chúc mừng!' : 'Cố gắng lần sau!'}
                    </h2>
                    <p className="text-xl mb-6">
                        Bạn đạt được {score.correct}/{score.total} câu đúng
                    </p>
                    <div className="space-y-4">
                        {passed ? (
                            <button
                                onClick={handleFinish}
                                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Hoàn thành bài học
                            </button>
                        ) : (
                            <button
                                onClick={handleRetry}
                                className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                            >
                                Làm lại bài kiểm tra
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                        Câu hỏi {currentQuestionIndex + 1}/{quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                        {currentQuestion.type}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${
                                selectedAnswer === option
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                        selectedAnswer === null
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    <span>Tiếp theo</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default QuizView;