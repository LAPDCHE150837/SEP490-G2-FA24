import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, Clock, Target, MoreVertical, Edit, Trash, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import StudyButton from "./StudyButton.jsx";
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});
const FlashcardSetList = () => {
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [flashcardSets, setFlashcardSets] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        totalCards: 0
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        category: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            title: '',
            description: '',
            category: ''
        };

        if (!formData.title.trim()) {
            newErrors.title = 'Vui lòng nhập tên bộ thẻ';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Vui lòng nhập mô tả';
            isValid = false;
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Vui lòng nhập danh mục';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateSet = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await api.post('/flashcard-sets', formData);
            setShowCreateModal(false);
            fetchFlashcardSets();
            setFormData({ title: '', description: '', category: '', totalCards: 0 });
            setErrors({ title: '', description: '', category: '' });
        } catch (error) {
            console.error('Error creating flashcard set:', error);
        }
    };

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchFlashcardSets();
    }, []);

    const fetchFlashcardSets = async () => {
        try {
            const { data } = await api.get('/flashcard-sets');
            setFlashcardSets(data.data);
        } catch (error) {
            console.error('Error fetching flashcard sets:', error);
        }
    };


    const handleDelete = async (e, setId) => {
        e.stopPropagation();
        if (window.confirm('Bạn có chắc chắn muốn xóa bộ thẻ này?')) {
            try {
                await api.delete(`/flashcard-sets/${setId}`);
                fetchFlashcardSets();
            } catch (error) {
                console.error('Error deleting flashcard set:', error);
            }
        }
        setActiveMenu(null);
    };

    const handleEdit = (e, setId) => {
        e.stopPropagation();
        navigate(`/flashcards/${setId}/edit`);
        setActiveMenu(null);
    };

    const handleStudy = (e, setId) => {
        e.stopPropagation();
        navigate(`/flashcards/${setId}/study`);
        setActiveMenu(null);
    };
// Format date to "DD/MM/YYYY"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

// Format date to "HH:mm DD/MM/YYYY"
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${formatDate(date)}`;
    };

    const handleStudyAll = (setId) => {
        navigate(`/flashcards/${setId}/study`);
        // Logic for studying entire set
        console.log(`Studying all cards in set ${setId}`);
    };

    const handleStudyUnknown = (setId) => {
        navigate(`/flashcards/${setId}/study/isNotMemory`);
        // Logic for studying only unknown cards
        console.log(`Studying unknown cards in set ${setId}`);
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
                        className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4">{set.title}</h3>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <BookOpen size={18} className="mr-2"/>
                                <span>{set.totalCards} thẻ</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Clock size={18} className="mr-2"/>
                                <span>Danh mục: {set.category}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Target size={18} className="mr-2"/>
                                <span>{set.description}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Clock size={18} className="mr-2"/>
                                <span>Thời gian tạo {formatDateTime(set.createdAt)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Clock size={18} className="mr-2"/>
                                <span>Lần cuối cập nhật {formatDateTime(set.updatedAt)}</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2 mt-4">
                                <button
                                    onClick={() => navigate(`/flashcards/${set.id}/cards`)}
                                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    <BookOpen size={20}/>
                                    <span>Xem thẻ</span>
                                </button>
                                {set.totalCards !== 0 ? (
                                    <StudyButton
                                        set={{ id: `${set.id}` }}
                                        onStudyAll={handleStudyAll}
                                        onStudyUnknown={handleStudyUnknown}
                                    />
                                ) : ""}
                                <button
                                    onClick={(e) => handleEdit(e, set.id)}
                                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    <Edit size={16}/>
                                    <span>Sửa</span>
                                </button>
                                <button
                                    onClick={(e) => handleDelete(e, set.id)}
                                    className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    <Trash size={16}/>
                                    <span>Xóa</span>
                                </button>
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
                        <form onSubmit={handleCreateSet} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên bộ thẻ
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({...formData, title: e.target.value});
                                        if (errors.title) setErrors({...errors, title: ''});
                                    }}
                                    className={`w-full border rounded-lg px-3 py-2 ${errors.title ? 'border-red-500' : ''}`}
                                    placeholder="Nhập tên bộ thẻ..."
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mô tả
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData({...formData, description: e.target.value});
                                        if (errors.description) setErrors({...errors, description: ''});
                                    }}
                                    className={`w-full border rounded-lg px-3 py-2 ${errors.description ? 'border-red-500' : ''}`}
                                    rows="3"
                                    placeholder="Nhập mô tả..."
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Danh mục
                                </label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => {
                                        setFormData({...formData, category: e.target.value});
                                        if (errors.category) setErrors({...errors, category: ''});
                                    }}
                                    className={`w-full border rounded-lg px-3 py-2 ${errors.category ? 'border-red-500' : ''}`}
                                    placeholder="Nhập danh mục..."
                                />
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setErrors({ title: '', description: '', category: '' });
                                        setFormData({ title: '', description: '', category: '', totalCards: 0 });
                                    }}
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