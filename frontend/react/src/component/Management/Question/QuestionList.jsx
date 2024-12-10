// Components/Questions/QuestionList.jsx
import {EditQuestionModal} from "./EditQuestionModal.jsx";
import {CreateQuestionModal} from "./CreateQuestionModal.jsx";
import CRMLayout from "../Crm.jsx";
import { Plus, Edit, Trash, Search, Clock, Award, ChevronUp, ChevronDown, ChevronRight,Check ,ChevronLeft } from 'lucide-react';

import axios from "axios";
import React, { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

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
    // Updated search states
    const [selectedLesson, setSelectedLesson] = useState('');
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    // Updated search states
    const [searchText, setSearchText] = useState('');
    const [selectedColumn, setSelectedColumn] = useState('content'); // Default to content search
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const paginationOptions = [10, 25, 50, 100];
    // Updated filter function
    const getFilteredQuestions = () => {
        return questions.filter(question => {
            if (!searchText.trim()) return true;

            const test = tests.find(t => t.id === question.testId);
            const lesson = lessons.find(l => l.id === test?.lessonId);
            const course = lesson ? courses.find(c => c.id === lesson.courseId) : null;
            const searchLower = searchText.toLowerCase().trim();

            switch (selectedColumn) {
                case 'course':
                    return course?.title.toLowerCase().includes(searchLower);
                case 'lesson':
                    return lesson?.title.toLowerCase().includes(searchLower);
                case 'test':
                    return test?.title.toLowerCase().includes(searchLower);
                case 'content':
                default:
                    return (
                        question.questionText.toLowerCase().includes(searchLower) ||
                        (question.questionTranslation?.toLowerCase() || '').includes(searchLower) ||
                        (question.explanation?.toLowerCase() || '').includes(searchLower)
                    );
            }
        }).filter(question =>
            !selectedType || question.questionType === selectedType
        );
    };
    // Get paginated questions
    const getPaginatedQuestions = () => {
        const filteredData = getFilteredQuestions();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredData.slice(indexOfFirstItem, indexOfLastItem);
    };

    // Calculate total pages
    const totalPages = Math.ceil(getFilteredQuestions().length / itemsPerPage);

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, selectedColumn, selectedType]);
    const searchColumns = [
        { value: 'content', label: 'Nội dung câu hỏi' },
        { value: 'course', label: 'Khóa học' },
        { value: 'lesson', label: 'Bài học' },
        { value: 'test', label: 'Bài kiểm tra' }
    ];


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
        fetchCourses();

    }, []);
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/courses');
            setCourses(data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

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
        try {    const token = localStorage.getItem("access_token");
            const decodedToken = jwtDecode(token);
            if (decodedToken.permission[0].authority !== "ROLE_TEACHER") {
                navigate("/denied")
            }

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

                {/* Updated Search and Filter Section */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow flex gap-2">
                            <select
                                value={selectedColumn}
                                onChange={(e) => setSelectedColumn(e.target.value)}
                                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 min-w-[160px]"
                            >
                                {searchColumns.map(column => (
                                    <option key={column.value} value={column.value}>
                                        {column.label}
                                    </option>
                                ))}
                            </select>
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type="text"
                                    placeholder={`Tìm kiếm theo ${searchColumns.find(c => c.value === selectedColumn)?.label.toLowerCase()}...`}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                                />
                            </div>
                        </div>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 min-w-[160px]"
                        >
                            <option value="">Tất cả loại câu hỏi</option>
                            <option value="voca">Từ vựng</option>
                            <option value="grammar">Ngữ pháp</option>
                            <option value="kanji">Hán tự</option>
                        </select>
                    </div>
                </div>


                {/* Question List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khóa học</th>
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
                            {getPaginatedQuestions().map((question) => (
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

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {(() => {
                                                    const test = tests.find(t => t.id === question.testId);

                                                    // Find the lesson for this test
                                                    const lesson = lessons.find(l => l.id === test?.lessonId);

                                                    // If lesson found, find its corresponding course
                                                    const course = lesson
                                                        ? courses.find(course => course.id === lesson.courseId)
                                                        : null;

                                                    // Return course title or a fallback
                                                    return course ? course.title : 'No course';
                                                })()}
                                            </div>
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
                                                        <div
                                                            className="text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                                                            {question.explanation}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="text-sm font-medium text-gray-900">Các lựa
                                                            chọn:
                                                        </div>
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
                    {/* Pagination Controls */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="border rounded-lg px-2 py-1 text-sm focus:ring-2
                                    focus:ring-blue-200 focus:border-blue-400"
                                >
                                    {paginationOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option} / trang
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-600">
                                    Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, getFilteredQuestions().length)} - {Math.min(currentPage * itemsPerPage, getFilteredQuestions().length)} trong số {getFilteredQuestions().length} câu hỏi
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg transition-colors ${
                                        currentPage === 1
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    // Show first page, last page, current page and one page on each side
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                    currentPage === pageNumber
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg transition-colors ${
                                        currentPage === totalPages
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>


                    {!loading && getFilteredQuestions().length === 0 && (
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