
import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2, Edit2, Trash2, Eye } from 'lucide-react';
import CRMLayout from "../Crm.jsx";
import GrammarModal from "./GrammarModal.jsx";
import { useToast } from "../../../context/ToastProvider.jsx";
import axios from "axios";

const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
});

const GrammarPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [grammars, setGrammars] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedGrammar, setSelectedGrammar] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [grammarsRes, lessonsRes] = await Promise.all([
                axios.get('http://localhost:8080/api/v1/grammars', getAuthConfig()),
                axios.get('http://localhost:8080/api/v1/lessons', getAuthConfig())
            ]);

            const enrichedGrammars = grammarsRes.data.data.map(grammar => ({
                ...grammar,
                lessonTitle: lessonsRes.data.data.find(l => l.id === grammar.lesson.id)?.title || 'Unknown Lesson'
            }));

            setGrammars(enrichedGrammars);
            setLessons(lessonsRes.data.data);
        } catch (err) {
            showToast('Không thể tải dữ liệu ngữ pháp', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (modalMode === 'create') {
                await axios.post('http://localhost:8080/api/v1/grammars', data, getAuthConfig());
                showToast('Thêm ngữ pháp thành công', 'success');
            } else {
                await axios.put(`http://localhost:8080/api/v1/grammars/${selectedGrammar.id}`, data, getAuthConfig());
                showToast('Cập nhật ngữ pháp thành công', 'success');
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            showToast(`Thao tác thất bại: ${error.message}`, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/grammars/${id}`, getAuthConfig());
            showToast('Xóa ngữ pháp thành công', 'success');
            fetchData();
        } catch (error) {
            showToast(`Xóa thất bại: ${error.message}`, 'error');
        }
    };

    const filteredGrammars = grammars?.filter(grammar => {
        if (!searchTerm) return true;
        return grammar.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grammar.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin"/>
        </div>
    );

    return (
        <CRMLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý Ngữ pháp</h1>
                        <p className="text-gray-600">Quản lý các mẫu ngữ pháp trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => {
                            setModalMode('create');
                            setSelectedGrammar(null);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4"/>
                        Thêm ngữ pháp mới
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo mẫu câu hoặc ý nghĩa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Bài học</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Mẫu câu</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ý nghĩa</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cách dùng</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredGrammars.map((grammar) => (
                                <tr key={grammar.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">{grammar.lessonTitle}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{grammar.pattern}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{grammar.meaning}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{grammar.usage}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedGrammar(grammar);
                                                    setModalMode('view');
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1 text-gray-600 hover:text-gray-800"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="w-5 h-5"/>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedGrammar(grammar);
                                                    setModalMode('edit');
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Sửa ngữ pháp"
                                            >
                                                <Edit2 className="w-5 h-5"/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(grammar.id)}
                                                className="p-1 text-red-600 hover:text-red-800"
                                                title="Xóa ngữ pháp"
                                            >
                                                <Trash2 className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <GrammarModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    mode={modalMode}
                    grammarData={selectedGrammar}
                    lessons={lessons}
                    onSubmit={handleSubmit}
                />
            )}
        </CRMLayout>
    );
};

export default GrammarPage;