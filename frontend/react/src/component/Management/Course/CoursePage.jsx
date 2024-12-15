import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2, Edit2, Trash2, Eye,ChevronLeft,ChevronRight  } from 'lucide-react';
import CRMLayout from "../Crm.jsx";
import { useToast } from "../../../context/ToastProvider.jsx";
import axios from "axios";
import CourseModal from "./CourseModal.jsx";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

const CoursePage = () => {
    const [searchColumn, setSearchColumn] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

// Add pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const paginationOptions = [10, 25, 50, 100];
    const getFilteredCourses = () => {
        if (!searchTerm) return courses;

        return courses.filter(course => {
            const searchLower = searchTerm.toLowerCase().trim();

            switch (searchColumn) {
                case 'title':
                    return course.title.toLowerCase().includes(searchLower);
                case 'description':
                    return course.description.toLowerCase().includes(searchLower);
                case 'level':
                    return course.level.toLowerCase().includes(searchLower);
                default:
                    return true;
            }
        });
    };
    // Get paginated courses
    const getPaginatedCourses = () => {
        const filteredData = getFilteredCourses();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredData.slice(indexOfFirstItem, indexOfLastItem);
    };

    // Calculate total pages
    const totalPages = Math.ceil(getFilteredCourses().length / itemsPerPage);

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, searchColumn]);

    // Define search columns
    const searchColumns = [
        { value: 'title', label: 'Tên khóa học' },
        { value: 'description', label: 'Mô tả' },
        { value: 'level', label: 'Cấp độ' }
    ];


    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const decodedToken = jwtDecode(token);
            if (decodedToken.permission[0].authority !== "ROLE_TEACHER") {
                navigate("/denied")
            }
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/v1/courses',getAuthConfig());
            setCourses(response.data.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Không thể tải dữ liệu khóa học');
            setCourses([]);
            showToast?.('Không thể tải dữ liệu khóa học', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (modalMode === 'create') {
                await axios.post('http://localhost:8080/api/v1/courses' ,data,getAuthConfig());
                showToast('Thêm khóa học thành công', 'success');
            } else {
                await axios.put(`http://localhost:8080/api/v1/courses/${selectedCourse.id}` ,data,getAuthConfig());
                showToast('Cập nhật khóa học thành công', 'success');
            }
            setIsModalOpen(false);
            fetchCourses();
        } catch (error) {
            showToast(`Thao tác thất bại: ${error.message}`, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/courses/${id}`,getAuthConfig());
            showToast('Xóa khóa học thành công', 'success');
            fetchCourses();
        } catch (error) {
            showToast(`Xóa thất bại: ${error.message}`, 'error');
        }
    };



    const filteredCourses = courses?.filter(course => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return course?.title?.toLowerCase().includes(searchLower);
    }) || [];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin"/>
            </div>
        );
    }

    return (
        <CRMLayout>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý Khóa học</h1>
                        <p className="text-gray-600">Quản lý các khóa học trong hệ thống</p>
                    </div>
                    <button
                        onClick={() => {
                            setModalMode('create');
                            setSelectedCourse(null);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4"/>
                        Thêm khóa học mới
                    </button>
                </div>


                {/* Updated search section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 flex gap-2">
                        <select
                            value={searchColumn}
                            onChange={(e) => setSearchColumn(e.target.value)}
                            className="w-48 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-3"
                        >
                            {searchColumns.map(column => (
                                <option key={column.value} value={column.value}>
                                    {column.label}
                                </option>
                            ))}
                        </select>
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <input
                                type="text"
                                placeholder={`Tìm kiếm theo ${searchColumns.find(c => c.value === searchColumn)?.label.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Tên khóa học</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Mô tả</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cấp độ</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Số bài học</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ảnh</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {getPaginatedCourses().map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium">{course.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{course.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{course.level}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{course.totalLessons}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {course.imageUrl ? (
                                                <img
                                                    src={course.imageUrl}
                                                    alt={course.title}
                                                    className="w-16 h-16 object-cover rounded-lg mr-3"
                                                />
                                            ) : (
                                                <div
                                                    className="w-16 h-16 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs">No image</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedCourse(course);
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
                                                    setSelectedCourse(course);
                                                    setModalMode('edit');
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Sửa khóa học"
                                            >
                                                <Edit2 className="w-5 h-5"/>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="p-1 text-red-600 hover:text-red-800"
                                                title="Xóa khóa học"
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
                                    className="border border-gray-300 rounded-xl px-2 py-1 text-sm focus:ring-2
                                    focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    {paginationOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option} / trang
                                        </option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-600">
                                    Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, getFilteredCourses().length)} - {Math.min(currentPage * itemsPerPage, getFilteredCourses().length)} trong số {getFilteredCourses().length} khóa học
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-xl transition-colors ${
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
                                                className={`px-3 py-1 rounded-xl text-sm transition-colors ${
                                                    currentPage === pageNumber
                                                        ? 'bg-indigo-600 text-white'
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
                                    className={`p-2 rounded-xl transition-colors ${
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
                </div>
            </div>

            {/* Add CourseModal */}
            {isModalOpen && (
                <CourseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    mode={modalMode}
                    courseData={selectedCourse}
                    onSubmit={handleSubmit}
                />
            )}
        </CRMLayout>
    );
};

export default CoursePage;