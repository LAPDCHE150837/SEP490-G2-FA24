import React, { useState } from 'react';
import {Search, ChevronDown, Bell, User, Menu, Sidebar} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import this if using React Router for navigation
import { useAuth } from "../../context/AuthContext.jsx";

const LessonItem = ({ lesson, components }) => {
    const [isLessonOpen, setIsLessonOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsLessonOpen(!isLessonOpen)}
                className="flex items-center justify-between w-full py-2 px-4 text-left text-white bg-gray-800 hover:bg-gray-700 rounded-md"
            >
                {lesson}
                <span>{isLessonOpen ? '-' : '+'}</span>
            </button>
            {isLessonOpen && (
                <div className="pl-4 mt-2 space-y-2">
                    {components.map((component, index) => (
                        <p key={index} className="text-gray-300 pl-2 hover:text-white">
                            {component}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

const CourseSideBar = ({ courseName }) => {
    const [lessonsOpen, setLessonsOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate for routing

    return (
        <div className="course-sidebar bg-gray-900 text-white w-64 p-6">
            {/* Back to Dashboard Button */}
            <button
                onClick={() => navigate('/dashboard')} // Update with your dashboard route
                className="mb-4 text-sm text-blue-500 hover:underline"
            >
                &larr; Back to Dashboard
            </button>

            <h2 className="text-xl font-semibold mb-4">{courseName}</h2>
            <button onClick={() => setLessonsOpen(!lessonsOpen)} className="w-full text-left flex items-center">
                N5 for Beginner
                <ChevronDown className={`ml-2 transition-transform ${lessonsOpen ? 'rotate-180' : ''}`} />
            </button>
            {lessonsOpen && (
                <div className="pl-4">
                    {[...Array(5).keys()].map((lesson) => (
                        <LessonItem
                            key={lesson}
                            lesson={`Lesson ${lesson + 1}`}
                            components={['Video', 'Grammar', 'Kanji', 'Vocabulary', 'Test']}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Header = ({ onMenuClick }) => (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <button onClick={onMenuClick} className="lg:hidden">
                <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold">Trang chủ / <span className="text-cyan-500">Flashcard</span></h2>
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150"><Bell size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition duration-150"><User size={20} /></button>
        </div>
    </header>
);

const Flashcard = ({ word, meaning, gif }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`bg-white p-6 rounded-lg shadow-md transition duration-300 ${isFlipped ? 'bg-green-100' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ cursor: 'pointer', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            {isFlipped ? (
                <div className="flex flex-col items-center">
                    <p className="text-xl font-bold mb-2">{meaning}</p>
                    <img src={gif} alt="Kanji GIF" className="w-24 h-24 object-cover" />
                </div>
            ) : (
                <p className="text-xl font-bold">{word}</p>
            )}
        </div>
    );
};

const CourseScreen = () => {
    const flashcards = [

    ];

    return (
        <section id="flashcard" className="p-6">
            <h3 className="text-lg font-semibold mb-4">N5 beginer</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {flashcards.map((flashcard, index) => (
                    <Flashcard key={index} word={flashcard.word} meaning={flashcard.meaning} gif={flashcard.gif} />
                ))}
            </div>
        </section>
    );
};

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showCourseSidebar, setShowCourseSidebar] = useState(false);

    const handleShowCourse = () => {
        setShowCourseSidebar(true);  // Show course sidebar
        setSidebarOpen(false);       // Hide the default sidebar
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar rendering based on `showCourseSidebar` state */}
            {showCourseSidebar ? (
                <CourseSideBar courseName="N5 Beginner" />
            ) : (
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            )}
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <button onClick={handleShowCourse} className="bg-blue-500 text-white p-2 rounded-md mb-4">
                        Go to Course
                    </button>
                    <CourseScreen />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
