import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X } from 'lucide-react';
import axios from 'axios';
import { useToast } from "../../../context/ToastProvider.jsx";
import CRMLayout from "../Crm.jsx";

const LessonDetailTabs = ({ lessonId }) => {
    const [activeTab, setActiveTab] = useState('vocabularies');
    const [loading, setLoading] = useState(true);
    const [lessonData, setLessonData] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const { showToast } = useToast();

    const getAuthConfig = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
    });

    const fetchLessonData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/lessons/${lessonId}`, getAuthConfig());
            setLessonData(response.data.data);
        } catch (error) {
            showToast('Không thể tải dữ liệu bài học', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessonData();
    }, [lessonId]);

    const handleAdd = async (type, data) => {
        try {
            const endpoints = {
                vocabularies: 'http://localhost:8080/api/v1/vocabularies',
                grammars: 'http://localhost:8080/api/v1/grammars',
                kanjis: 'http://localhost:8080/api/v1/kanjis'
            };

            const payload = type === 'grammars'
                ? { ...data, lesson: { id: lessonId } }
                : { ...data, lesson: { id: lessonId } };

            await axios.post(endpoints[type], payload, getAuthConfig());
            showToast(`Thêm dữ liệu thành công`, 'success');
            setModalType(null);
            fetchLessonData();
        } catch (error) {
            showToast(`Thêm dữ liệu thất bại`, 'error');
        }
    };

    const handleEdit = async (type, id, data) => {
        try {
            const payload = type === 'grammars'
                ? { ...data, lesson: { id: lessonId } }
                : { ...data, lessonId };

            await axios.put(`http://localhost:8080/api/v1/${type}/${id}`, payload, getAuthConfig());
            showToast(`Cập nhật ${type} thành công`, 'success');
            setModalType(null);
            fetchLessonData();
        } catch (error) {
            showToast(`Cập nhật dữ liệu thất bại`, 'error');
        }
    };

    const handleDelete = async (type, id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/${type}/${id}`, getAuthConfig());
                showToast(`Xóa dữ liệu thành công`, 'success');
                fetchLessonData();
            } catch (error) {
                showToast(`Xóa ${type} thất bại`, 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin"/>
            </div>
        );
    }

    if (!lessonData) {
        return <div>Không tìm thấy dữ liệu bài học</div>;
    }

    return (
        <div className="mt-4">
            <div className="border-b border-gray-200">
                <div className="flex space-x-4">
                    <TabButton
                        active={activeTab === 'vocabularies'}
                        onClick={() => setActiveTab('vocabularies')}
                        count={lessonData.vocabularies?.length || 0}
                        label="Từ vựng"
                    />
                    <TabButton
                        active={activeTab === 'grammars'}
                        onClick={() => setActiveTab('grammars')}
                        count={lessonData.grammars?.length || 0}
                        label="Ngữ pháp"
                    />
                    <TabButton
                        active={activeTab === 'kanjis'}
                        onClick={() => setActiveTab('kanjis')}
                        count={lessonData.kanjis?.length || 0}
                        label="Kanji"
                    />
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4"> {/* Add subtle background to content area */}
                {activeTab === 'vocabularies' && (
                    <TabPanel
                        title="Danh sách từ vựng"
                        onAdd={() => {
                            setSelectedItem(null);
                            setModalType('vocabulary');
                        }}
                    >
                        <VocabularyTable
                            data={lessonData.vocabularies}
                            onEdit={item => {
                                setSelectedItem(item);
                                setModalType('vocabulary');
                            }}
                            onDelete={id => handleDelete('vocabularies', id)}
                        />
                    </TabPanel>
                )}

                {activeTab === 'grammars' && (
                    <TabPanel
                        title="Danh sách ngữ pháp"
                        onAdd={() => {
                            setSelectedItem(null);
                            setModalType('grammar');
                        }}
                    >
                        <GrammarTable
                            data={lessonData.grammars}
                            onEdit={item => {
                                setSelectedItem(item);
                                setModalType('grammar');
                            }}
                            onDelete={id => handleDelete('grammars', id)}
                        />
                    </TabPanel>
                )}

                {activeTab === 'kanjis' && (
                    <TabPanel
                        title="Danh sách Kanji"
                        onAdd={() => {
                            setSelectedItem(null);
                            setModalType('kanji');
                        }}
                    >
                        <KanjiTable
                            data={lessonData.kanjis}
                            onEdit={item => {
                                setSelectedItem(item);
                                setModalType('kanji');
                            }}
                            onDelete={id => handleDelete('kanjis', id)}
                        />
                    </TabPanel>
                )}
            </div>

            {modalType === 'vocabulary' && (
                <VocabularyModal
                    data={selectedItem}
                    onClose={() => setModalType(null)}
                    onSubmit={data => selectedItem
                        ? handleEdit('vocabularies', selectedItem.id, data)
                        : handleAdd('vocabularies', data)
                    }
                />
            )}

            {modalType === 'grammar' && (
                <GrammarModal
                    data={selectedItem}
                    onClose={() => setModalType(null)}
                    onSubmit={data => selectedItem
                        ? handleEdit('grammars', selectedItem.id, data)
                        : handleAdd('grammars', data)
                    }
                />
            )}

            {modalType === 'kanji' && (
                <KanjiModal
                    data={selectedItem}
                    onClose={() => setModalType(null)}
                    onSubmit={data => selectedItem
                        ? handleEdit('kanjis', selectedItem.id, data)
                        : handleAdd('kanjis', data)
                    }
                />
            )}
        </div>
    );
};

// Components
const TabButton = ({active, onClick, count, label}) => (
    <button
        onClick={onClick}
        className={`py-2 px-4 relative ${
            active
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
        }`}
    >
        {label} ({count})
    </button>
);

const TabPanel = ({title, onAdd, children}) => (
    <div>
        <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
                onClick={onAdd}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
                <Plus size={16}/>
                Thêm mới
            </button>
        </div>
        {children}
    </div>
);

const TableActions = ({onEdit, onDelete }) => (
    <div className="flex justify-end space-x-2">
        <button
            onClick={onEdit}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Sửa"
        >
            <Edit2 className="w-4 h-4" />
        </button>
        <button
            onClick={onDelete}
            className="p-1 text-red-600 hover:text-red-800"
            title="Xóa"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    </div>
);

// Table Components
const VocabularyTable = ({ data, onEdit, onDelete }) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4">Từ vựng</th>
                <th className="text-left py-3 px-4">Nghĩa</th>
                <th className="text-left py-3 px-4">Ví dụ</th>
                <th className="text-left py-3 px-4">Cách đọc ví dụ</th>
                <th className="text-left py-3 px-4">Nghĩa ví dụ</th>
                <th className="text-left py-3 px-4">Hình ảnh</th>
                <th className="text-left py-3 px-4">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id} className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        hover:bg-gray-100 transition-colors
                    `}>
                    <td className="py-3 px-4">{item.word}</td>
                    <td className="py-3 px-4">{item.meaning}</td>
                    <td className="py-3 px-4">{item.example}</td>
                    <td className="py-3 px-4">{item.exampleReading}</td>
                    <td className="py-3 px-4">{item.exampleMeaning}</td>
                    <td className="py-3 px-4">
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt="Item"
                                className="h-12 w-auto rounded"
                            />
                        )}
                    </td>
                    <td className="py-3 px-4">
                        <TableActions
                            onEdit={() => onEdit(item)}
                            onDelete={() => onDelete(item.id)}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

