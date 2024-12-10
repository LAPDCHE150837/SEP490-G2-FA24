import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ChevronLeft, Book, GraduationCap, Check, X, Volume2, ChevronDown, ArrowLeft,ChevronRight } from 'lucide-react';
import {getLesson, getLessonById} from "../../service/Lesson.js";
import axios from "axios";

const LessonNavigation = ({ lesson, activeSection, setActiveSection }) => {
    const { courseId } = useParams();
    const [allLessons, setAllLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedLesson, setExpandedLesson] = useState(null);
    const navigate = useNavigate();
    const [learningStatus, setLearningStatus] = useState({
        vocabularies: {},
        grammars: {},
        kanjis: {}
    });



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
    const ProgressButton = ({ type, itemId }) => {
        const isCompleted = progress[type]?.includes(itemId);

        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleProgressToggle(type, itemId);
                }}
                className={`ml-2 px-2 py-0.5 text-xs rounded ${
                    isCompleted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                }`}
            >
                {isCompleted ? 'Đã học' : 'Chưa học'}
            </button>
        );
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
                    {/*<button*/}
                    {/*    onClick={async (e) => {*/}
                    {/*        e.stopPropagation();*/}
                    {/*        try {*/}
                    {/*            await axios.post('http://localhost:8080/api/v1/vocabularies/user',*/}
                    {/*                {*/}
                    {/*                    vocabulary: { id: lessonData.vocabularies[0].id }*/}
                    {/*                },*/}
                    {/*                {*/}
                    {/*                    headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` }*/}
                    {/*                }*/}
                    {/*            );*/}
                    {/*        } catch (error) {*/}
                    {/*            console.error('Error:', error);*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"*/}
                    {/*>*/}
                    {/*    Đã học*/}
                    {/*</button>*/}
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
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const totalSlides = 12; // Or however many slides you have

    const handleNextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    };

    const handlePrevSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };
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
            <h2 className="text-xl font-bold mb-4">Video</h2>
            <div className="aspect-video mb-4">
                {lesson.videoUrl ? (
                    <video
                        controls
                        className="w-full h-full rounded-lg"
                        src={`http://localhost:8080/api/v1/lessons/video/${lesson.id}`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                        <span className="text-gray-500">No video available</span>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Mô tả:</h3>
                <p className="text-gray-600">{lesson.description}</p>
            </div>
        </div>
    );

    const VocabularyContent = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const totalSlides = lesson.vocabularies?.length || 0;

        return (
            <div className="relative h-full">
                {lesson.vocabularies && lesson.vocabularies.length > 0 ? (
                    <>
                        {/* Prev Button */}
                        {currentSlide > 0 && (
                            <button
                                onClick={() => setCurrentSlide(prev => prev - 1)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {/* Content */}
                        <div className="h-full overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 h-full"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {lesson.vocabularies.map((vocab, index) => (
                                    <div key={index} className="min-w-full px-16">
                                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <div className="grid grid-cols-4 gap-8"> {/* Increased gap from gap-6 to gap-8 */}
                                                <div className="col-span-1">
                                                    {vocab.imageUrl ? (
                                                        <img
                                                            src={vocab.imageUrl}
                                                            alt={vocab.word}
                                                            className="w-full h-40 object-cover rounded-lg shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-span-3">
                                                    <div className="flex items-center justify-between mb-6"> {/* Increased margin */}
                                                        <div className="flex items-center space-x-4">
                                                            <span className="text-4xl font-bold text-gray-800">{vocab.word}</span>
                                                            <span className="text-xl text-gray-600">({vocab.reading})</span>
                                                            <button
                                                                onClick={() => playAudio(vocab.word)}
                                                                disabled={isPlaying}
                                                                className={`p-2 hover:bg-blue-50 rounded-full transition-colors ${isPlaying ? 'opacity-50' : ''}`}
                                                            >
                                                                <Volume2 className="text-blue-500" size={20}/>
                                                            </button>
                                                        </div>

                                                    </div>

                                                    <div className="space-y-4">
                                                        <p className="text-lg text-gray-700">
                                                            <span className="font-medium">Nghĩa:</span> {vocab.meaning}
                                                        </p>
                                                        {vocab.example && (
                                                            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                                                                <p className="text-gray-800 font-medium">Ví dụ:</p>
                                                                <p className="text-lg">{vocab.example}</p>
                                                                <p className="text-gray-600">{vocab.exampleReading}</p>
                                                                <p className="text-gray-700 mt-1">{vocab.exampleMeaning}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Button */}
                        {currentSlide < totalSlides - 1 && (
                            <button
                                onClick={() => setCurrentSlide(prev => prev + 1)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        {/* Slide Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                            {currentSlide + 1}/{totalSlides}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Không có từ vựng</div>
                )}
            </div>
        );
    };

    const GrammarContent = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const totalSlides = lesson.grammars?.length || 0;

        return (
            <div className="relative h-full">
                {lesson.grammars && lesson.grammars.length > 0 ? (
                    <>
                        {currentSlide > 0 && (
                            <button
                                onClick={() => setCurrentSlide(prev => prev - 1)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        <div className="h-full overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 h-full"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {lesson.grammars.map((gram, index) => (
                                    <div key={index} className="min-w-full px-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <div className="grid grid-cols-4 gap-6">
                                                <div className="col-span-1">
                                                    {gram.imageUrl ? (
                                                        <img
                                                            src={gram.imageUrl}
                                                            alt={gram.pattern}
                                                            className="w-full h-40 object-cover rounded-lg shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-span-3">
                                                    <div className="mb-4">
                                                        <div className="flex items-center space-x-3">
                                                            <h3 className="text-2xl font-bold text-blue-600">{gram.pattern}</h3>
                                                            <button
                                                                onClick={() => playAudio(gram.pattern)}
                                                                disabled={isPlaying}
                                                                className={`p-2 hover:bg-blue-50 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                                                            >
                                                                <Volume2 className="text-blue-500" size={20}/>
                                                            </button>
                                                        </div>
                                                        <p className="text-lg text-gray-700 mt-2">{gram.meaning}</p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <p className="font-medium text-gray-700 mb-2">Cách dùng:</p>
                                                            <p className="text-gray-600">{gram.grammarUsage}</p>
                                                        </div>

                                                        {gram.example && (
                                                            <div className="p-4 bg-blue-50 rounded-lg">
                                                                <p className="font-medium text-blue-700 mb-2">Ví dụ:</p>
                                                                <p className="text-lg">{gram.example}</p>
                                                                <p className="text-gray-600 mt-1">{gram.exampleReading}</p>
                                                                <p className="text-gray-700 mt-1">{gram.exampleMeaning}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {currentSlide < totalSlides - 1 && (
                            <button
                                onClick={() => setCurrentSlide(prev => prev + 1)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                            {currentSlide + 1}/{totalSlides}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Không có ngữ pháp</div>
                )}
            </div>
        );
    };

    const KanjiContent = () => {
        const [currentSlide, setCurrentSlide] = useState(0);
        const totalSlides = lesson.kanjis?.length || 0;

        return (
            <div className="relative h-full">
                {lesson.kanjis && lesson.kanjis.length > 0 ? (
                    <>
                        {currentSlide > 0 && (
                            <button
                                onClick={() => setCurrentSlide(prev => prev - 1)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        <div className="h-full overflow-hidden">
                            <div
                                className="flex transition-transform duration-300 h-full"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {lesson.kanjis.map((kanji, index) => (
                                    <div key={index} className="min-w-full px-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                            <div className="grid grid-cols-4 gap-6">
                                                <div className="col-span-1">
                                                    {kanji.imageUrl ? (
                                                        <img
                                                            src={kanji.imageUrl}
                                                            alt={kanji.character}
                                                            className="w-full h-40 object-cover rounded-lg shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-400">No image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-span-3">
                                                    <div className="flex items-center mb-4">
                                                        <span className="text-6xl font-bold text-gray-800">{kanji.character}</span>
                                                        <button
                                                            onClick={() => playAudio(kanji.character)}
                                                            disabled={isPlaying}
                                                            className={`ml-4 p-2 hover:bg-blue-50 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                                                        >
                                                            <Volume2 className="text-blue-500" size={24}/>
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-6 mt-4">
                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <h4 className="font-semibold text-gray-700 mb-2">Onyomi</h4>
                                                            <div className="flex items-center">
                                                                <p className="text-lg text-gray-600">{kanji.onyomi}</p>
                                                                <button
                                                                    onClick={() => playAudio(kanji.onyomi)}
                                                                    disabled={isPlaying}
                                                                    className={`ml-2 hover:bg-gray-100 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                                                                >
                                                                    <Volume2 className="text-green-500" size={16}/>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="p-4 bg-gray-50 rounded-lg">
                                                            <h4 className="font-semibold text-gray-700 mb-2">Kunyomi</h4>
                                                            <div className="flex items-center">
                                                                <p className="text-lg text-gray-600">{kanji.kunyomi}</p>
                                                                <button
                                                                    onClick={() => playAudio(kanji.kunyomi)}
                                                                    disabled={isPlaying}
                                                                    className={`ml-2 hover:bg-gray-100 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                                                                >
                                                                    <Volume2 className="text-green-500" size={16}/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                                        <h4 className="font-semibold text-blue-700 mb-2">Nghĩa</h4>
                                                        <div className="flex items-center">
                                                            <p className="text-lg text-gray-700">{kanji.meaning}</p>
                                                            <button
                                                                onClick={() => playAudio(kanji.meaning, false)}
                                                                className={`ml-2 hover:bg-blue-100 rounded-full ${isPlaying ? 'opacity-50' : ''}`}
                                                            >
                                                                <Volume2 className="text-blue-500" size={16}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {currentSlide < totalSlides - 1 && (
                            <button
                                onClick={() => setCurrentSlide(prev => prev + 1)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-3 shadow-lg hover:bg-white transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full">
                            {currentSlide + 1}/{totalSlides}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-gray-500">Không có Kanji</div>
                )}
            </div>
        );
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-8xl mx-auto px-4 py-6">
                <header className="mb-8">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => navigate(`/courses/${courseId}/lessons`)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={24}/>
                            <span className="font-medium">Quay lại danh sách bài học</span>
                        </button>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleToggleCompletion}
                                className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg transition-all transform hover:scale-105 ${
                                    isCompleted
                                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {isCompleted ? (
                                    <>
                                        <Check size={20} className="stroke-2"/>
                                        <span className="font-medium">Đã hoàn thành</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={20}/>
                                        <span className="font-medium">Đánh dấu hoàn thành</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => navigate(`/courses/${courseId}/lessons/${lessonId}/test`)}
                                className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <GraduationCap className="w-5 h-5"/>
                                <span className="font-medium">Kiểm tra</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex gap-8">
                    <main className="flex-1 bg-white shadow-lg rounded-xl overflow-hidden">
                        <div className="flex flex-col h-[85vh]">
                            <div className="border-b border-gray-200 p-6">
                                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                                <p className="text-gray-600 mt-2">{lesson.description}</p>
                            </div>

                            <div className="flex-1 overflow-hidden p-8">
                                {activeSection === 'video' && <VideoContent />}
                                {activeSection === 'vocabulary' && <VocabularyContent />}
                                {activeSection === 'grammar' && <GrammarContent />}
                                {activeSection === 'kanji' && <KanjiContent />}
                            </div>
                        </div>
                    </main>

                    <aside className="w-80 sticky top-6 h-[85vh]">
                        <LessonNavigation
                            lesson={lesson}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;