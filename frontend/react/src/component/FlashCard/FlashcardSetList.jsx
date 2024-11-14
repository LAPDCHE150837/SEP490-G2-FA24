import React, { useState } from 'react';
import { Plus, BookOpen, Clock, Target, MoreVertical, Edit, Trash, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {DashboardLayout} from "../Layout/DashBoardLayout.jsx";

const FlashcardSetList = () => {
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const flashcardSets = [
        {
            id: 1,
            title: "N5 Basic Vocabulary",
            cardCount: 50,
            lastStudied: "2024-03-10",
            masteryLevel: 75
        },
        {
            id: 2,
            title: "Common Kanji N5",
            cardCount: 30,
            lastStudied: "2024-03-09",
            masteryLevel: 60
        }
    ];

    const handleActionClick = (e, setId) => {
        e.stopPropagation(); // Prevent card click event
        setActiveMenu(activeMenu === setId ? null : setId);
    };

    const handleEdit = (e, setId) => {
        e.stopPropagation(); // Prevent card click event
        navigate(`/flashcards/${setId}/edit`);
        setActiveMenu(null);
    };

    const handleDelete = (e, setId) => {
        e.stopPropagation(); // Prevent card click event
        // Implement delete confirmation modal
        console.log('Delete set:', setId);
        setActiveMenu(null);
    };

    const handleStudy = (e, setId) => {
        e.stopPropagation();
        navigate(`/flashcards/${setId}/study`);
        setActiveMenu(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Bộ thẻ ghi nhớ của tôi</h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <Plus size={20} />
                    <span>Tạo bộ thẻ mới</span>
                </button>
            </div>

            {/* Flashcard Sets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcardSets.map((set) => (
                    <div
                        key={set.id}
                        className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
                    >
                        {/* Action Menu Button */}
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={(e) => handleActionClick(e, set.id)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <MoreVertical size={20} className="text-gray-500" />
                            </button>

                            {/* Action Menu Dropdown */}
                            {activeMenu === set.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                                    <button
                                        onClick={(e) => handleStudy(e, set.id)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <Play size={16} />
                                        <span>Học ngay</span>
                                    </button>
                                    <button
                                        onClick={(e) => handleEdit(e, set.id)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                                    >
                                        <Edit size={16} />
                                        <span>Chỉnh sửa</span>
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, set.id)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 text-red-600"
                                    >
                                        <Trash size={16} />
                                        <span>Xóa</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Card Content */}
                        <h3 className="text-lg font-semibold mb-4 pr-8">{set.title}</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <BookOpen size={18} className="mr-2" />
                                <span>{set.cardCount} thẻ</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Clock size={18} className="mr-2" />
                                <span>Học lần cuối: {set.lastStudied}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Target size={18} className="mr-2" />
                                <span>Độ thành thạo: {set.masteryLevel}%</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 rounded-full h-2"
                                    style={{ width: `${set.masteryLevel}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Set Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Tạo bộ thẻ mới</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên bộ thẻ
                                </label>
                                <input
                                    type="text"
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder="Nhập tên bộ thẻ..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả
                                </label>
                                <textarea
                                    className="w-full border rounded-lg px-3 py-2"
                                    rows="3"
                                    placeholder="Nhập mô tả..."
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Tạo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default FlashcardSetList;