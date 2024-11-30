import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext.jsx";
import { Bell, Menu, User } from "lucide-react";

// Sidebar component
const Sidebar = ({ isOpen, onClose }) => {
    const { logOut, customer } = useAuth();

    return (
        <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:block bg-gray-900 text-white w-64 p-6 space-y-6 z-30`}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                    <img src="/api/placeholder/40/40" alt="Riki Logo" className="w-10 h-10" />
                    <h1 className="text-xl font-bold text-cyan-400">NihonGo!</h1>
                </div>
                <button onClick={onClose} className="lg:hidden">
                    <Menu size={24} />
                </button>
            </div>
            <div className="flex items-center space-x-3 pb-6 border-b border-gray-700">
                <img src="/api/placeholder/48/48" alt="User Avatar" className="w-12 h-12 rounded-full" />
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
                <a href="statistics" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📊</span><span>Thống kê</span></a>
                <a href="dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📚</span><span>Lớp học của tôi</span></a>
                <a href="dashboard" className="flex items-center space-x-2 text-cyan-400 font-semibold"><span>🎓</span><span>Khóa học của tôi</span></a>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>❤️</span><span>Bài học video yêu thích</span></a>
                <a href="flashcards" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🗂️</span><span>Flashcard</span></a>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>📝</span><span>Ghi chú của tôi</span></a>
            </nav>
            <div className="pt-6 border-t border-gray-700">
                <nav className="space-y-4">
                    <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🧪</span><span>Kiểm tra năng lực</span></a>
                    <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white transition duration-150"><span>🕒</span><span>Lịch sử làm bài</span></a>
                </nav>
            </div>
        </div>
    );
};

// Header component
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

// Add Kanji Screen component
const AddKanjiScreen = () => {
    const [kanji, setKanji] = useState('');
    const [meaningJP, setMeaningJP] = useState('');
    const [meaningVN, setMeaningVN] = useState('');
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);

    const handleKanjiChange = (e) => setKanji(e.target.value);
    const handleMeaningJPChange = (e) => setMeaningJP(e.target.value);
    const handleMeaningVNChange = (e) => setMeaningVN(e.target.value);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleGifChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setGif(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic lưu Kanji, nghĩa, hình ảnh và GIF (có thể gọi API hoặc cập nhật state)
        console.log('Kanji:', kanji);
        console.log('Meaning (JP):', meaningJP);
        console.log('Meaning (VN):', meaningVN);
        console.log('Image:', image);
        console.log('GIF:', gif);
    };

    return (
        <div className="flex">
            <Sidebar isOpen={true} onClose={() => {}} />
            <div className="flex-1">
                <Header onMenuClick={() => {}} />
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Add Kanji</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Upload Image */}
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium">Upload Image</label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {image && <img src={image} alt="Kanji" className="mt-4 w-full h-40 object-cover rounded-md" />}
                            </div>

                            {/* Upload GIF */}
                            <div>
                                <label htmlFor="gif" className="block text-sm font-medium">Upload GIF</label>
                                <input
                                    id="gif"
                                    type="file"
                                    accept="image/gif"
                                    onChange={handleGifChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {gif && <img src={gif} alt="Kanji GIF" className="mt-4 w-full h-40 object-cover rounded-md" />}
                            </div>
                        </div>

                        {/* Kanji */}
                        <div>
                            <label htmlFor="kanji" className="block text-sm font-medium">Kanji</label>
                            <input
                                id="kanji"
                                type="text"
                                value={kanji}
                                onChange={handleKanjiChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter Kanji"
                            />
                        </div>

                        {/* Meaning JP */}
                        <div>
                            <label htmlFor="meaningJP" className="block text-sm font-medium">Nghĩa tiếng Nhật</label>
                            <input
                                id="meaningJP"
                                type="text"
                                value={meaningJP}
                                onChange={handleMeaningJPChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter Meaning (Japanese)"
                            />
                        </div>

                        {/* Meaning VN */}
                        <div>
                            <label htmlFor="meaningVN" className="block text-sm font-medium">Nghĩa tiếng Việt</label>
                            <input
                                id="meaningVN"
                                type="text"
                                value={meaningVN}
                                onChange={handleMeaningVNChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter Meaning (Vietnamese)"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
                        >
                            Add Kanji
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddKanjiScreen;