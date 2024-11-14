import React, { useState } from 'react';
import { Plus, X, Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const FlashcardEditor = () => {
    const navigate = useNavigate();
    const { setId } = useParams();
    const [cards, setCards] = useState([
        { id: 1, front: { text: '', type: 'vocabulary' }, back: { reading: '', meaning: '', example: '' } }
    ]);

    const handleAddCard = () => {
        const newCard = {
            id: cards.length + 1,
            front: { text: '', type: 'vocabulary' },
            back: { reading: '', meaning: '', example: '' }
        };
        setCards([...cards, newCard]);
    };

    const handleRemoveCard = (cardId) => {
        setCards(cards.filter(card => card.id !== cardId));
    };

    const handleCardChange = (cardId, field, value) => {
        setCards(cards.map(card => {
            if (card.id === cardId) {
                if (field.includes('.')) {
                    const [section, key] = field.split('.');
                    return {
                        ...card,
                        [section]: { ...card[section], [key]: value }
                    };
                }
                return { ...card, [field]: value };
            }
            return card;
        }));
    };

    const handleSave = () => {
        // Will handle saving to backend later
        console.log('Saving cards:', cards);
        navigate('/flashcards');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/flashcards')}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Chỉnh sửa bộ thẻ</h1>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    <Save size={20} />
                    <span>Lưu thay đổi</span>
                </button>
            </div>

            {/* Cards List */}
            <div className="space-y-6">
                {cards.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm text-gray-500">Thẻ #{card.id}</span>
                            <button
                                onClick={() => handleRemoveCard(card.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Front of Card */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Mặt trước</h3>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Loại thẻ
                                    </label>
                                    <select
                                        value={card.front.type}
                                        onChange={(e) => handleCardChange(card.id, 'front.type', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                    >
                                        <option value="vocabulary">Từ vựng</option>
                                        <option value="kanji">Kanji</option>
                                        <option value="grammar">Ngữ pháp</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Nội dung
                                    </label>
                                    <input
                                        type="text"
                                        value={card.front.text}
                                        onChange={(e) => handleCardChange(card.id, 'front.text', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Nhập nội dung..."
                                    />
                                </div>
                            </div>

                            {/* Back of Card */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Mặt sau</h3>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Cách đọc
                                    </label>
                                    <input
                                        type="text"
                                        value={card.back.reading}
                                        onChange={(e) => handleCardChange(card.id, 'back.reading', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Nhập cách đọc..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Ý nghĩa
                                    </label>
                                    <input
                                        type="text"
                                        value={card.back.meaning}
                                        onChange={(e) => handleCardChange(card.id, 'back.meaning', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                        placeholder="Nhập ý nghĩa..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Ví dụ
                                    </label>
                                    <textarea
                                        value={card.back.example}
                                        onChange={(e) => handleCardChange(card.id, 'back.example', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2"
                                        rows="2"
                                        placeholder="Nhập câu ví dụ..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Card Button */}
                <button
                    onClick={handleAddCard}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center space-x-2"
                >
                    <Plus size={20} />
                    <span>Thêm thẻ mới</span>
                </button>
            </div>
        </div>
    );
};

export default FlashcardEditor;