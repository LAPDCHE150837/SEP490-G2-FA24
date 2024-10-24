import React, { useState } from 'react';
import { Search, ChevronDown, Bell, User, Menu } from 'lucide-react';
import {useAuth} from "../../context/AuthContext.jsx";

const Sidebar = ({ isOpen, onClose }) => {
    const {logOut, customer} = useAuth();

    return (

        <div
            className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:block bg-gray-900 text-white w-64 p-6 space-y-6 z-30`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                    <img src="/api/placeholder/40/40" alt="Riki Logo" className="w-10 h-10"/>
                    <h1 className="text-xl font-bold text-cyan-400">NihonGo!</h1>
                </div>
                <button onClick={onClose} className="lg:hidden">
                    <Menu size={24}/>
                </button>
            </div>
            <div className="flex items-center space-x-3 pb-6 border-b border-gray-700">
                <img src="/api/placeholder/48/48" alt="User Avatar" className="w-12 h-12 rounded-full"/>
                <div>
                    <p className="font-semibold">{customer?.username}</p>
                    <div className="flex items-center text-sm">
                        <span className="text-yellow-500 mr-1">●</span>
                        <span>0</span>
                        <span className="text-blue-500 mx-1">●</span>
                        <span>3</span>
                        <span className="text-green-500 ml-1">N4</span>
                    </div>
                </div>
            </div>
            <nav className="space-y-4">
                <a href="#"
                   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📊</span><span>Thống kê</span></a>
                <a href="#"
                   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📚</span><span>Lớp học của tôi</span></a>
                <a href="dashboard" className="flex items-center space-x-2 text-cyan-400 font-semibold"><span>🎓</span><span>Khóa học của tôi</span></a>
                <a href="#"
                   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>❤️</span><span>Bài học video yêu thích</span></a>
                <a href="flashCardLession"
                   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🗂️</span><span>Flashcard</span></a>
                <a href="#"
                   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📝</span><span>Ghi chú của tôi</span></a>
            </nav>
            <div className="pt-6 border-t border-gray-700">
                <nav className="space-y-4">
                    <a href="#"
                       className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🧪</span><span>Kiểm tra năng lực</span></a>
                    <a href="#"
                       className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🕒</span><span>Lịch sử làm bài</span></a>
                    {/*<a href="#"*/}
                    {/*   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>💰</span><span>Quy đổi coin</span></a>*/}
                    {/*<a href="#"*/}
                    {/*   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🎫</span><span>Voucher kích hoạt</span></a>*/}
                    {/*<a href="#"*/}
                    {/*   className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📅</span><span>Lịch sử thanh toán</span></a>*/}
                </nav>
            </div>
        </div>
    );
}

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

const Flashcard = ({ word, meaning }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`bg-white p-6 rounded-lg shadow-md transition duration-300 ${isFlipped ? 'bg-green-100' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ cursor: 'pointer', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isFlipped ? <p className="text-xl font-bold">{meaning}</p> : <p className="text-xl font-bold">{word}</p>}
        </div>
    );
};

// Màn hình hiển thị danh sách khóa học
const CourseScreen = ({ onSelectCourse }) => {
    const courses = [
        // { id: 1, name: 'N4 Vocabulary' },
        // { id: 2, name: 'N4 Grammar' },
        { id: 1, name: 'N5 Kanji' },
    ];

    return (
        <section className="p-6">
            <h3 className="text-lg font-semibold mb-4">Danh sách khóa học</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white p-6 rounded-lg shadow-md" onClick={() => onSelectCourse(course)}>
                        <p className="text-lg font-bold">{course.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Màn hình hiển thị flashcard của khóa học
const FlashcardScreen = ({ selectedCourse }) => {
    const flashcardsByCourse = {
        1: [
            { word: '猫', meaning: 'Con Mèo' },
            { word: '犬', meaning: 'Con Chó' },
            { word: '山', meaning: 'Núi' },
            { word: '川', meaning: 'Sông' },
        ],
        2: [
            { word: 'です', meaning: 'To be' },
            { word: 'ます', meaning: 'Polite suffix' },
        ],
        3: [
            { word: '山', meaning: 'Mountain' },
            { word: '川', meaning: 'River' },
        ]
    };

    const flashcards = flashcardsByCourse[selectedCourse.id] || [];

    return (
        <section id="flashcard" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Flashcards - {selectedCourse.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {flashcards.map((flashcard, index) => (
                    <Flashcard key={index} word={flashcard.word} meaning={flashcard.meaning} />
                ))}
            </div>
        </section>
    );
};

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('course'); // course: màn hình khóa học, flashcard: màn hình flashcard
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleSelectFlashcard = () => {
        setCurrentScreen('course'); // Khi nhấn vào Flashcard, chuyển sang màn hình khóa học
    };

    const handleSelectCourse = (course) => {
        setSelectedCourse(course);
        setCurrentScreen('flashcard'); // Khi chọn khóa học, chuyển sang màn hình flashcard
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onSelectFlashcard={handleSelectFlashcard} />
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 overflow-y-auto">
                    {currentScreen === 'course' && <CourseScreen onSelectCourse={handleSelectCourse} />}
                    {currentScreen === 'flashcard' && selectedCourse && <FlashcardScreen selectedCourse={selectedCourse} />}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;