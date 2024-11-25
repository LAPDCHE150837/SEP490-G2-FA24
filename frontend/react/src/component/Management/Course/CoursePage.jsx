import React, { useState, useEffect } from 'react';
import { Search, Plus, Loader2, Edit2, Trash2, Eye } from 'lucide-react';
import CRMLayout from "../Crm.jsx";
import { useToast } from "../../../context/ToastProvider.jsx";
import axios from "axios";
import CourseModal from "./CourseModal.jsx";
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

const CoursePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedCourse, setSelectedCourse] = useState(null);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/v1/courses');
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

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên khóa học..."
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
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Tên khóa học</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Mô tả</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cấp độ</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Số bài học</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ảnh</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {filteredCourses.map((course) => (
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