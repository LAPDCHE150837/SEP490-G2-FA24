// Components/Questions/QuestionList.jsx
import {EditQuestionModal} from "./EditQuestionModal.jsx";
import {CreateQuestionModal} from "./CreateQuestionModal.jsx";
import CRMLayout from "../Crm.jsx";
import { Plus, Edit, Trash, Search, Clock, Award, ChevronUp, ChevronDown, ChevronRight,Check  } from 'lucide-react';

import axios from "axios";
import React, { useState, useEffect } from 'react';

export const QuestionList = () => {
    const [tests, setTests] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [lessons, setLessons] = useState([]);

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchQuestions();
        fetchTests();
        fetchLessons();

    }, []);

    const fetchLessons = async () => {
        try {
            const { data } = await api.get('/lessons');
            setLessons(data.data);
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    };
    const fetchTests = async () => {
        try {
            const {data} = await api.get('/tests');
            setTests(data.data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const {data} = await api.get('/questions');
            setQuestions(data.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (questionId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
            try {
                await api.delete(`/questions/${questionId}`);
                fetchQuestions();
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        }
    };

    const handleEdit = (question) => {
        setSelectedQuestion(question);
        setShowEditModal(true);
    };

    const filteredQuestions = questions.filter(question =>
        question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.questionTranslation?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleRowExpansion = (questionId) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(questionId)) {
            newExpandedRows.delete(questionId);
        } else {
            newExpandedRows.add(questionId);
        }
        setExpandedRows(newExpandedRows);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});
    };

    const getSortedQuestions = () => {
        let sortedQuestions = [...filteredQuestions];
        if (sortConfig.key) {
            sortedQuestions.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedQuestions;
    };

    const SortIcon = ({columnKey}) => {
        if (sortConfig.key !== columnKey) {
            return <div className="w-4"/>;
        }
        return sortConfig.direction === 'asc' ?
            <ChevronUp size={16}/> :
            <ChevronDown size={16}/>;
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    const getQuestionTypeLabel = (type) => {
        const types = {
            'voca': 'Từ vựng',
            'grammar': 'Ngữ pháp',
            'kanji': 'Hán tự',
        };
        return types[type] || type;
    };
    return (
        <CRMLayout>
            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section with Stats */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Quản lý câu hỏi</h1>
                            <p className="text-gray-600 mt-1">Tổng số {questions.length} câu hỏi</p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Plus size={20}/>
                            <span>Tạo câu hỏi mới</span>
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Từ vựng', value: questions.filter(q => q.questionType === 'voca').length, color: 'blue' },
                            { label: 'Ngữ pháp', value: questions.filter(q => q.questionType === 'grammar').length, color: 'green' },
                            { label: 'Hán tự', value: questions.filter(q => q.questionType === 'kanji').length, color: 'yellow' },
                        ].map(stat => (
                            <div key={stat.label} className={`bg-${stat.color}-50 p-4 rounded-lg border border-${stat.color}-200`}>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo nội dung câu hỏi, dịch nghĩa..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <select
                                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            >
                                <option value="">Tất cả bài học</option>
                                {lessons.map(lesson => (
                                    <option key={lesson.id} value={lesson.title}>
                                        {lesson.title}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            >
                                <option value="">Tất cả loại câu hỏi</option>
                                <option value="voca">Từ vựng</option>
                                <option value="grammar">Ngữ pháp</option>
                                <option value="kanji">Hán tự</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Question List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="w-10 px-6 py-3"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bài học
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bài kiểm tra
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loại
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nội dung câu hỏi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dịch nghĩa
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {questions.map((question) => (
                                <React.Fragment key={question.id}>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleRowExpansion(question.id)}
                                                className="text-gray-500 hover:text-gray-700 transition-colors"
                                            >
                                                {expandedRows.has(question.id) ?
                                                    <ChevronDown size={20}/> :
                                                    <ChevronRight size={20}/>
                                                }
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {(() => {
                                                    const test = tests.find(t => t.id === question.testId);
                                                    const lesson = lessons.find(l => l.id === test?.lessonId);
                                                    return lesson?.title || 'N/A';
                                                })()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                {tests.find(test => test.id === question.testId)?.title || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                    ${question.questionType === 'voca' && 'bg-blue-100 text-blue-800'}
                                                    ${question.questionType === 'grammar' && 'bg-green-100 text-green-800'}
                                                    ${question.questionType === 'kanji' && 'bg-yellow-100 text-yellow-800'}
                                                `}>
                                                    {getQuestionTypeLabel(question.questionType)}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-md truncate">
                                                {question.questionText}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 max-w-md truncate">
                                                {question.questionTranslation}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(question)}
                                                    className="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <Edit size={16}/>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(question.id)}
                                                    className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                                                    title="Xóa"
                                                >
                                                    <Trash size={16}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {expandedRows.has(question.id) && (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4 bg-gray-50">
                                                <div className="ml-8 space-y-4">
                                                    <div className="text-sm space-y-2">
                                                        <div className="font-medium text-gray-900">Giải thích:</div>
                                                        <div className="text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                                                            {question.explanation}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="text-sm font-medium text-gray-900">Các lựa chọn:</div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {question.options?.map((option) => (
                                                                <div
                                                                    key={option.id}
                                                                    className={`p-4 rounded-lg border ${
                                                                        option.isCorrect
                                                                            ? 'border-green-500 bg-green-50'
                                                                            : 'border-gray-200'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                            <span className="text-sm">
                                                                                {option.optionText}
                                                                            </span>
                                                                        {option.isCorrect && (
                                                                            <Check size={16} className="text-green-500"/>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                            <div className="mt-2 text-gray-500">Đang tải...</div>
                        </div>
                    )}

                    {!loading && questions.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-2">
                                <Search size={48} className="mx-auto"/>
                            </div>
                            <div className="text-gray-500">
                                Không tìm thấy câu hỏi nào
                            </div>
                        </div>
                    )}
                </div>

                {/* Modals */}
                {showCreateModal && (
                    <CreateQuestionModal
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={fetchQuestions}
                    />
                )}

                {showEditModal && selectedQuestion && (
                    <EditQuestionModal
                        question={selectedQuestion}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedQuestion(null);
                        }}
                        onSuccess={fetchQuestions}
                    />
                )}
            </div>
        </CRMLayout>

    );
}

export default QuestionList;