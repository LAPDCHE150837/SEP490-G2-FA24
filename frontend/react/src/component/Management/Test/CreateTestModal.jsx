import { useState, useEffect } from "react";
import axios from "axios";

export const CreateTestModal = ({ onClose, onSuccess }) => {
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

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchLessons();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tests', formData);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Tạo bài kiểm tra mới</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bài học
                        </label>
                        <select
                            value={formData.lesson.id}
                            onChange={(e) => setFormData({
                                ...formData,
                                lesson: { id: e.target.value }
                            })}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        >
                            <option value="">Chọn bài học...</option>
                            {lessons.map(lesson => (
                                <option key={lesson.id} value={lesson.id}>
                                    {lesson.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tiêu đề
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thời gian (phút)
                        </label>
                        <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Điểm đạt
                        </label>
                        <input
                            type="number"
                            value={formData.passScore}
                            onChange={(e) => setFormData({...formData, passScore: parseInt(e.target.value)})}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            disabled={!formData.lesson.id}
                        >
                            Tạo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};