const GrammarTable = ({data, onEdit, onDelete}) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4">Mẫu câu</th>
                <th className="text-left py-3 px-4">Ý nghĩa</th>
                <th className="text-left py-3 px-4">Cách dùng</th>
                <th className="text-left py-3 px-4">Ví dụ</th>
                <th className="text-left py-3 px-4">Cách đọc ví dụ</th>
                <th className="text-left py-3 px-4">Nghĩa ví dụ</th>
                <th className="text-left py-3 px-4">Ảnh</th>
                <th className="text-right py-3 px-4">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id} className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        hover:bg-gray-100 transition-colors
                    `}>
                    <td className="py-3 px-4">{item.pattern}</td>
                    <td className="py-3 px-4">{item.meaning}</td>
                    <td className="py-3 px-4">{item.grammarUsage}</td>
                    <td className="py-3 px-4">{item.example}</td>
                    <td className="py-3 px-4">{item.exampleReading}</td>
                    <td className="py-3 px-4">{item.exampleMeaning}</td>
                    <td className="py-3 px-4">
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt="Item"
                                className="h-12 w-auto rounded"
                            />
                        )}
                    </td>
                    <td className="py-3 px-4">
                        <TableActions
                            onEdit={() => onEdit(item)}
                            onDelete={() => onDelete(item.id)}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

const KanjiTable = ({data, onEdit, onDelete}) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4">Kanji</th>
                <th className="text-left py-3 px-4">Âm On</th>
                <th className="text-left py-3 px-4">Âm Kun</th>
                <th className="text-left py-3 px-4">Nghĩa</th>
                <th className="text-left py-3 px-4">Ảnh</th>
                <th className="text-right py-3 px-4">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.id} className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        hover:bg-gray-100 transition-colors
                    `}>
                    <td className="py-3 px-4">{item.character}</td>
                    <td className="py-3 px-4">{item.onyomi}</td>
                    <td className="py-3 px-4">{item.kunyomi}</td>
                    <td className="py-3 px-4">{item.meaning}</td>
                    <td className="py-3 px-4">
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt="Item"
                                className="h-12 w-auto rounded"
                            />
                        )}
                    </td>
                    <td className="py-3 px-4">
                        <TableActions
                            onEdit={() => onEdit(item)}
                            onDelete={() => onDelete(item.id)}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

