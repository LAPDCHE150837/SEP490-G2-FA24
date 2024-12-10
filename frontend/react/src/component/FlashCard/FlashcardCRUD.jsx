import React, { useState, useEffect } from 'react';
import { Plus, X, Save, ArrowLeft, Edit, Trash, Search, Filter } from 'lucide-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FlashcardCRUD = () => {
    const { setId } = useParams();
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentSetId, setCurrentSetId] = useState(null);
    const [formData, setFormData] = useState({
        frontText: '',
        frontType: 'Từ vựng',
        backReading: '',
        backMeaning: '',
        backExample: '',
        backExampleReading: ''
    });

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        if (setId) {
            fetchCards();
        }
    }, [setId]);

    const fetchCards = async () => {
        try {
            const { data } = await api.get('/flashcards/a', {
                params: { setId }
            });
            setCards(data.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCard) {
                await api.put(`/flashcards/${selectedCard.id}`, formData);
            } else {
                await api.post('/flashcards', {
                    ...formData,
                    set: { id: setId }
                });
            }
            fetchCards();
            resetForm();
        } catch (error) {
            console.error('Error saving card:', error);
        }
    };

    const handleDelete = async (cardId) => {
        if (window.confirm('Bạn có chắc muốn xóa thẻ này')) {
            try {
                await api.delete(`/flashcards/${cardId}`);
                fetchCards();
            } catch (error) {
                console.error('Error deleting card:', error);
            }
        }
    };

    const handleEdit = (card) => {
        setSelectedCard(card);
        setFormData({
            frontText: card.frontText,
            frontType: card.frontType,
            backReading: card.backReading,
            backMeaning: card.backMeaning,
            backExample: card.backExample,
            backExampleReading: card.backExampleReading
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setSelectedCard(null);
        setFormData({
            frontText: '',
            frontType: 'Từ vựng',
            backReading: '',
            backMeaning: '',
            backExample: '',
            backExampleReading: ''
        });
        setShowModal(false);
    };

    const filteredCards = cards.filter(card => {
        const matchesSearch = (
            card.frontText.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.backMeaning.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter = filter === 'all' || card.frontType === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(`/flashcards`)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={24}/>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý thẻ ghi nhớ</h1>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg
                     hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus size={20}/>
                        <span>Thêm thẻ</span>
                    </button>
                    <button
                        onClick={() => navigate(`/flashcards/${setId}/game`)}
                        className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2.5 rounded-lg
                     hover:bg-yellow-600 transition-colors shadow-sm"
                    >
                        <span>Chơi game</span>
                    </button>
                </div>
            </div>

            <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="text"
                            placeholder="Tìm kiếm thẻ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="all">Tất cả</option>
                    <option value="vocabulary">Từ vựng</option>
                    <option value="kanji">Kanji</option>
                    <option value="grammar">Ngữ pháp</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map(card => (
                    <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-2xl font-bold">{card.frontText}</div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(card)}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                >
                                    <Edit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(card.id)}
                                    className="p-1 text-red-500 hover:text-red-700"
                                >
                                    <Trash size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm text-gray-500">Loại: {card.frontType}</div>
                            <div className="text-lg">{card.backReading}</div>
                            <div>{card.backMeaning}</div>
                            <div className="text-gray-600">{card.backExample}</div>
                            <div className="text-sm text-gray-500">{card.backExampleReading}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                {selectedCard ? 'Chỉnh sửa thẻ' : 'Thêm thẻ'}
                            </h3>
                            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mặt trước
                                </label>
                                <input
                                    type="text"
                                    value={formData.frontText}
                                    onChange={(e) => setFormData({...formData, frontText: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại
                                </label>
                                <select
                                    value={formData.frontType}
                                    onChange={(e) => setFormData({...formData, frontType: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="Từ vựng">Từ vựng</option>
                                    <option value="kanji">Kanji</option>
                                    <option value="Ngữ pháp">Ngữ pháp</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mặt sau
                                </label>
                                <input
                                    type="text"
                                    value={formData.backReading}
                                    onChange={(e) => setFormData({...formData, backReading: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nghĩa
                                </label>
                                <input
                                    type="text"
                                    value={formData.backMeaning}
                                    onChange={(e) => setFormData({...formData, backMeaning: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ví dụ
                                </label>
                                <input
                                    type="text"
                                    value={formData.backExample}
                                    onChange={(e) => setFormData({...formData, backExample: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cách đọc ví dụ
                                </label>
                                <input
                                    type="text"
                                    value={formData.backExampleReading}
                                    onChange={(e) => setFormData({...formData, backExampleReading: e.target.value})}
                                    className="w-full border rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Thoát
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    {selectedCard ? 'Lưu' : 'Thêm '}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlashcardCRUD;