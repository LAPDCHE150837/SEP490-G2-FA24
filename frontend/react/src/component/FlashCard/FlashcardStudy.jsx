import React, { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, ArrowLeft, ArrowRight, Star, Volume2, BookOpen, Medal, Brain } from 'lucide-react';

const FlashcardStudy = () => {
    // ... [previous state declarations remain the same]
    const [flipped, setFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [confidence, setConfidence] = useState({});
    const [streak, setStreak] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [studyStats, setStudyStats] = useState({
        cardsReviewed: 0,
        correctStreak: 0,
        bestStreak: 0,
        lastReviewDate: null,
    });

    const [cards, setCards] = useState([
        // Basic Pronouns and Particles
        {
            front: { text: "私", type: "kanji", hint: "Looks like a person standing" },
            back: {
                reading: "わたし",
                meaning: "I, me",
                example: "私は学生です。",
                exampleReading: "わたしはがくせいです。",
                mnemonic: "Think of it as a person pointing to themselves",
                meaningAudio: "I, me (personal pronoun)"
            },
            difficulty: 1,
            relatedWords: ["私達 (わたしたち) - we", "私立 (しりつ) - private"]
        },
        {
            front: { text: "僕", type: "kanji", hint: "Contains the radical for 'person'" },
            back: {
                reading: "ぼく",
                meaning: "I, me (casual, male)",
                example: "僕が行きます。",
                exampleReading: "ぼくがいきます。",
                mnemonic: "Imagine a boy bowing politely",
                meaningAudio: "I, me (casual male speech)"
            },
            difficulty: 2,
            relatedWords: ["僕たち (ぼくたち) - we (casual)", "僕ら (ぼくら) - we guys"]
        },
        // Basic Objects
        {
            front: { text: "本", type: "kanji", hint: "Looks like a tree with a mark" },
            back: {
                reading: "ほん",
                meaning: "book",
                example: "この本は面白いです。",
                exampleReading: "このほんはおもしろいです。",
                mnemonic: "Imagine it as a book standing on a shelf",
                meaningAudio: "book (noun)"
            },
            difficulty: 1,
            relatedWords: ["本屋 (ほんや) - bookstore", "本当 (ほんとう) - truth"]
        },
        // Places
        {
            front: { text: "学校", type: "compound", hint: "Combines 'study' and 'school'" },
            back: {
                reading: "がっこう",
                meaning: "school",
                example: "学校に行きます。",
                exampleReading: "がっこうにいきます。",
                mnemonic: "Place where learning happens",
                meaningAudio: "school (location)"
            },
            difficulty: 2,
            relatedWords: ["小学校 (しょうがっこう) - elementary school", "中学校 (ちゅうがっこう) - middle school"]
        },
        // Time-related
        {
            front: { text: "今日", type: "compound", hint: "Combines 'now' and 'day'" },
            back: {
                reading: "きょう",
                meaning: "today",
                example: "今日は晴れです。",
                exampleReading: "きょうははれです。",
                mnemonic: "The sun rising on this day",
                meaningAudio: "today (time)"
            },
            difficulty: 1,
            relatedWords: ["今朝 (けさ) - this morning", "今晩 (こんばん) - tonight"]
        },
        // Numbers and Counting
        {
            front: { text: "一", type: "kanji", hint: "A single horizontal line" },
            back: {
                reading: "いち",
                meaning: "one",
                example: "一人で行きます。",
                exampleReading: "ひとりでいきます。",
                mnemonic: "One horizontal stroke",
                meaningAudio: "one (number)"
            },
            difficulty: 1,
            relatedWords: ["一回 (いっかい) - one time", "一緒 (いっしょ) - together"]
        },
        // Verbs
        {
            front: { text: "食べる", type: "verb", hint: "Think of putting food in mouth" },
            back: {
                reading: "たべる",
                meaning: "to eat",
                example: "朝ごはんを食べます。",
                exampleReading: "あさごはんをたべます。",
                mnemonic: "The radical shows food entering a mouth",
                meaningAudio: "to eat (verb)"
            },
            difficulty: 1,
            relatedWords: ["食事 (しょくじ) - meal", "食堂 (しょくどう) - dining hall"]
        },
        // Adjectives
        {
            front: { text: "大きい", type: "adjective", hint: "Think of something expanding" },
            back: {
                reading: "おおきい",
                meaning: "big, large",
                example: "この家は大きいです。",
                exampleReading: "このいえはおおきいです。",
                mnemonic: "The character looks like something growing bigger",
                meaningAudio: "big, large (adjective)"
            },
            difficulty: 1,
            relatedWords: ["大人 (おとな) - adult", "大学 (だいがく) - university"]
        },
        // Nature
        {
            front: { text: "山", type: "kanji", hint: "Looks like mountain peaks" },
            back: {
                reading: "やま",
                meaning: "mountain",
                example: "富士山は高いです。",
                exampleReading: "ふじさんはたかいです。",
                mnemonic: "Looks like three mountain peaks",
                meaningAudio: "mountain (noun)"
            },
            difficulty: 1,
            relatedWords: ["火山 (かざん) - volcano", "山道 (やまみち) - mountain path"]
        },
        // Colors
        {
            front: { text: "青", type: "kanji", hint: "Think of the blue sky" },
            back: {
                reading: "あお",
                meaning: "blue",
                example: "空は青いです。",
                exampleReading: "そらはあおいです。",
                mnemonic: "Represents the color of the sky",
                meaningAudio: "blue (color)"
            },
            difficulty: 1,
            relatedWords: ["青春 (せいしゅん) - youth", "青年 (せいねん) - young person"]
        },
        // Emotions
        {
            front: { text: "嬉しい", type: "adjective", hint: "Happy expression" },
            back: {
                reading: "うれしい",
                meaning: "happy, glad",
                example: "とても嬉しいです。",
                exampleReading: "とてもうれしいです。",
                mnemonic: "Think of a happy face",
                meaningAudio: "happy, glad (emotion)"
            },
            difficulty: 2,
            relatedWords: ["嬉し泣き (うれしなき) - tears of joy"]
        },
        // Weather
        {
            front: { text: "雨", type: "kanji", hint: "Looks like raindrops falling" },
            back: {
                reading: "あめ",
                meaning: "rain",
                example: "雨が降っています。",
                exampleReading: "あめがふっています。",
                mnemonic: "Looks like rain falling from clouds",
                meaningAudio: "rain (weather)"
            },
            difficulty: 1,
            relatedWords: ["雨季 (うき) - rainy season", "大雨 (おおあめ) - heavy rain"]
        },
        // Transportation
        {
            front: { text: "電車", type: "compound", hint: "Combines 'electricity' and 'vehicle'" },
            back: {
                reading: "でんしゃ",
                meaning: "train",
                example: "電車で行きます。",
                exampleReading: "でんしゃでいきます。",
                mnemonic: "Electric vehicle on tracks",
                meaningAudio: "train (transportation)"
            },
            difficulty: 2,
            relatedWords: ["電車賃 (でんしゃちん) - train fare", "電車通り (でんしゃどおり) - train street"]
        },
        // Food
        {
            front: { text: "寿司", type: "compound", hint: "Traditional Japanese food" },
            back: {
                reading: "すし",
                meaning: "sushi",
                example: "寿司を食べましょう。",
                exampleReading: "すしをたべましょう。",
                mnemonic: "Characters represent long life and administration",
                meaningAudio: "sushi (food)"
            },
            difficulty: 2,
            relatedWords: ["寿司屋 (すしや) - sushi restaurant", "回転寿司 (かいてんずし) - conveyor belt sushi"]
        },
        // Technology
        {
            front: { text: "携帯", type: "compound", hint: "Something you carry" },
            back: {
                reading: "けいたい",
                meaning: "mobile phone, cellular phone",
                example: "携帯を使います。",
                exampleReading: "けいたいをつかいます。",
                mnemonic: "Carrying something important",
                meaningAudio: "mobile phone (technology)"
            },
            difficulty: 3,
            relatedWords: ["携帯電話 (けいたいでんわ) - mobile phone", "携帯メール (けいたいメール) - text message"]
        }
    ]);

    const [showProgressBar, setShowProgressBar] = useState(true);
    const [currentStreak, setCurrentStreak] = useState(0);

    // Enhanced playAudio function
    const playAudio = (text, isJapanese = true) => {
        if (isPlaying) return; // Prevent multiple playbacks

        setIsPlaying(true);
        const utterance = new SpeechSynthesisUtterance(text);

        if (isJapanese) {
            utterance.lang = 'ja-JP';
        }

        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 2.0;

        utterance.onend = () => {
            setIsPlaying(false);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    // ... [previous handler functions remain the same]
    const handleConfidenceRating = (rating) => {
        setConfidence({
            ...confidence,
            [currentIndex]: rating
        });

        if (rating >= 4) {
            setCurrentStreak(prev => prev + 1);
            setStudyStats(prev => ({
                ...prev,
                correctStreak: prev.correctStreak + 1,
                bestStreak: Math.max(prev.bestStreak, prev.correctStreak + 1)
            }));
        } else {
            setCurrentStreak(0);
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
        setShuffled(true);
        setCurrentIndex(0);
        setFlipped(false);
    };

    // ... [rest of the component remains the same until the card content]

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Progress Bar */}
            {showProgressBar && (
                <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${calculateProgress()}%` }}
                    />
                </div>
            )}

            {/* Stats Display - Remains the same */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {/* ... [stats display remains the same] ... */}
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
                    className={`
                        relative w-full aspect-video rounded-xl
                        transition-all duration-500 transform-style-3d
                        cursor-pointer
                        ${flipped ? 'rotate-y-180' : ''}
                    `}
                >
                    {/* Front of card */}
                    <div className={`
                        absolute w-full h-full
                        bg-gradient-to-br from-white to-blue-50
                        rounded-xl shadow-lg p-8
                        backface-hidden
                        ${flipped ? 'opacity-0' : 'opacity-100'}
                    `}>
                        <div className="text-center">
                            <div className="text-6xl mb-4">
                                {cards[currentIndex].front.text}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].front.text);
                                    }}
                                    disabled={isPlaying}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Volume2 size={20} />
                                </button>
                            </div>
                            <div className="text-gray-500 mb-4">{cards[currentIndex].front.type}</div>
                            {showHint && (
                                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                                    Hint: {cards[currentIndex].front.hint}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back of card */}
                    <div className={`
                        absolute w-full h-full
                        bg-gradient-to-br from-white to-purple-50
                        rounded-xl shadow-lg p-8
                        backface-hidden rotate-y-180
                        ${flipped ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className="text-center">
                            <div className="text-3xl mb-2 text-blue-600">
                                {cards[currentIndex].back.reading}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].back.reading);
                                    }}
                                    disabled={isPlaying}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Volume2 size={20} />
                                </button>
                            </div>
                            <div className="text-xl mb-4">
                                {cards[currentIndex].back.meaning}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].back.meaningAudio, false);
                                    }}
                                    disabled={isPlaying}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Volume2 size={20} />
                                </button>
                            </div>
                            <div className="text-gray-600 mb-4">
                                {cards[currentIndex].back.example}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playAudio(cards[currentIndex].back.exampleReading);
                                    }}
                                    disabled={isPlaying}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                >
                                    <Volume2 size={20} />
                                </button>
                            </div>
                            <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded-lg mb-4">
                                Mnemonic: {cards[currentIndex].back.mnemonic}
                            </div>
                            <div className="text-sm text-gray-500">
                                Related Words:
                                <ul className="list-disc list-inside">
                                    {cards[currentIndex].relatedWords.map((word, index) => (
                                        <li key={index}>
                                            {word}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    playAudio(word);
                                                }}
                                                disabled={isPlaying}
                                                className="ml-2 text-gray-400 hover:text-gray-600 inline-flex"
                                            >
                                                <Volume2 size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confidence Rating */}
            <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        onClick={() => handleConfidenceRating(rating)}
                        className={`
                            p-2 rounded-full
                            ${confidence[currentIndex] === rating
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'}
                        `}
                    >
                        <Star size={20} />
                    </button>
                ))}
            </div>

            {/* Control Buttons */}
            <div className="grid grid-cols-4 gap-4">
                <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200"
                >
                    <Brain size={20} />
                    <span>Hint</span>
                </button>
                <button
                    onClick={() => playAudio(cards[currentIndex].back.reading)}
                    disabled={isPlaying}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                >
                    <Volume2 size={20} />
                    <span>Audio</span>
                </button>
                <button
                    onClick={handlePrevious}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <ArrowLeft size={20} />
                    <span>Previous</span>
                </button>
                <button
                    onClick={handleNext}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                    <span>Next</span>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default FlashcardStudy;