// Modal Components
const Modal = ({title, onClose, children}) => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
            <div className="relative bg-white rounded-xl w-full max-w-lg shadow-xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const VocabularyModal = ({ data, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        word: data?.word || '',
        reading: data?.reading || '',
        meaning: data?.meaning || '',
        example: data?.example || '',
        exampleReading: data?.exampleReading || '',
        exampleMeaning: data?.exampleMeaning || '',
        imageUrl: data?.imageUrl || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal title={data ? 'Sửa từ vựng' : 'Thêm từ vựng mới'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Từ vựng</label>
                    <input
                        type="text"
                        value={formData.word}
                        onChange={(e) => setFormData({...formData, word: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hiragana</label>
                    <input
                        type="text"
                        value={formData.reading}
                        onChange={(e) => setFormData({...formData, reading: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nghĩa</label>
                    <input
                        type="text"
                        value={formData.meaning}
                        onChange={(e) => setFormData({...formData, meaning: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Ví dụ</label>
                    <input
                        type="text"
                        value={formData.example}
                        onChange={(e) => setFormData({...formData, example: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cách đọc ví dụ</label>
                    <input
                        type="text"
                        value={formData.exampleReading}
                        onChange={(e) => setFormData({...formData, exampleReading: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nghĩa ví dụ</label>
                    <input
                        type="text"
                        value={formData.exampleMeaning}
                        onChange={(e) => setFormData({...formData, exampleMeaning: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input
                        type="text"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="Nhập URL hình ảnh"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    {formData.imageUrl && (
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="mt-2 h-32 w-auto rounded-lg"
                        />
                    )}
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        {data ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const GrammarModal = ({data, onClose, onSubmit}) => {
    const [formData, setFormData] = useState({
        pattern: data?.pattern || '',
        meaning: data?.meaning || '',
        usage: data?.grammarUsage || '',
        example: data?.example || '',
        exampleReading: data?.exampleReading || '',
        exampleMeaning: data?.exampleMeaning || '',
        imageUrl: data?.imageUrl || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal title={data ? 'Sửa ngữ pháp' : 'Thêm ngữ pháp mới'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mẫu câu</label>
                    <input
                        type="text"
                        value={formData.pattern}
                        onChange={(e) => setFormData({...formData, pattern: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ý nghĩa</label>
                    <input
                        type="text"
                        value={formData.meaning}
                        onChange={(e) => setFormData({...formData, meaning: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cách dùng</label>
                    <input
                        type="text"
                        value={formData.usage}
                        onChange={(e) => setFormData({...formData, usage: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ví dụ</label>
                    <input
                        type="text"
                        value={formData.example}
                        onChange={(e) => setFormData({...formData, example: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cách đọc ví dụ</label>
                    <input
                        type="text"
                        value={formData.exampleReading}
                        onChange={(e) => setFormData({...formData, exampleReading: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nghĩa của ví dụ</label>
                    <input
                        type="text"
                        value={formData.exampleMeaning}
                        onChange={(e) => setFormData({...formData, exampleMeaning: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input
                        type="text"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="Nhập URL hình ảnh"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    {formData.imageUrl && (
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="mt-2 h-32 w-auto rounded-lg"
                        />
                    )}
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        {data ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const KanjiModal = ({data, onClose, onSubmit}) => {
    const [formData, setFormData] = useState({
        character: data?.character || '',
        onyomi: data?.onyomi || '',
        kunyomi: data?.kunyomi || '',
        meaning: data?.meaning || '',
        imageUrl: data?.imageUrl || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal title={data ? 'Sửa Kanji' : 'Thêm Kanji mới'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kanji</label>
                    <input
                        type="text"
                        value={formData.character}
                        onChange={(e) => setFormData({...formData, character: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Âm On</label>
                    <input
                        type="text"
                        value={formData.onyomi}
                        onChange={(e) => setFormData({...formData, onyomi: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Âm Kun</label>
                    <input
                        type="text"
                        value={formData.kunyomi}
                        onChange={(e) => setFormData({...formData, kunyomi: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nghĩa</label>
                    <input
                        type="text"
                        value={formData.meaning}
                        onChange={(e) => setFormData({...formData, meaning: e.target.value})}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input
                        type="text"
                        value={formData.imageUrl || ''}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="Nhập URL hình ảnh"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    {formData.imageUrl && (
                        <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="mt-2 h-32 w-auto rounded-lg"
                        />
                    )}
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        {data ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default LessonDetailTabs;