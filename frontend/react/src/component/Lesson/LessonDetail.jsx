import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowLeft, Check, ChevronDown, ChevronLeft, ChevronRight, GraduationCap, Volume2,Settings } from 'lucide-react';
import {addUserItem, getLessonById, getLessonUserVocabulary} from "../../service/Lesson.js";
import axios from "axios";
import ContentSlider from "./ContentSlider.jsx";
import {createAchievement} from "../../service/Course.js";

const LessonNavigation = ({lesson, activeSection, setActiveSection}) => {
    const {courseId} = useParams();
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
    const ProgressButton = ({type, itemId}) => {
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

    const LessonSections = ({isCurrentLesson, lessonId}) => {
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
                    onClick={async () => {
                        try {
                            // Trigger navigation or section update
                            if (isCurrentLesson) {
                                setActiveSection('vocabulary');
                            } else {
                                navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                                setActiveSection('vocabulary');
                            }

                            // API call to addUserItem
                            const response = await axios.post(
                                `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/addItem/${lessonId}`,
                                {},
                                {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace as needed
                                        'Content-Type': 'application/json',
                                    },
                                }
                            );

                            console.log("API call successful:", response.data);
                        } catch (error) {
                            console.error("Error adding user item:", error);
                        }
                    }}
                >
                    Từ vựng {lessonData?.vocabularies?.length > 0 && `(${lessonData.vocabularies.length})`}
                </button>
                <button
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                        isCurrentLesson && activeSection === 'grammar' ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={async () => {
                        if (isCurrentLesson) {
                            setActiveSection('grammar');
                        } else {
                            navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                            setActiveSection('grammar');
                        }
                        // API call to addUserItem
                        const response = await axios.post(
                            `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/addItem/${lessonId}`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace as needed
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        console.log("API call successful:", response.data);

                    }}
                >
                    Ngữ pháp {lessonData?.grammars?.length > 0 && `(${lessonData.grammars.length})`}
                </button>
                <button
                    className={`w-full text-left p-2 rounded-lg text-sm ${
                        isCurrentLesson && activeSection === 'kanji' ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100'
                    }`}
                    onClick={async () => {
                        if (isCurrentLesson) {
                            setActiveSection('kanji');
                        } else {
                            navigate(`/courses/${lesson.courseId}/lessons/${lessonId}`);
                            setActiveSection('kanji');
                        }

                        // API call to addUserItem
                        const response = await axios.post(
                            `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/addItem/${lessonId}`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Replace as needed
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        console.log("API call successful:", response.data);
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
    const [userVocabulary, setUserVocabulary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const totalSlides = 12; // Or however many slides you have
    const [vocabLearningStatus, setVocabLearningStatus] = useState({});
    const [grammarLearningStatus, setGrammarLearningStatus] = useState({});
    const [kanjiLearningStatus, setKanjiLearningStatus] = useState({});
    const [vocabularyCurrentSlide, setVocabularyCurrentSlide] = useState(0);
    const [grammarCurrentSlide, setGrammarCurrentSlide] = useState(0);
    const [kanjiCurrentSlide, setKanjiCurrentSlide] = useState(0);
    const [totalLearning, setTotalLearning] = useState(0);
    const [totalLesson, setTotalLesson] = useState(0);
    const [userTotal, setUserTotal] = useState(0);
    const [contentsTotal, setContentsTotal] = useState(0);
    const [showCongrats, setShowCongrats] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'learned', 'unlearned'
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [grammarFilterStatus, setGrammarFilterStatus] = useState('all');
    const [showGrammarFilterModal, setShowGrammarFilterModal] = useState(false);
    const [kanjiFilterStatus, setKanjiFilterStatus] = useState('all');
    const [showKanjiFilterModal, setShowKanjiFilterModal] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });

    useEffect(() => {
        // Reset all slide positions when section changes
        setVocabularyCurrentSlide(0);
        setGrammarCurrentSlide(0);
        setKanjiCurrentSlide(0);
    }, [activeSection]);
    useEffect(() => {
        // Reset all slide positions when lesson changes
        setVocabularyCurrentSlide(0);
        setGrammarCurrentSlide(0);
        setKanjiCurrentSlide(0);
    }, [lessonId]);

    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const [userResponse, contentsResponse] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/user/total`,
                        getAuthConfig()
                    ),
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/contents/total`,
                        getAuthConfig()
                    )
                ]);

                setUserTotal(userResponse.data);
                setContentsTotal(contentsResponse.data);

                // Check if course is completed and create achievement
                if (contentsResponse.data > 0 && userResponse.data / contentsResponse.data === 1) {
                    await createAchievement(courseId);
                    setShowCongrats(true);
                }
            } catch (error) {
                console.error('Error fetching course totals:', error);
            }
        };

        fetchTotals();
    }, [courseId]);


    useEffect(() => {
        const fetchTotals = async () => {
            try {
                const [learningResponse, totalResponse] = await Promise.all([
                    axios.get(
                        `http://localhost:8080/api/v1/vocabularies/user/learning-count/${lessonId}`,
                        getAuthConfig()
                    ),
                    axios.get(
                        `http://localhost:8080/api/v1/vocabularies/user/total_lesson/${lessonId}`,
                        getAuthConfig()
                    )
                ]);

                setTotalLearning(learningResponse.data);
                setTotalLesson(totalResponse.data);
            } catch (error) {
                console.error('Error fetching totals:', error);
            }
        };

        if (lessonId) {
            fetchTotals();
        }
    }, [lessonId]);

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

    // Add this useEffect to fetch learning status for all vocabularies
    useEffect(() => {
        const fetchLearningStatus = async () => {
            if (lesson?.vocabularies) {
                const statuses = {};
                for (const vocab of lesson.vocabularies) {
                    try {
                        const response = await axios.get(
                            `http://localhost:8080/api/v1/vocabularies/user/${vocab.id}`,
                            getAuthConfig()
                        );
                        statuses[vocab.id] = response.data;
                    } catch (error) {
                        console.error('Error fetching vocab status:', error);
                        statuses[vocab.id] = false;
                    }
                }
                setVocabLearningStatus(statuses);
            }
        };

        fetchLearningStatus();
    }, [lesson]);
    useEffect(() => {
        checkCompletion();
    }, [vocabLearningStatus, grammarLearningStatus, kanjiLearningStatus]);
    // Add this useEffect to fetch learning status for all grammar
    useEffect(() => {
        const fetchGrammarStatus = async () => {
            if (lesson?.grammars) {
                const statuses = {};
                for (const grammar of lesson.grammars) {
                    try {
                        const response = await axios.get(
                            `http://localhost:8080/api/v1/vocabularies/user/grammar/${grammar.id}`,
                            getAuthConfig()
                        );
                        statuses[grammar.id] = response.data;
                    } catch (error) {
                        console.error('Error fetching vocab status:', error);
                        statuses[grammar.id] = false;
                    }
                }
                setGrammarLearningStatus(statuses);
            }
        };

        fetchGrammarStatus();
    }, [lesson]);

    // Add this useEffect to fetch learning status for all grammar
    useEffect(() => {
        const fetchKanjiStatus = async () => {
            if (lesson?.kanjis) {
                const statuses = {};
                for (const kanji of lesson.kanjis) {
                    try {
                        const response = await axios.get(
                            `http://localhost:8080/api/v1/vocabularies/user/kanji/${kanji.id}`,
                            getAuthConfig()
                        );
                        statuses[kanji.id] = response.data;
                    } catch (error) {
                        console.error('Error fetching vocab status:', error);
                        statuses[kanji.id] = false;
                    }
                }
                setKanjiLearningStatus(statuses);
            }
        };

        fetchKanjiStatus();
    }, [lesson]);

    useEffect(() => {
        const fetchFilteredVocabularies = async (lessonId, filter) => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/vocabularies/${lessonId}/filter?isLearning=${filter}`,
                    getAuthConfig()
                );
                setUserVocabulary(response.data.data)
            } catch (error) {
                console.error('Error fetching filtered vocabularies:', error);
                return [];
            }
        }

    },[lessonId]);


    // Add this FilterModal component
    const FilterModal = ({ isOpen, onClose, currentFilter, onFilterChange, totalLearned, totalUnlearned, total, type = 'vocabulary' }) => {
        if (!isOpen) return null;

        const getTypeText = () => {
            switch (type) {
                case 'grammar':
                    return 'ngữ pháp';
                case 'kanji':
                    return 'Kanji';
                default:
                    return 'từ vựng';
            }
        };

        const typeText = getTypeText();

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-80">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Tùy chỉnh</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                onFilterChange('unlearned');
                                onClose();
                            }}
                            className={`w-full p-3 text-left rounded-lg flex justify-between items-center ${
                                currentFilter === 'unlearned' ? 'bg-green-100 text-green-700' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            <span>{typeText} chưa thuộc</span>
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                            {totalUnlearned}
                        </span>
                        </button>

                        <button
                            onClick={() => {
                                onFilterChange('learned');
                                onClose();
                            }}
                            className={`w-full p-3 text-left rounded-lg flex justify-between items-center ${
                                currentFilter === 'learned' ? 'bg-green-100 text-green-700' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            <span>{typeText} đã thuộc</span>
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                            {totalLearned}
                        </span>
                        </button>

                        <button
                            onClick={() => {
                                onFilterChange('all');
                                onClose();
                            }}
                            className={`w-full p-3 text-left rounded-lg flex justify-between items-center ${
                                currentFilter === 'all' ? 'bg-green-100 text-green-700' : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                        >
                            <span>Tất cả {typeText}</span>
                            <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                            {total}
                        </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };// Add this useEffect after your existing useEffects in LessonDetail component
    const checkCompletion = async () => {
        // Skip if no lesson data or if already completed
        if (!lesson || isCompleted) return;

        // Calculate total items
        const totalVocabs = lesson.vocabularies?.length || 0;
        const totalGrammars = lesson.grammars?.length || 0;
        const totalKanjis = lesson.kanjis?.length || 0;

        // Count learned items
        const learnedVocabs = Object.values(vocabLearningStatus).filter(status => status).length;
        const learnedGrammars = Object.values(grammarLearningStatus).filter(status => status).length;
        const learnedKanjis = Object.values(kanjiLearningStatus).filter(status => status).length;

        // Check if all items are learned
        const isAllLearned =
            learnedVocabs === totalVocabs &&
            learnedGrammars === totalGrammars &&
            learnedKanjis === totalKanjis;

        // Only update if all items are learned and there are items to learn
        if (isAllLearned && (totalVocabs > 0 || totalGrammars > 0 || totalKanjis > 0)) {
            try {
                // Update completion status
                const method = !data ? 'POST' : 'PUT';
                const url = !data
                    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-progress`
                    : `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-progress/lesson/${lessonId}`;

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
                        completed: true
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to update completion status');
                }

                setIsCompleted(true);

                if (!data) {
                    const result = await response.json();
                    setData(result.data);
                }

                // Refetch totals and check for course completion
                const [userResponse, contentsResponse] = await Promise.all([
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/user/total`,
                        getAuthConfig()
                    ),
                    axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/contents/total`,
                        getAuthConfig()
                    )
                ]);

                setUserTotal(userResponse.data);
                setContentsTotal(contentsResponse.data);

                // Create achievement if course is completed
                if (contentsResponse.data > 0 && userResponse.data / contentsResponse.data === 1) {
                    setShowCongrats(true);
                }
            } catch (error) {
                console.error('Error updating completion status:', error);
            }
        }
    };


    async function isLearning(id) {
        try {
            await axios.post(
                `http://localhost:8080/api/v1/vocabularies/user`,
                {
                    vocabulary: {
                        id: id
                    }
                },
                getAuthConfig()
            );
            // Update the state after successful API call
            setVocabLearningStatus(prev => ({
                ...prev,
                [id]: !prev[id]
            }));

            // Refetch the totals after updating learning status
            const [learningResponse, totalResponse] = await Promise.all([
                axios.get(
                    `http://localhost:8080/api/v1/vocabularies/user/learning-count/${lessonId}`,
                    getAuthConfig()
                ),
                axios.get(
                    `http://localhost:8080/api/v1/vocabularies/user/total_lesson/${lessonId}`,
                    getAuthConfig()
                )
            ]);


            setTotalLearning(learningResponse.data);
            setTotalLesson(totalResponse.data);

        } catch (error) {
            console.error('Error updating learning status:', error);
        }


    }

    async function isGrammarLearning(id) {
        try {
            await axios.post(
                `http://localhost:8080/api/v1/grammars/user`,
                {
                    grammar: {
                        id: id
                    }
                },
                getAuthConfig()
            );
            setGrammarLearningStatus(prev => ({
                ...prev,
                [id]: !prev[id]
            }));

            // Refetch the totals
            const [learningResponse, totalResponse] = await Promise.all([
                axios.get(
                    `http://localhost:8080/api/v1/vocabularies/user/learning-count/${lessonId}`,
                    getAuthConfig()
                ),
                axios.get(
                    `http://localhost:8080/api/v1/vocabularies/user/total_lesson/${lessonId}`,
                    getAuthConfig()
                )
            ]);

            setTotalLearning(learningResponse.data);
            setTotalLesson(totalResponse.data);
        } catch (error) {
            console.error('Error updating learning status:', error);
        }
    }


    async function iskanjiLearning(id) {
        try {
            await axios.post(
                `http://localhost:8080/api/v1/kanjis/user`,
                {
                    kanji: {
                        id: id
                    }
                },
                getAuthConfig()
            );
            setKanjiLearningStatus(prev => ({
                ...prev,
                [id]: !prev[id]
            }));

            // Refetch the totals
            const [learningResponse, totalResponse] = await Promise.all([
                axios.get(
                    `http://localhost:8080/api/v1/vocabularies/user/learning-count/${lessonId}`,
                    getAuthConfig()
                ),
                axios.get(
                    `http://localhost:8080/api/v1/vocabularies/user/total_lesson/${lessonId}`,
                    getAuthConfig()
                )
            ]);

            setTotalLearning(learningResponse.data);
            setTotalLesson(totalResponse.data);
        } catch (error) {
            console.error('Error updating learning status:', error);
        }
    }

    const handleToggleCompletion = async () => {
        try {
            const method = !data ? 'POST' : 'PUT';
            const url = !data
                ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-progress`
                : `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-progress/lesson/${lessonId}`;

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

            if (!response.ok) {
                throw new Error('Failed to update completion status');
            }

            setIsCompleted(!isCompleted);

            // Update data state if it's a POST request
            if (!data) {
                const result = await response.json();
                if (result.code === 'MSG000000') {
                    setData(result.data);
                } else {
                    throw new Error(result.message);
                }
            }

            // Refetch totals
            const [userResponse, contentsResponse] = await Promise.all([
                axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/user/total`,
                    getAuthConfig()
                ),
                axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/course/${courseId}/contents/total`,
                    getAuthConfig()
                )
            ]);

            setUserTotal(userResponse.data);
            setContentsTotal(contentsResponse.data);

            // Show congratulations if course is completed
            if (contentsResponse.data > 0 &&
                userResponse.data / contentsResponse.data === 1) {
                setShowCongrats(true);
            }

        } catch (error) {
            console.error('Error updating completion status:', error);
            alert('Không thể cập nhật trạng thái hoàn thành. Vui lòng thử lại.');
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
        const totalVocabs = lesson.vocabularies?.length || 0;
        const learnedVocabs = Object.values(vocabLearningStatus).filter(status => status).length;
        const unlearnedVocabs = totalVocabs - learnedVocabs;

        return (
            <div className="relative h-full">
                <button onClick={() => setShowFilterModal(true)}>
                    <Settings size={20} className="text-gray-600" />
                </button>

                <FilterModal
                    isOpen={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                    currentFilter={filterStatus}
                    onFilterChange={setFilterStatus}
                    totalLearned={learnedVocabs}
                    totalUnlearned={unlearnedVocabs}
                    total={totalVocabs}
                />

                <ContentSlider
                    items={lesson.vocabularies}
                    currentSlide={vocabularyCurrentSlide}
                    setCurrentSlide={setVocabularyCurrentSlide}
                    filterStatus={filterStatus}
                    learningStatus={vocabLearningStatus}
                    onLearningToggle={isLearning}
                    isPlaying={isPlaying}
                    playAudio={playAudio}
                    contentType="vocabulary"
                />
            </div>
        );
    };
    const GrammarContent = () => {
        const totalGrammars = lesson.grammars?.length || 0;
        const learnedGrammars = Object.values(grammarLearningStatus).filter(status => status).length;
        const unlearnedGrammars = totalGrammars - learnedGrammars;
        return (
            <div className="relative h-full">
                <button onClick={() => setShowGrammarFilterModal(true)}>
                    <Settings size={20} className="text-gray-600" />
                </button>

                <FilterModal
                    isOpen={showGrammarFilterModal}
                    onClose={() => setShowGrammarFilterModal(false)}
                    currentFilter={grammarFilterStatus}
                    onFilterChange={setGrammarFilterStatus}
                    totalLearned={learnedGrammars}
                    totalUnlearned={unlearnedGrammars}
                    total={totalGrammars}
                    type="grammar"
                />

                <ContentSlider
                    items={lesson.grammars}
                    currentSlide={grammarCurrentSlide}
                    setCurrentSlide={setGrammarCurrentSlide}
                    filterStatus={grammarFilterStatus}
                    learningStatus={grammarLearningStatus}
                    onLearningToggle={isGrammarLearning}
                    isPlaying={isPlaying}
                    playAudio={playAudio}
                    contentType="grammar"
                />
            </div>
        );
    };

    const KanjiContent = () => {
        const totalKanjis = lesson.kanjis?.length || 0;
        const learnedKanjis = Object.values(kanjiLearningStatus).filter(status => status).length;
        const unlearnedKanjis = totalKanjis - learnedKanjis;
        return (
            <div className="relative h-full">
                <button onClick={() => setShowKanjiFilterModal(true)}>
                    <Settings size={20} className="text-gray-600" />
                </button>

                <FilterModal
                    isOpen={showKanjiFilterModal}
                    onClose={() => setShowKanjiFilterModal(false)}
                    currentFilter={kanjiFilterStatus}
                    onFilterChange={setKanjiFilterStatus}
                    totalLearned={learnedKanjis}
                    totalUnlearned={unlearnedKanjis}
                    total={totalKanjis}
                    type="kanji"
                />

                <ContentSlider
                    items={lesson.kanjis}
                    currentSlide={kanjiCurrentSlide}
                    setCurrentSlide={setKanjiCurrentSlide}
                    filterStatus={kanjiFilterStatus}
                    learningStatus={kanjiLearningStatus}
                    onLearningToggle={iskanjiLearning}
                    isPlaying={isPlaying}
                    playAudio={playAudio}
                    contentType="kanji"
                />
            </div>
        );


    };
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-8xl mx-auto px-4 py-6">
                <header className="mb-8">
                    {showCongrats && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        🎉 Chúc mừng!
                                    </h3>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                        <Check className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <p className="text-lg text-gray-500">
                                            Bạn đã hoàn thành khóa học này!
                                            Hãy tiếp tục phát huy nhé!
                                        </p>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            onClick={() => setShowCongrats(false)}
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
                                disabled={true}
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
                                        <span className="font-medium">Chưa hoàn thành</span>
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
                    <div className="border-b border-gray-200 p-6">
                        <h1 className="text-2xl font-bold">{lesson.title}</h1>
                        <p className="text-gray-600 mt-2">{lesson.description}</p>

                        {/* Add this progress bar section */}
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
                Tiến độ học tập
            </span>
                                <span className="text-sm font-medium text-gray-700">
                {totalLearning}/{totalLesson} ({totalLesson > 0 ? Math.round((totalLearning / totalLesson) * 100) : 0}%)
            </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${totalLesson > 0 ? (totalLearning / totalLesson) * 100 : 0}%`
                                    }}
                                ></div>
                            </div>
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
                                {activeSection === 'video' && <VideoContent/>}
                                {activeSection === 'vocabulary' && <VocabularyContent/>}
                                {activeSection === 'grammar' && <GrammarContent/>}
                                {activeSection === 'kanji' && <KanjiContent/>}
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