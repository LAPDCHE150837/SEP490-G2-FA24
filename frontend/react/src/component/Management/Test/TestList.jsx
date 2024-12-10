// pages/TestManagement/TestList.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search, Clock, Award, ChevronUp, ChevronDown,ChevronLeft ,ChevronRight } from 'lucide-react';
import axios from 'axios';
import {CreateTestModal} from "./CreateTestModal.jsx";
import {EditTestModal} from "./EditTestModal.jsx";
import CRMLayout from "../Crm.jsx";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {EditQuestionModal} from "../Question/EditQuestionModal.jsx";

const TestList = () => {
    const [courses, setCourses] = useState([]);
    const [tests, setTests] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [lessons, setLessons] = useState([]);
    const navigate = useNavigate();

    // Search states
    const [searchColumn, setSearchColumn] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    // Add pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const paginationOptions = [10, 25, 50, 100];
    const getFilteredTests = () => {
        return tests.filter(test => {
            const lesson = lessons.find(l => l.id === test.lessonId);
            const course = lesson ? courses.find(c => c.id === lesson.courseId) : null;
            const searchTermLower = searchTerm.toLowerCase();

            // If no search term, return all tests
            if (!searchTerm) return true;

            // Search in all columns
            if (searchColumn === 'all') {
                return (
                    (course?.title || '').toLowerCase().includes(searchTermLower) ||
                    (lesson?.title || '').toLowerCase().includes(searchTermLower) ||
                    test.title.toLowerCase().includes(searchTermLower) ||
                    (test.description || '').toLowerCase().includes(searchTermLower) ||
                    test.duration.toString().includes(searchTermLower) ||
                    test.passScore.toString().includes(searchTermLower)
                );
            }

            // Search in specific column
            switch (searchColumn) {
                case 'course':
                    return (course?.title || '').toLowerCase().includes(searchTermLower);
                case 'lesson':
                    return (lesson?.title || '').toLowerCase().includes(searchTermLower);
                case 'title':
                    return test.title.toLowerCase().includes(searchTermLower);
                case 'description':
                    return (test.description || '').toLowerCase().includes(searchTermLower);
                case 'duration':
                    return test.duration.toString().includes(searchTermLower);
                case 'passScore':
                    return test.passScore.toString().includes(searchTermLower);
                default:
                    return true;
            }
        });
    };

    // Get paginated tests
    const getPaginatedTests = () => {
        const filteredData = getFilteredTests();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredData.slice(indexOfFirstItem, indexOfLastItem);
    };

    // Calculate total pages
    const totalPages = Math.ceil(getFilteredTests().length / itemsPerPage);

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, searchColumn]);

    // Column options for search
    const searchColumns = [
        { value: 'all', label: 'Tất cả' },
        { value: 'course', label: 'Khóa học' },
        { value: 'lesson', label: 'Bài học' },
        { value: 'title', label: 'Tiêu đề' },
        { value: 'description', label: 'Mô tả' },
        { value: 'duration', label: 'Thời gian' },
        { value: 'passScore', label: 'Điểm đạt' }
    ];

    // ... keep existing fetch functions and API setup ...


    const [formData, setFormData] = useState({
        lesson: {
            id: ""
        },
        title: '',
        description: '',
        duration: 30,
        passScore: 0
    });

    const fetchLessons = async () => {
        try {
            const { data } = await api.get('/lessons');
            setLessons(data.data);
            // Set default lesson if there are lessons available
            if (data.data.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    lesson: { id: data.data[0].id }
                }));
            }
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    };
    // ... existing API and fetch code ...
    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchTests();
        fetchLessons();
        fetchCourses();
    }, []);

    const fetchTests = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const decodedToken = jwtDecode(token);
            if (decodedToken.permission[0].authority !== "ROLE_TEACHER") {
                navigate("/denied")
            }

            setLoading(true);
            const { data } = await api.get('/tests');
            setTests(data.data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        } finally {
            setLoading(false);
        }
    };


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

    const handleDelete = async (testId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài kiểm tra này?')) {
            try {
                await api.delete(`/tests/${testId}`);
                fetchTests();
            } catch (error) {
                console.error('Error deleting test:', error);
            }
        }
    };

    const handleEdit = (test) => {
        setSelectedTest(test);
        setShowEditModal(true);
    };

    const filteredTests = tests.filter(test =>
        test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortedTests = () => {
        let sortedTests = [...filteredTests];
        if (sortConfig.key) {
            sortedTests.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedTests;
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) {
            return <div className="w-4" />;
        }
        return sortConfig.direction === 'asc' ?
            <ChevronUp size={16} /> :
            <ChevronDown size={16} />;
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    return (
        <CRMLayout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý bài kiểm tra</h1>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        <Plus size={20} />
                        <span>Tạo bài kiểm tra</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6 flex space-x-4">
                    <div className="flex-1 flex space-x-2">
                        <select
                            value={searchColumn}
                            onChange={(e) => setSearchColumn(e.target.value)}
                            className="border rounded-lg px-3 py-2 min-w-[150px]"
                        >
                            {searchColumns.map(column => (
                                <option key={column.value} value={column.value}>
                                    {column.label}
                                </option>
                            ))}
                        </select>
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={`Tìm kiếm ${searchColumns.find(c => c.value === searchColumn)?.label.toLowerCase() || ''}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('title')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Khóa học</span>
                                        <SortIcon columnKey="title"/>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('title')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Bài học</span>
                                        <SortIcon columnKey="title"/>
                                    </div>
                                </th>

                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('title')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Tiêu đề</span>
                                        <SortIcon columnKey="title"/>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mô tả
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('duration')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Thời gian</span>
                                        <SortIcon columnKey="duration"/>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('passScore')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Điểm đạt</span>
                                        <SortIcon columnKey="passScore"/>
                                    </div>
                                </th>

                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {getPaginatedTests().map(test => (
                                <tr key={test.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {(() => {
                                                // Find the lesson for this test
                                                const lesson = lessons.find(lesson => lesson.id === test.lessonId);

                                                // If lesson found, find its corresponding course
                                                const course = lesson
                                                    ? courses.find(course => course.id === lesson.courseId)
                                                    : null;

                                                // Return course title or a fallback
                                                return course ? course.title : 'No course';
                                            })()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">

                                            {lessons.find(lesson => lesson.id === test.lessonId)?.title || 'No lesson'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {test.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 max-w-xs truncate">
                                            {test.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock size={16} className="mr-2"/>
                                            {test.duration} phút
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Award size={16} className="mr-2"/>
                                            {test.passScore}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleEdit(test)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <Edit size={16}/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(test.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
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
                                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2
                                    focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {paginationOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option} / trang
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-500">
                                    Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, getFilteredTests().length)} - {Math.min(currentPage * itemsPerPage, getFilteredTests().length)} trong số {getFilteredTests().length} bài kiểm tra
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

                    {loading ? (
                        <div className="text-center py-4">Đang tải...</div>
                    ) : getFilteredTests().length === 0 ? (
                        <div className="text-center py-4 text-gray-500">
                            Không tìm thấy bài kiểm tra nào
                        </div>
                    ) : null}
                </div>


                {/* Modals remain the same */}
                {showCreateModal && (
                    <CreateTestModal
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={fetchTests}
                    />
                )}
                {showEditModal && (

                    <EditTestModal
                        test={selectedTest}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={fetchTests}
                    />

                )}

            </div>

        </CRMLayout>
    );
};

export default TestList;