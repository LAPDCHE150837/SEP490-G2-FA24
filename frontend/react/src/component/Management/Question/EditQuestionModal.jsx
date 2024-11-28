// Components/Questions/EditQuestionModal.jsx
import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import axios from "axios";

export const EditQuestionModal = ({ question, onClose, onSuccess }) => {
    const [tests, setTests] = useState([]);
    const [formData, setFormData] = useState({
        test: {
            id: question.testId || ""
        },
        questionType: question.questionType || "voca",
        questionText: question.questionText || "",
        questionTranslation: question.questionTranslation || "",
        correctAnswer: question.correctAnswer || "",
        explanation: question.explanation || "",
        options: question.options?.map(opt => ({
            id: opt.id,
            optionText: opt.optionText,
            isCorrect: opt.isCorrect
        })) || [
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false }
        ]
    });

    const api = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json'
        }
    });

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const { data } = await api.get('/tests');
            setTests(data.data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = {
            ...newOptions[index],
            [field]: value
        };

        // If this option is being set as correct, set others as incorrect
        if (field === 'isCorrect' && value === true) {
            newOptions.forEach((option, i) => {
                if (i !== index) {
                    option.isCorrect = false;
                }
            });
        }

        setFormData({
            ...formData,
            options: newOptions
        });
    };

    const addOption = () => {
        if (formData.options.length < 6) {
            setFormData({
                ...formData,
                options: [
                    ...formData.options,
                    { optionText: "", isCorrect: false }
                ]
            });
        }
    };

    const removeOption = (index) => {
        if (formData.options.length > 2) {
            const newOptions = formData.options.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                options: newOptions
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the question
            await api.put(`/questions/${question.id}`, {
                test: formData.test,
                questionType: formData.questionType,
                questionText: formData.questionText,
                questionTranslation: formData.questionTranslation,
                correctAnswer: formData.correctAnswer,
                explanation: formData.explanation
            });

            // Update or create options
            await Promise.all(formData.options.map(option => {
                if (option.id) {
                    // Update existing option
                    return api.put(`/options/${option.id}`, {
                        questionId: question.id,
                        optionText: option.optionText,
                        isCorrect: option.isCorrect
                    });
                } else {
                    // Create new option
                    return api.post('/options', {
                        question: { id: question.id },
                        optionText: option.optionText,
                        isCorrect: option.isCorrect
                    });
                }
            }));

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">Chỉnh sửa câu hỏi</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bài kiểm tra
                        </label>
                        <select
                            value={formData.test.id}
                            onChange={(e) => setFormData({
                                ...formData,
                                test: { id: e.target.value }
                            })}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        >
                            <option value="">Chọn bài kiểm tra...</option>
                            {tests.map(test => (
                                <option key={test.id} value={test.id}>
                                    {test.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loại câu hỏi
                        </label>
                        <select
                            value={formData.questionType}
                            onChange={(e) => setFormData({...formData, questionType: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        >
                            <option value="voca">Từ vựng</option>
                            <option value="grammar">Ngữ pháp</option>
                            <option value="reading">Đọc hiểu</option>
                            <option value="listening">Nghe hiểu</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nội dung câu hỏi
                        </label>
                        <textarea
                            value={formData.questionText}
                            onChange={(e) => setFormData({...formData, questionText: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            rows="3"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dịch nghĩa
                        </label>
                        <textarea
                            value={formData.questionTranslation}
                            onChange={(e) => setFormData({...formData, questionTranslation: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            rows="2"
                            required
                        />
                    </div>

                    {/* Options section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">
                                Các lựa chọn
                            </label>
                            <button
                                type="button"
                                onClick={addOption}
                                className="text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                                disabled={formData.options.length >= 6}
                            >
                                <Plus size={16} />
                                <span>Thêm lựa chọn</span>
                            </button>
                        </div>

                        {formData.options.map((option, index) => (
                            <div key={index} className="flex space-x-2 items-start">
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        value={option.optionText}
                                        onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                                        placeholder={`Lựa chọn ${index + 1}`}
                                        className="w-full border rounded-lg px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={option.isCorrect}
                                            onChange={() => handleOptionChange(index, 'isCorrect', true)}
                                            className="form-radio h-4 w-4 text-blue-600"
                                        />
                                        <span className="text-sm text-gray-600">Đúng</span>
                                    </label>
                                    {formData.options.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeOption(index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Giải thích
                        </label>
                        <textarea
                            value={formData.explanation}
                            onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                            className="w-full border rounded-lg px-3 py-2"
                            rows="2"
                            required
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
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};