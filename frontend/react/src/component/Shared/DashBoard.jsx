import { DashboardLayout } from "../Layout/DashBoardLayout.jsx";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import RecentCourse from "../Course/RecentCourse.jsx";
import CourseCard from "../Course/CourseCard.jsx";
import { getCourse, addCourse, updateCourse, deleteCourse } from '../../service/Course.js';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [formData, setFormData] = useState({
        courseName: '',
        description: ''
    });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Function to navigate to the course page
    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    const { data: courses, isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await getCourse();
            return response.data;
        }
    });

    const addMutation = useMutation({
        mutationFn: addCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            setIsAddDialogOpen(false);
            setFormData({ courseName: '', description: '' });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ courseId, data }) => updateCourse(courseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            setIsEditDialogOpen(false);
            setSelectedCourse(null);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (courseId) => deleteCourse(courseId),
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            setIsDeleteDialogOpen(false);
            setSelectedCourse(null);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditDialogOpen) {
            updateMutation.mutate({
                courseId: selectedCourse.courseId,
                data: formData
            });
        } else {
            addMutation.mutate(formData);
        }
    };

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setFormData({
            courseName: course.courseName,
            description: course.description
        });
        setIsEditDialogOpen(true);
    };

    const handleDelete = (course) => {
        setSelectedCourse(course);
        setIsDeleteDialogOpen(true);
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="text-red-500 text-center p-4">
                    Failed to load courses. Please try again later.
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <section>
                <h3 className="text-lg font-semibold mb-4">Đã xem gần đây</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <RecentCourse
                        title="N3 taisaku Bài tập ngữ pháp 1"
                        status="Đang học"
                    />
                </div>
            </section>

            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h3 className="text-lg font-semibold">Khóa học của tôi</h3>
                    <button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Thêm khóa học
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses?.map((course) => (
                        <CourseCard
                            key={course.courseId}
                            title={course.courseName}
                            type={course.description}
                            image="/api/placeholder/400/200"
                            date="06-12-2024"
                            progress={0}
                            onClick={() => handleCourseClick(course.courseId)}
                            onEdit={() => handleEdit(course)}
                            onDelete={() => handleDelete(course)}
                        />
                    ))}
                </div>
            </section>

            {/* Add/Edit Modal */}
            {(isAddDialogOpen || isEditDialogOpen) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                {isEditDialogOpen ? 'Sửa khóa học' : 'Thêm khóa học'}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsAddDialogOpen(false);
                                    setIsEditDialogOpen(false);
                                    setFormData({ courseName: '', description: '' });
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tên khóa học
                                </label>
                                <input
                                    type="text"
                                    value={formData.courseName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mô tả
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setIsEditDialogOpen(false);
                                        setFormData({ courseName: '', description: '' });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    {isEditDialogOpen ? 'Lưu' : 'Thêm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
                        <p className="mb-6">Bạn có chắc chắn muốn xóa khóa học "{selectedCourse?.courseName}"?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsDeleteDialogOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => deleteMutation.mutate(selectedCourse.courseId)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
