import React, { useState, useEffect } from 'react';
import { Plus, X, Save, ArrowLeft,BookOpen } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FlashcardEditor = () => {
    const navigate = useNavigate();
    const { setId } = useParams();
    const [flashcardSet, setFlashcardSet] = useState({
        title: '',
        description: '',
        category: '',
        createdAt: '',
        updatedAt: ''
    });

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchFlashcardSet();
    }, [setId]);

    const fetchFlashcardSet = async () => {
        try {
            const { data } = await api.get(`/flashcard-sets/${setId}`);
            setFlashcardSet(data.data);
        } catch (error) {
            console.error('Error fetching flashcard set:', error);
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    const handleInputChange = (field, value) => {
        setFlashcardSet(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            await api.put(`/flashcard-sets/${setId}`, {
                title: flashcardSet.title,
                description: flashcardSet.description,
                category: flashcardSet.category
            });
            navigate('/flashcards');
        } catch (error) {
            console.error('Error updating flashcard set:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate('/flashcards')} className="text-gray-600 hover:text-gray-800">
                        <ArrowLeft size={24}/>
                    </button>
                    <h1 className="text-2xl font-bold">Chỉnh sửa bộ thẻ: {flashcardSet.title}</h1>
                </div>
                <div className="flex space-x-3">

                    <button onClick={handleSave}
                            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                        <Save size={20}/>
                        <span>Lưu thay đổi</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Tên bộ thẻ</label>
                    <input
                        type="text"
                        value={flashcardSet.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Mô tả</label>
                    <textarea
                        value={flashcardSet.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Danh mục</label>
                    <input
                        type="text"
                        value={flashcardSet.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>
                {flashcardSet.createdAt && (
                    <div className="text-sm text-gray-600">
                        Thời gian tạo: {formatDateTime(flashcardSet.createdAt)}
                    </div>
                )}
                {flashcardSet.updatedAt && (
                    <div className="text-sm text-gray-600">
                        Lần cuối cập nhật: {formatDateTime(flashcardSet.updatedAt)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlashcardEditor;