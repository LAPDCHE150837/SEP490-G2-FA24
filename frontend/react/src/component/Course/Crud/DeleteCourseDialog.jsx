// DeleteCourseDialog.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCourse } from '../../../service/Course.js';

const DeleteCourseDialog = ({ isOpen, onClose, course }) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (courseId) => deleteCourse(courseId),
        onSuccess: () => {
            queryClient.invalidateQueries(['courses']);
            onClose();
        }
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
                <p className="mb-6">Bạn có chắc chắn muốn xóa khóa học "{course?.courseName}"?</p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => deleteMutation.mutate(course.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCourseDialog;