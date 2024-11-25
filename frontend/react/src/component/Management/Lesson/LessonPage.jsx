import React, {useState, useEffect} from 'react';
import {Search, Plus, Loader2, Edit2, Trash2, Eye, ChevronDown, ChevronUp} from 'lucide-react';
import CRMLayout from "../Crm.jsx";
import {useToast} from "../../../context/ToastProvider.jsx";
import axios from "axios";
import LessonModal from "./LessonModal.jsx";
import LessonDetailTabs from "./LessonDetailTabs.jsx";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

const LessonPage = () => {
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

    const [enrichedLessons, setEnrichedLessons] = useState([]);

    const fetchLessons = async () => {
        try {
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

    useEffect(() => {
        fetchLessons();
        fetchCourses();
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (modalMode === 'create') {
                await axios.post('http://localhost:8080/api/v1/lessons', data, getAuthConfig());
                showToast('Thêm bài học thành công', 'success');
            } else {
                await axios.put(`http://localhost:8080/api/v1/lessons/${selectedLesson.id}`, data, getAuthConfig());
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

                {/* Search Bar with Modern Design */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên bài học..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                            focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                            bg-white shadow-sm transition-all duration-200"
                        />
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
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Thứ tự</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredLessons.map((lesson, index) => (
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
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {lesson.orderIndex}
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