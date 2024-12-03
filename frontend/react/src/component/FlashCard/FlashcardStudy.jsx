import React, { useState, useEffect } from 'react';
import {
    Shuffle,
    RotateCcw,
    ArrowLeft,
    ArrowRight,
    Star,
    Volume2,
    BookOpen,
    Medal,
    Brain,
    ChevronLeft
} from 'lucide-react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const FlashcardStudy = () => {
    const { setId } = useParams();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [confidence, setConfidence] = useState({});
    const [showHint, setShowHint] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchCards();
    }, [setId]);

    const fetchCards = async () => {
        try {
            const { data } = await api.get('/flashcards/a', {
                params: { setId }
            });
            const formattedCards = data.data.map(card => ({
                id: card.id,
                front: {
                    text: card.frontText,
                    type: card.frontType,
                },
                back: {
                    reading: card.backReading,
                    meaning: card.backMeaning,
                    example: card.backExample,
                    exampleReading: card.backExampleReading
                }
            }));
            setCards(formattedCards);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const calculateProgress = () => {
        return ((currentIndex + 1) / cards.length) * 100;
    };

    const handleNext = () => {
        setFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    const handlePrevious = () => {
        setFlipped(false);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleShuffle = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setCurrentIndex(0);
        setFlipped(false);
    };

    const playAudio = (text, isJapanese = true) => {
        if (isPlaying) return;
        setIsPlaying(true);
        const utterance = new SpeechSynthesisUtterance(text);
        if (isJapanese) {
            utterance.lang = 'ja-JP';
        }
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
    };

    if (!cards.length) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Progress Bar */}
            <button
                onClick={() => navigate(`/flashcards`)}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ChevronLeft className="h-5 w-5"/>
                <span>Quay lại</span>
            </button>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{width: `${calculateProgress()}%`}}
                />

            </div>

            {/* Main Flashcard */}
            <div className="perspective-1000 mb-6">
                <div
                    onClick={() => {
                        if (!isAnimating) {
                            setFlipped(!flipped);
                            setIsAnimating(true);
                            setTimeout(() => setIsAnimating(false), 600);
                        }
                    }}
                    className={`relative w-full aspect-video rounded-xl transition-all duration-500 transform-style-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
                >
                    {/* Front of card */}
                    <div
                        className={`absolute w-full h-full bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 backface-hidden ${flipped ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="text-center">
                            <div className="text-6xl mb-4">
                                {cards[currentIndex].front.text}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].front.text);
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                </button>
                            </div>
                            <div className="text-gray-500 mb-4">{cards[currentIndex].front.type}</div>
                        </div>
                    </div>

                    {/* Back of card */}
                    <div
                        className={`absolute w-full h-full bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-8 backface-hidden rotate-y-180 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center">
                            <div className="text-3xl mb-2 text-blue-600">
                                {cards[currentIndex].back.reading}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].back.reading);
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Volume2 size={20}/>
                                </button>
                            </div>
                            <div className="text-xl mb-4">
                                {cards[currentIndex].back.meaning}
                            </div>
                            <div className="text-gray-600 mb-4">
                                {cards[currentIndex].back.example}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].back.exampleReading);
                                    }}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Volume2 size={20}/>
                                </button>
                            </div>
                            <div className="text-sm text-gray-500">
                                {cards[currentIndex].back.exampleReading}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-4 gap-4">
                <button
                    onClick={handleShuffle}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200"
                >
                    <Shuffle size={20}/>
                    <span>Trộn thẻ</span>
                </button>
                <button
                    onClick={() => playAudio(cards[currentIndex].back.reading)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                >
                    <Volume2 size={20}/>
                    <span>Audio</span>
                </button>
                <button
                    onClick={handlePrevious}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <ArrowLeft size={20}/>
                    <span>Trước</span>
                </button>
                <button
                    onClick={handleNext}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                    <span>Sau</span>
                    <ArrowRight size={20}/>
                </button>
            </div>
        </div>
    );
};
export default FlashcardStudy;