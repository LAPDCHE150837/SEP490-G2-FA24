import React, { useState } from 'react';
import { ArrowLeft, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReviewSession = () => {
    const navigate = useNavigate();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [reviewed, setReviewed] = useState(0);

    // Mock review session data
    const reviewCards = [
        {
            id: 1,
            front: "私",
            type: "kanji",
            back: {
                reading: "わたし",
                meaning: "Tôi",
                example: "私は学生です。"
            }
        },
        // Add more cards...
    ];

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleResponse = (quality) => {
        // Calculate next review date using spaced repetition
        const nextReviewDate = calculateNextReview(quality);
        console.log(`Next review in ${nextReviewDate} days`);

        setShowAnswer(false);
        setReviewed(prev => prev + 1);

        if (currentCardIndex + 1 < reviewCards.length) {
            setCurrentCardIndex(prev => prev + 1);
        } else {
            // Session complete
            navigate('/review/complete');
        }
    };

    const calculateNextReview = (quality) => {
        // SuperMemo-2 Algorithm implementation
        const intervals = [0, 1, 3, 7, 14, 30]; // days
        return intervals[quality];
    };

    const currentCard = reviewCards[currentCardIndex];

    return (
        <div className="min-h-screen bg-gray-50 py-6">
            {/* Header */}
            <div className="max-w-3xl mx-auto px-4 mb-6">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate('/review')}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="mr-2" size={20} />
                        <span>Quay lại</span>
                    </button>
                    <div className="text-gray-600">
                        {reviewed + 1} / {reviewCards.length} thẻ
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                        className="bg-blue-500 rounded-full h-2 transition-all"
                        style={{ width: `${((reviewed + 1) / reviewCards.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Card Display */}
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Card Front */}
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4">{currentCard.front}</div>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Volume2 className="text-blue-500" size={24} />
                        </button>
                    </div>

                    {/* Card Back */}
                    {showAnswer ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-3xl mb-2">{currentCard.back.reading}</div>
                                <div className="text-xl mb-4">{currentCard.back.meaning}</div>
                                <div className="text-gray-600">{currentCard.back.example}</div>
                            </div>

                            {/* Response Buttons */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    onClick={() => handleResponse(2)}
                                    className="flex items-center justify-center space-x-2 p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                >
                                    <XCircle size={20} />
                                    <span>Chưa thuộc</span>
                                </button>
                                <button
                                    onClick={() => handleResponse(4)}
                                    className="flex items-center justify-center space-x-2 p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                >
                                    <CheckCircle size={20} />
                                    <span>Đã thuộc</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={handleShowAnswer}
                            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Xem đáp án
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewSession;