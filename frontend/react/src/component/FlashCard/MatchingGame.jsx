import React, { useState, useEffect } from 'react';
import {ArrowLeft, RotateCcw} from 'lucide-react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const MatchingGame = () => {
    const { setId } = useParams();
    const [gameCards, setGameCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [time, setTime] = useState(0);
    const initializeGame = () => {
        setSelectedCards([]);
        setMatched([]);
        setScore(0);
        setMoves(0);
        setTime(0); // Reset time
        fetchCards();
    };

// Modify the timer useEffect to stop when game is finished
    useEffect(() => {
        let timer;
        // Only run timer if game is active and not completed
        if (!loading && gameCards.length > 0 && matched.length !== gameCards.length) {
            timer = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
        // If game is completed, stop the timer
        if (matched.length === gameCards.length && gameCards.length > 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [loading, gameCards.length, matched.length]);

// Add formatTime helper function
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    const fetchCards = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/flashcards/a', {
                params: { setId }
            });

            // Create pairs of cards from the API data
            const cardPairs = data.data.flatMap(card => [
                {
                    id: `front-${card.id}`,
                    content: card.frontText,
                    type: 'front',
                    pairId: card.id
                },
                {
                    id: `back-${card.id}`,
                    content: card.backMeaning,
                    type: 'back',
                    pairId: card.id
                }
            ]);

            // Shuffle the cards
            setGameCards([...cardPairs].sort(() => Math.random() - 0.5));
        } catch (error) {
            console.error('Error fetching cards:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCards();
    }, [setId]);



    const handleCardClick = (card) => {
        if (disabled || selectedCards.includes(card.id) || matched.includes(card.id)) return;

        setSelectedCards(prev => [...prev, card.id]);

        // If this is the second card selected
        if (selectedCards.length === 1) {
            setDisabled(true);
            setMoves(m => m + 1);

            const firstCard = gameCards.find(c => c.id === selectedCards[0]);

            if (firstCard.pairId === card.pairId && firstCard.type !== card.type) {
                // Match found
                setMatched(prev => [...prev, selectedCards[0], card.id]);
                setScore(s => s + 1);
                setSelectedCards([]);
                setDisabled(false);
            } else {
                // No match
                setTimeout(() => {
                    setSelectedCards([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Game Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate(`/flashcards`)}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            >
                                <ArrowLeft size={20}/>
                                <span>Quay lại</span>
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">Trò chơi ghép thẻ</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-3">
                                <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
                                    <span className="text-gray-600">⏱️</span>
                                    <span className="font-medium text-gray-900">{formatTime(time)}</span>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
                                    <span className="text-gray-600">🎯</span>
                                    <span className="text-gray-600">Điểm: </span>
                                    <span className="font-medium text-blue-600">{score}</span>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
                                    <span className="text-gray-600">🔄</span>
                                    <span className="text-gray-600">Lượt: </span>
                                    <span className="font-medium text-green-600">{moves}</span>
                                </div>
                            </div>
                            <button
                                onClick={initializeGame}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                title="Chơi lại"
                            >
                                <RotateCcw size={20}/>
                                <span>Chơi lại</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600">Ghép từ với nghĩa của nó để hoàn thành trò chơi</p>
                </div>
                {/* Game Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {gameCards.map(card => (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            className={`
                                aspect-[4/3] cursor-pointer
                                flex items-center justify-center
                                rounded-xl p-4 text-center
                                transition-all duration-200
                                ${selectedCards.includes(card.id) ? 'ring-4 ring-blue-400 bg-blue-50' : 'bg-white'}
                                ${matched.includes(card.id) ? 'ring-4 ring-green-400 bg-green-50' : ''}
                                hover:shadow-lg border-2 border-gray-200
                            `}
                        >
                            <span className="text-lg font-medium">{card.content}</span>
                        </div>
                    ))}
                </div>

                {matched.length === gameCards.length && gameCards.length > 0 && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-xl p-8 text-center shadow-xl">
                            <h2 className="text-2xl font-bold mb-4">🎉 Chúc mừng!</h2>
                            <div className="space-y-4 mb-6">
                                <div className="text-3xl font-bold text-blue-600">
                                    {formatTime(time)}
                                </div>
                                <p className="text-gray-600">
                                    Hoàn thành trong {moves} lượt
                                </p>
                            </div>
                            <button
                                onClick={initializeGame}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Chơi lại
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchingGame;