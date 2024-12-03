import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ChevronLeft, Book, GraduationCap, Check, X, Volume2, ChevronDown, ArrowLeft} from 'lucide-react';
import {getLesson, getLessonById} from "../../service/Lesson.js";
import axios from "axios";

const LessonNavigation = ({ lesson, activeSection, setActiveSection }) => {
    const { courseId } = useParams();
    const [allLessons, setAllLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedLesson, setExpandedLesson] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }
                const result = await response.json();
                if (result.code === 'MSG000000') {
                    const sortedLessons = result.data.sort((a, b) => a.orderIndex - b.orderIndex);
                    setAllLessons(sortedLessons);
                    // Set current lesson as expanded
                    setExpandedLesson(lesson?.id);
                } else {
                    throw new Error(result.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, []);

    useEffect(() => {
        setExpandedLesson(lesson?.id);
    }, [lesson?.id]);

    if (loading) {
        return (
            <div className="w-64 bg-white shadow-md rounded-lg p-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-64 bg-white shadow-md rounded-lg p-4">
                <div className="text-red-500 text-center">Error: {error}</div>
            </div>
        );
    }

    const handleLessonClick = (lessonId) => {
        // Only handle expand/collapse, no navigation
        setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    };

    const LessonSections = ({ isCurrentLesson, lessonId }) => {
        const lessonData = allLessons.find(l => l.id === lessonId);

        return (
            <div className="pl-4 space-y-1 mt-2">
                <button
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                        isCurrentLesson && activeSection === 'video' ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                        if (isCurrentLesson) {
                            setActiveSection('video');
                        } else {
                            navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                            setActiveSection('video');
                        }
                    }}
                >
                    Video
                </button>
                <button
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                        isCurrentLesson && activeSection === 'vocabulary' ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                        if (isCurrentLesson) {
                            setActiveSection('vocabulary');
                        } else {
                            navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                            setActiveSection('vocabulary');
                        }
                    }}
                >
                    Từ vựng {lessonData?.vocabularies?.length > 0 && `(${lessonData.vocabularies.length})`}
                </button>
                <button
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                        isCurrentLesson && activeSection === 'grammar' ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                        if (isCurrentLesson) {
                            setActiveSection('grammar');
                        } else {
                            navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                            setActiveSection('grammar');
                        }
                    }}
                >
                    Ngữ pháp {lessonData?.grammars?.length > 0 && `(${lessonData.grammars.length})`}
                </button>
                <button
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                        isCurrentLesson && activeSection === 'kanji' ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                        if (isCurrentLesson) {
                            setActiveSection('kanji');
                        } else {
                            navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                            setActiveSection('kanji');
                        }
                    }}
                >
                    Hán tự {lessonData?.kanjis?.length > 0 && `(${lessonData.kanjis.length})`}
                </button>
            </div>
        );
    };

    return (
        <div className="w-64 bg-white shadow-md rounded-lg p-4">
            <div className="space-y-2">
                {allLessons.map((currentLesson) => (
                    <div key={currentLesson.id} className="border rounded-lg">
                        <button
                            className={`w-full p-3 flex items-center justify-between rounded-lg transition-colors ${
                                currentLesson.id === lesson?.id
                                    ? 'bg-cyan-100 text-cyan-700'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleLessonClick(currentLesson.id)}
                        >
                            <span className="font-medium">{currentLesson.title}</span>
                            <ChevronDown
                                className={`w-5 h-5 transition-transform ${
                                    expandedLesson === currentLesson.id ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {expandedLesson === currentLesson.id && (
                            <LessonSections
                                isCurrentLesson={currentLesson.id === lesson?.id}
                                lessonId={currentLesson.id}
                            />
                        )}
                    </div>
                ))}
            </div>


        </div>
    );
};

const LessonDetail = () => {
    const {courseId, lessonId} = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('video');
    const [isPlaying, setIsPlaying] = useState(false);
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const [isCompleted, setIsCompleted] = useState(false);
    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await getLessonById(lessonId);
                setLesson(response.data.data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    useEffect(() => {
        const fetchUserProgress = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/user-progress/lesson/${lessonId}`,
                    getAuthConfig()
                );
                // Check for proper response structure
                if (response.data) {
                    setIsCompleted(response.data.completed);
                    setData(response.data)
                } else {
                    setIsCompleted(false);
                }
            } catch (error) {
                // If 404 or any error, set to false
                console.error('Error fetching progress:', error);
                setIsCompleted(false);
            }
        };

        if (lessonId) {
            fetchUserProgress();
        }
    }, [lessonId]);

    const handleToggleCompletion = async () => {

        const method = !data ? 'POST' : 'PUT';  // Use data state to check if progress exists
        const url = !data
            ? `http://localhost:8080/api/v1/user-progress`
            : `http://localhost:8080/api/v1/user-progress/lesson/${lessonId}`;

        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lesson: {
                    id: lessonId
                },
                completed: !isCompleted
            })
        });


        setIsCompleted(!isCompleted);
        // Update data state if it's a POST request
        if (!data) {
            const result = await response.json();
            setData(result.data);
        }


    };

    const playAudio = (text, isJapanese = true) => {
        if (isPlaying) return;

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

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Error: {error}</h2>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Không tìm thấy bài học</h2>
            </div>
        );
    }

    const VideoContent = () => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Video giới thiệu NihonGO!</h2>
            <div className="aspect-video bg-gray-100 mb-4">
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Video Player</span>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Mô tả:</h3>
                <p className="text-gray-600">{lesson.description}</p>
            </div>
        </div>
    );

    const VocabularyContent = () => (
        <div className="space-y-6">
            {lesson.vocabularies && lesson.vocabularies.length > 0 ? (
                lesson.vocabularies.map((vocab, index) => (
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
                                        <Volume2 className="text-blue-500" size={20}/>
                                    </button>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                                    <Check size={20}/>
                                </button>
                                <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                    <X size={20}/>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600">Reading: {vocab.reading}</p>
                            <p className="text-gray-600">Meaning: {vocab.meaning}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 text-gray-500">No vocabulary items available</div>
            )}
        </div>
    );

    const GrammarContent = () => (
        <div className="space-y-6">
            {lesson.grammars && lesson.grammars.length > 0 ? (
                lesson.grammars.map((gram, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-blue-600 mb-2">
                                {gram.pattern}
                                <button
                                    onClick={() => playAudio(gram.pattern)}
                                    disabled={isPlaying}
                                    className={`ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                >
                                    <Volume2 className="text-blue-500" size={20}/>
                                </button>
                            </h3>
                            <p className="text-gray-600">{gram.meaning}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 text-gray-500">No grammar items available</div>
            )}
        </div>
    );

    const KanjiContent = () => (
        <div className="space-y-6">
            {lesson.kanjis && lesson.kanjis.length > 0 ? (
                lesson.kanjis.map((kanji, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center justify-center">
                                <span className="text-6xl font-bold">{kanji.character}</span>
                                <button
                                    onClick={() => playAudio(kanji.character)}
                                    disabled={isPlaying}
                                    className={`ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                >
                                    <Volume2 className="text-blue-500" size={20}/>
                                </button>
                            </div>
                            <div className="md:col-span-3 space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700">Onyomi:</h4>
                                    <p className="text-gray-600">
                                        {kanji.onyomi}
                                        <button
                                            onClick={() => playAudio(kanji.onyomi)}
                                            disabled={isPlaying}
                                            className={`ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                        >
                                            <Volume2 className="text-green-500" size={16}/>
                                        </button>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Kunyomi:</h4>
                                    <p className="text-gray-600">
                                        {kanji.kunyomi}
                                        <button
                                            onClick={() => playAudio(kanji.kunyomi)}
                                            disabled={isPlaying}
                                            className={`ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                        >
                                            <Volume2 className="text-green-500" size={16}/>
                                        </button>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-700">Meaning:</h4>
                                    <p className="text-gray-600">
                                        {kanji.meaning}
                                        <button
                                            onClick={() => playAudio(kanji.meaning, false)}
                                            className={`ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                        >
                                            <Volume2 className="text-purple-500" size={16}/>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4 text-gray-500">No kanji items available</div>
            )}
        </div>
    );

    return (
        <div className="flex gap-6">
            <div className="flex-1 mr-72">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate(`/courses/${courseId}/lessons`)}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft size={24}/>
                                <span>Khóa học/Danh sách bài học/Bài học</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleToggleCompletion}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                    isCompleted
                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {isCompleted ? (
                                    <>
                                        <Check size={20}/>
                                        <span>Đánh dấu chưa hoàn thành</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={20}/>
                                        <span>Đánh dấu hoàn thành</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test`)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Kiểm tra
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        {activeSection === 'video' && <VideoContent/>}
                        {activeSection === 'vocabulary' && <VocabularyContent/>}
                        {activeSection === 'grammar' && <GrammarContent/>}
                        {activeSection === 'kanji' && <KanjiContent/>}
                    </div>
                </div>
            </div>

            <div className="fixed right-12 top-20 w-64 h-screen">
                <LessonNavigation
                    lesson={lesson}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </div>
        </div>
    );
};

export default LessonDetail;