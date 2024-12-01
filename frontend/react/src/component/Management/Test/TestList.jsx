// pages/TestManagement/TestList.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search, Clock, Award, ChevronUp, ChevronDown } from 'lucide-react';
import axios from 'axios';
import {CreateTestModal} from "./CreateTestModal.jsx";
import {EditTestModal} from "./EditTestModal.jsx";
import CRMLayout from "../Crm.jsx";

const TestList = () => {
    const [tests, setTests] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [lessons, setLessons] = useState([]);
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
    }, []);

    const fetchTests = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/tests');
            setTests(data.data);
        } catch (error) {
            console.error('Error fetching tests:', error);
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

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài kiểm tra..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
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
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('createdAt')}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Ngày tạo</span>
                                        <SortIcon columnKey="createdAt"/>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {getSortedTests().map(test => (
                                <tr key={test.id} className="hover:bg-gray-50">
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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDateTime(test.createdAt)}
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
                    {loading ? (
                        <div className="text-center py-4">Đang tải...</div>
                    ) : filteredTests.length === 0 ? (
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

                {showEditModal && selectedTest && (
                    <EditTestModal
                        test={selectedTest}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedTest(null);
                        }}
                        onSuccess={fetchTests}
                    />
                )}
            </div>
        </CRMLayout>
    );
};

export default TestList;