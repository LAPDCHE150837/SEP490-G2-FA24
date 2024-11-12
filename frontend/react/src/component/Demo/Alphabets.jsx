// Phuoc dang fix ko sua gi nhe
import React, {useEffect, useState} from 'react';
import {Moon, Sun, X} from 'lucide-react';
import {DashboardLayout} from "../Layout/DashBoardLayout.jsx";

const StrokeAnimationModal = ({character, isVisible, onClose}) => {
    const [gifUrl, setGifUrl] = useState('');

    useEffect(() => {
        if (character && isVisible) {
            // Dynamic import of the GIF
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                    <X className="h-6 w-6"/>
                </button>
                <div className="mb-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Stroke Order
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Watch how to write: {character}
                    </p>
                </div>
                <div
                    className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700">
                    {gifUrl ? (
                        <img
                            src={gifUrl}
                            alt={`Stroke order for ${character}`}
                            className="h-full w-full object-contain"
                        />
                    ) : (
                        <div className="text-gray-400">Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

/*alphabet contribute*/
const JapaneseAlphabet = () => {
    const [isDark, setIsDark] = useState(false);
    const [activeTab, setActiveTab] = useState('hiragana');
    const [showAnimation, setShowAnimation] = useState(false);
    const [activeChar, setActiveChar] = useState(null);

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

    // const kanji = [
    //     ['a', 'i', 'u', 'e', 'o'],
    //     ['ka', 'ki', 'ku', 'ke', 'ko'],
    //     ['sa', 'shi', 'su', 'se', 'so'],
    //     ['ta', 'chi', 'tsu', 'te', 'to'],
    //     ['na', 'ni', 'nu', 'ne', 'no'],
    //     ['ha', 'hi', 'fu', 'he', 'ho'],
    //     ['ma', 'mi', 'mu', 'me', 'mo'],
    //     ['ya', 'yu', 'yo'],
    //     ['ra', 'ri', 'ru', 're', 'ro'],
    //     ['wa', 'wo', 'n']
    // ];

    const handleCharacterClick = (char) => {
        setActiveChar(char);
        setShowAnimation(true);
    };

    const renderTable = (characters) => (
        <div className="overflow-hidden rounded-lg bg-white/80 backdrop-blur-lg dark:bg-gray-800/80">
            <div className="grid grid-cols-5 gap-px bg-gray-200 dark:bg-gray-700">
                {characters.map((row, rowIndex) =>
                    row.map((char, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className="group relative cursor-pointer bg-white p-4 transition-all duration-300 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                            onClick={() => handleCharacterClick(char)}
                        >
                            <div className="flex flex-col items-center justify-center gap-1">
                                <span className="text-2xl font-bold transition-transform duration-300 group-hover:scale-110 dark:text-white">
                                    {char}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {romanji[rowIndex][colIndex]}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="py-0">
                <StrokeAnimationModal
                    character={activeChar}
                    isVisible={showAnimation}
                    onClose={() => setShowAnimation(false)}
                />
                {/* Main content */}
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    {/* Tabs */}
                    <div className="mb-4 flex space-x-2">
                        <button
                            onClick={() => setActiveTab('hiragana')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeTab === 'hiragana'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Hiragana (ひらがな)
                        </button>
                        <button
                            onClick={() => setActiveTab('katakana')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                activeTab === 'katakana'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                        >
                            Katakana (カタカナ)
                        </button>
                    </div>

                    {/* Instruction text */}
                    <p className="text-xs text-gray-500 mb-4 dark:text-gray-400">
                        Click on any character to see its stroke order animation
                    </p>

                    {/* Character grid */}
                    <div className="space-y-4">
                        {activeTab === 'hiragana' ? renderTable(hiragana) : renderTable(katakana)}
                    </div>

                    {/* Legend or help section */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Total characters: {activeTab === 'hiragana' ? '46' : '46'}</span>
                            <span>• Click to view animation</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default JapaneseAlphabet;