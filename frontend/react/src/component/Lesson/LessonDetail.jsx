import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Book, GraduationCap, Check, X, Volume2 } from 'lucide-react';
import {MOCK_COURSES} from "../../../../mockDara.js";

const LessonDetail = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('vocabulary');
    const [isPlaying, setIsPlaying] = useState(false);

    const course = MOCK_COURSES.find(c => c.id === Number(courseId));
    const lesson = course?.lessons.find(l => l.id === Number(lessonId));

    const playAudio = (text, isJapanese = true) => {
        if (isPlaying) return; // Prevent multiple playbacks

        setIsPlaying(true);
        const utterance = new SpeechSynthesisUtterance(text);

        if (isJapanese) {
            utterance.lang = 'ja-JP';
        }

        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onend = () => {
            setIsPlaying(false);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    if (!lesson) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Không tìm thấy bài học</h2>
            </div>
        );
    }

    const handleBack = () => {
        navigate(`/courses/${courseId}/lessons`);
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </button>
    );

    const VocabularyContent = () => (
        <div className="space-y-6">
            {lesson.vocabulary.map((vocab, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-2xl font-bold">{vocab.word}</span>
                            <div className="space-x-2">
                                <button
                                    onClick={() => playAudio(vocab.word)}
                                    disabled={isPlaying}
                                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                    title="Play word"
                                >
                                    <Volume2 className="text-blue-500" size={20} />
                                </button>
                                <button
                                    onClick={() => playAudio(vocab.reading)}
                                    disabled={isPlaying}
                                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                    title="Play reading"
                                >
                                </button>
                                <button
                                    onClick={() => playAudio(vocab.meaning, false)}
                                    disabled={isPlaying}
                                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                    title="Play meaning"
                                >
                                </button>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                                <Check size={20} />
                            </button>
                            <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-600">Reading: {vocab.reading}</p>
                        <p className="text-gray-600">Meaning: {vocab.meaning}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const GrammarContent = () => (
        <div className="space-y-6">
            {lesson.grammar.map((gram, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-blue-600 mb-2">
                            {gram.pattern}
                            <button
                                onClick={() => playAudio(gram.pattern)}
                                disabled={isPlaying}
                                className={`ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                            >
                                <Volume2 className="text-blue-500" size={20} />
                            </button>
                        </h3>
                        <p className="text-gray-600">{gram.meaning}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Example Sentences:</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-600">
                                私は学生です。
                                <button
                                    onClick={() => playAudio("私は学生です")}
                                    disabled={isPlaying}
                                    className={`ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                >
                                    <Volume2 className="text-blue-500" size={16} />
                                </button>
                                <p className="text-sm text-gray-500">(Watashi wa gakusei desu.)</p>
                                <p className="text-sm text-gray-500">Tôi là học sinh.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );

    const KanjiContent = () => (
        <div className="space-y-6">
            {lesson.kanji.map((kanji, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center justify-center">
                            <span className="text-6xl font-bold">{kanji.character}</span>
                            <button
                                onClick={() => playAudio(kanji.character)}
                                disabled={isPlaying}
                                className={`ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                            >
                                <Volume2 className="text-blue-500" size={20} />
                            </button>
                        </div>
                        <div className="md:col-span-3 space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-700">Reading:</h4>
                                <p className="text-gray-600">
                                    {kanji.reading}
                                    <button
                                        onClick={() => playAudio(kanji.reading)}
                                        disabled={isPlaying}
                                        className={`ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                    >
                                        <Volume2 className="text-green-500" size={16} />
                                    </button>
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">Meaning:</h4>
                                <p className="text-gray-600">
                                    {kanji.meaning}
                                    <button
                                        onClick={() => playAudio(kanji.meaning, false)}
                                        disabled={isPlaying}
                                        className={`ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                    >
                                        <Volume2 className="text-purple-500" size={16} />
                                    </button>
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700">Stroke Order:</h4>
                                <div className="bg-gray-50 p-4 rounded-lg mt-2">
                                    {/* Placeholder for stroke order animation */}
                                    <p className="text-gray-500 text-center">Stroke order animation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handleBack}
                    className="flex items-center text-blue-500 hover:text-blue-600"
                >
                    <ChevronLeft size={20}/>
                    <span>Quay lại danh sách bài học</span>
                </button>
                <button
                    onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test`)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                    Kiểm tra
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex space-x-4 mb-6">
                    <TabButton id="vocabulary" label="Từ vựng" icon={Book}/>
                    <TabButton id="grammar" label="Ngữ pháp" icon={GraduationCap}/>
                    <TabButton id="kanji" label="Kanji" icon={Book}/>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                    {activeTab === 'vocabulary' && <VocabularyContent/>}
                    {activeTab === 'grammar' && <GrammarContent/>}
                    {activeTab === 'kanji' && <KanjiContent/>}
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;