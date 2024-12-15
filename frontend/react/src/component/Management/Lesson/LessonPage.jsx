import React, {useState, useEffect} from 'react';
import {Search, Plus, Loader2, Edit2, Trash2, Eye, ChevronDown, ChevronUp,ChevronRight,ChevronLeft  } from 'lucide-react';
import CRMLayout from "../Crm.jsx";
import {useToast} from "../../../context/ToastProvider.jsx";
import axios from "axios";
import LessonModal from "./LessonModal.jsx";
import LessonDetailTabs from "./LessonDetailTabs.jsx";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

const LessonPage = () => {
    const [searchColumn, setSearchColumn] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {showToast} = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [expandedLesson, setExpandedLesson] = useState(null);
    const navigate = useNavigate();
    // Add pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const paginationOptions = [10, 25, 50, 100];
    const getFilteredLessons = () => {
        if (!searchTerm) return lessons;

        return lessons.filter(lesson => {
            const searchLower = searchTerm.toLowerCase().trim();

            switch (searchColumn) {
                case 'title':
                    return lesson.title.toLowerCase().includes(searchLower);
                case 'course':
                    return lesson.courseTitle.toLowerCase().includes(searchLower);
                case 'description':
                    return lesson.description.toLowerCase().includes(searchLower);
                case 'status':
                    const statusText = lesson.status ? 'hoạt động' : 'không hoạt động';
                    return statusText.includes(searchLower);
                default:
                    return true;
            }
        });
    };
    // Get paginated lessons
    const getPaginatedLessons = () => {
        const filteredData = getFilteredLessons();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredData.slice(indexOfFirstItem, indexOfLastItem);
    };

    // Calculate total pages
    const totalPages = Math.ceil(getFilteredLessons().length / itemsPerPage);

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, searchColumn]);
    // Define search columns
    const searchColumns = [
        { value: 'title', label: 'Tên bài học' },
        { value: 'course', label: 'Khóa học' },
        { value: 'description', label: 'Mô tả' },
        { value: 'status', label: 'Trạng thái' }
    ];


    const [enrichedLessons, setEnrichedLessons] = useState([]);

    const fetchLessons = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const decodedToken = jwtDecode(token);
            if (decodedToken.permission[0].authority !== "ROLE_TEACHER") {
                navigate("/denied")
            }
            setLoading(true);
            const [lessonsResponse, coursesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/v1/lessons', getAuthConfig()),
                axios.get('http://localhost:8080/api/v1/courses', getAuthConfig())
            ]);

            const coursesMap = Object.fromEntries(
                coursesResponse.data.data.map(course => [course.id, course])
            );

            const enrichedLessons = lessonsResponse.data.data.map(lesson => ({
                ...lesson,
                courseTitle: coursesMap[lesson.courseId]?.title || 'Unknown Course'
            }));

            setLessons(enrichedLessons);
            setCourses(coursesResponse.data.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Không thể tải dữ liệu');
            setLessons([]);
            showToast?.('Không thể tải dữ liệu', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/courses', getAuthConfig());
            setCourses(response.data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            showToast('Không thể tải danh sách khóa học', 'error');
        }
    };

    useEffect(() => {``
        fetchLessons();
        fetchCourses();
    }, []);

    const handleSubmit = async (data) => {
        try {
            const formData = new FormData();
            const lessonData = {
                course: { id: data.course.id },
                title: data.title,
                description: data.description,
                status: data.status,
                orderIndex: 1, // Set fixed value

            };

            formData.append('lesson', new Blob([JSON.stringify(lessonData)], { type: 'application/json' }));
            if (data.videoFile) {
                formData.append('video', data.videoFile);
            }

            if (modalMode === 'create') {
                await axios.post('http://localhost:8080/api/v1/lessons', formData, {
                    ...getAuthConfig(),
                    headers: {
                        ...getAuthConfig().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                showToast('Thêm bài học thành công', 'success');
            } else {
                await axios.put(`http://localhost:8080/api/v1/lessons/${selectedLesson.id}`, formData, {
                    ...getAuthConfig(),
                    headers: {
                        ...getAuthConfig().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                showToast('Cập nhật bài học thành công', 'success');
            }
            setIsModalOpen(false);
            fetchLessons();
        } catch (error) {
            showToast(`Thao tác thất bại: ${error.message}`, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/lessons/${id}`, getAuthConfig());
            showToast('Xóa bài học thành công', 'success');
            fetchLessons();
        } catch (error) {
            showToast(`Xóa thất bại: ${error.message}`, 'error');
        }
    };

    const filteredLessons = lessons?.filter(lesson => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return lesson?.title?.toLowerCase().includes(searchLower);
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
            <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
                {/* Header Section with Gradient */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Quản lý Bài học</h1>
                            <p className="text-gray-500">Quản lý các bài học trong hệ thống</p>
                        </div>
                        <button
                            onClick={() => {
                                setModalMode('create');
                                setSelectedLesson(null);
                                setIsModalOpen(true);
                            }}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700
                            flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow"
                        >
                            <Plus className="w-5 h-5"/>
                            <span className="font-medium">Thêm bài học mới</span>
                        </button>
                    </div>
                </div>

                {/* Updated Search Bar with Column Selection */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 flex gap-4">
                        <select
                            value={searchColumn}
                            onChange={(e) => setSearchColumn(e.target.value)}
                            className="w-48 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500
                            focus:border-indigo-500 bg-white shadow-sm transition-all duration-200 px-4"
                        >
                            {searchColumns.map(column => (
                                <option key={column.value} value={column.value}>
                                    {column.label}
                                </option>
                            ))}
                        </select>
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="text"
                                placeholder={`Tìm kiếm theo ${searchColumns.find(c => c.value === searchColumn)?.label.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                bg-white shadow-sm transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>


                {/* Table with Modern Styling */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Tên bài học</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Khóa học</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mô tả</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {getPaginatedLessons().map((lesson, index) => (
                            <React.Fragment key={lesson.id}>
                                <tr
                                    className={`transition-all duration-200 cursor-pointer
                                        ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                                        ${expandedLesson === lesson.id ? 'bg-indigo-50/50' : ''}
                                        hover:bg-indigo-50/30
                                    `}
                                    onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                                >
                                    <td className="px-6 py-4 text-sm font-medium flex items-center">
                                        {expandedLesson === lesson.id ? (
                                            <ChevronUp className="w-4 h-4 mr-2"/>
                                        ) : (
                                            <ChevronDown className="w-4 h-4 mr-2"/>
                                        )}
                                        {lesson.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {lesson.courseTitle}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {lesson.description}
                                    </td>

                                    <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                        lesson.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {lesson.status ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedLesson(lesson);
                                                    setModalMode('edit');
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Sửa bài học"
                                            >
                                                <Edit2 className="w-5 h-5"/>
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(lesson.id);
                                                }}
                                                className="p-1 text-red-600 hover:text-red-800"
                                                title="Xóa bài học"
                                            >
                                                <Trash2 className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {expandedLesson === lesson.id && (
                                    <tr>
                                        <td colSpan="6" className="bg-gray-50/50">
                                            <div className="mx-8 my-6">
                                                <div
                                                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                                    <LessonDetailTabs lessonId={lesson.id}/>
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
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-200 rounded-xl px-2 py-1 text-sm focus:ring-2
                                    focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            >
                                {paginationOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option} / trang
                                    </option>
                                ))}
                            </select>
                            <span className="text-sm text-gray-600">
                                    Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, getFilteredLessons().length)} - {Math.min(currentPage * itemsPerPage, getFilteredLessons().length)} trong số {getFilteredLessons().length} bài học
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
            {isModalOpen && (
                <LessonModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    mode={modalMode}
                    lessonData={selectedLesson}
                    courses={courses}
                    onSubmit={handleSubmit}
                />
            )}
        </CRMLayout>
    );
};

export default LessonPage;