import React, { useEffect, useState, useRef } from 'react';
import { Moon, Sun, X, Info, Play, Volume2, Mic, Square, Award, AlertCircle } from 'lucide-react';
import { DashboardLayout } from "../Layout/DashBoardLayout.jsx";
import RecordingModal from "../Record/RecordingModal.jsx";

const StrokeAnimationModal = ({character, isVisible, onClose, playAudio}) => {
    const [gifUrl, setGifUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (character && isVisible) {
            import(`../../alphabet/${character}.gif`)
                .then(module => {
                    setGifUrl(module.default);
                })
                .catch(err => {
                    console.error('Error loading GIF:', err);
                    setGifUrl('');
                });
        }
    }, [character, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" onClick={onClose}/>
            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8 shadow-xl max-w-md w-full m-4">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"
                >
                    <X size={20}/>
                </button>

                <div className="mb-6 text-center">
                    <div className="mb-2 inline-block px-3 py-1 bg-cyan-500/10 rounded-full">
                        <span className="text-3xl font-bold text-cyan-400">
                            {character}
                            <button
                                onClick={() => playAudio(character)}
                                disabled={isPlaying}
                                className="ml-2 p-2 rounded-full hover:bg-gray-800 text-cyan-400 transition-colors"
                            >
                                <Volume2 size={20} />
                            </button>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Stroke Order Animation
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-gray-800 aspect-square">
                    {gifUrl ? (
                        <img
                            src={gifUrl}
                            alt={`Stroke order for ${character}`}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Loading...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

const JapaneseAlphabet = () => {
    const [isDark, setIsDark] = useState(false);
    const [activeTab, setActiveTab] = useState('hiragana');
    const [showAnimation, setShowAnimation] = useState(false);
    const [activeChar, setActiveChar] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showRecording, setShowRecording] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);
    const hiragana = [
        ['あ', 'い', 'う', 'え', 'お'],
        ['か', 'き', 'く', 'け', 'こ'],
        ['さ', 'し', 'す', 'せ', 'そ'],
        ['た', 'ち', 'つ', 'て', 'と'],
        ['な', 'に', 'ぬ', 'ね', 'の'],
        ['は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['ま', 'み', 'む', 'め', 'も'],
        ['や', 'ゆ', 'よ'],
        ['ら', 'り', 'る', 'れ', 'ろ'],
        ['わ', 'を', 'ん']
    ];

    const katakana = [
        ['ア', 'イ', 'ウ', 'エ', 'オ'],
        ['カ', 'キ', 'ク', 'ケ', 'コ'],
        ['サ', 'シ', 'ス', 'セ', 'ソ'],
        ['タ', 'チ', 'ツ', 'テ', 'ト'],
        ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
        ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
        ['マ', 'ミ', 'ム', 'メ', 'モ'],
        ['ヤ', 'ユ', 'ヨ'],
        ['ラ', 'リ', 'ル', 'レ', 'ロ'],
        ['ワ', 'ヲ', 'ン']
    ];

    const romanji = [
        ['a', 'i', 'u', 'e', 'o'],
        ['ka', 'ki', 'ku', 'ke', 'ko'],
        ['sa', 'shi', 'su', 'se', 'so'],
        ['ta', 'chi', 'tsu', 'te', 'to'],
        ['na', 'ni', 'nu', 'ne', 'no'],
        ['ha', 'hi', 'fu', 'he', 'ho'],
        ['ma', 'mi', 'mu', 'me', 'mo'],
        ['ya', 'yu', 'yo'],
        ['ra', 'ri', 'ru', 're', 'ro'],
        ['wa', 'wo', 'n']
    ];

    const playAudio = (text, isJapanese = true) => {
        if (isPlaying) return;

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

    const handleCharacterClick = (char) => {
        setActiveChar(char);
        setShowAnimation(true);
    };

    // Add recording button to character grid
    const renderTable = (characters) => (
        <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
            <div className="grid grid-cols-5 gap-px bg-gray-800">
                {characters.map((row, rowIndex) =>
                    row.map((char, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="group relative bg-gray-900 transition-all duration-300 hover:bg-gray-800"
                        >
                            <div className="p-6 flex flex-col items-center justify-center gap-2">
                                <span className="text-3xl font-bold text-white transition-all duration-300 group-hover:text-cyan-400 group-hover:transform group-hover:scale-110">
                                    {char}
                                </span>
                                <span className="text-xs text-gray-500 group-hover:text-cyan-400">
                                    {romanji[rowIndex][colIndex]}
                                </span>

                                {/* Action Icons Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/50">
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCharacterClick(char);
                                            }}
                                            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 text-cyan-400 transition-colors"
                                        >
                                            <Play size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                playAudio(char);
                                            }}
                                            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 text-cyan-400 transition-colors"
                                        >
                                            <Volume2 size={20} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedChar(char);
                                                setShowRecording(true);
                                            }}
                                            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 text-cyan-400 transition-colors"
                                        >
                                            <Mic size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <StrokeAnimationModal
                character={activeChar}
                isVisible={showAnimation}
                onClose={() => setShowAnimation(false)}
                playAudio={playAudio}
            />

            <RecordingModal
                character={selectedChar}
                isVisible={showRecording}
                onClose={() => setShowRecording(false)}
                onSave={(recordingData) => {
                    // Handle saving/processing of recording
                    console.log('Recording saved:', recordingData);
                    setShowRecording(false);
                }}
            />


            {/* Tab Navigation */}
            <div className="flex space-x-4 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm w-fit">
                {['hiragana', 'katakana'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                            ${activeTab === tab
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                        `}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Character Grid */}
            {renderTable(activeTab === 'hiragana' ? hiragana : katakana)}
        </div>
    );
};

export default JapaneseAlphabet;