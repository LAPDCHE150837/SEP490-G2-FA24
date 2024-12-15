import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";

export const CreateQuestionModal = ({ onClose, onSuccess }) => {
    const [tests, setTests] = useState([]);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        test: {
            id: ""
        },
        questionType: "voca",
        questionText: "",
        questionTranslation: "",
        correctAnswer: "",
        explanation: "",
        options: [
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false },
            { optionText: "", isCorrect: false }
        ]
    });

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/tests', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setTests(data.data);
            if (data.data.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    test: { id: data.data[0].id }
                }));
            }
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const validateForm = () => {
        // Check if any option is marked as correct
        const hasCorrectAnswer = formData.options.some(option => option.isCorrect);
        if (!hasCorrectAnswer) {
            setError("Vui lòng chọn một đáp án đúng");
            return false;
        }

        // Check if all options have text
        const hasEmptyOptions = formData.options.some(option => !option.optionText.trim());
        if (hasEmptyOptions) {
            setError("Vui lòng điền đầy đủ nội dung cho tất cả các lựa chọn");
            return false;
        }

        setError("");
        return true;
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = {
            ...newOptions[index],
            [field]: value
        };

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
        setError(""); // Clear error when user makes changes
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
            // If we're removing the correct option, clear the error
            if (formData.options[index].isCorrect) {
                setError("");
            }
            setFormData({
                ...formData,
                options: newOptions
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const questionResponse = await fetch('http://localhost:8080/api/v1/questions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: formData.test,
                    questionType: formData.questionType,
                    questionText: formData.questionText,
                    questionTranslation: formData.questionTranslation,
                    correctAnswer: formData.correctAnswer,
                    explanation: formData.explanation
                })
            });

            const questionData = await questionResponse.json();
            const questionId = questionData.data.id;

            // Create all options with question reference
            await Promise.all(formData.options.map(option =>
                fetch('http://localhost:8080/api/v1/options', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        optionText: option.optionText,
                        isCorrect: option.isCorrect,
                        question: {
                            id: questionId
                        }
                    })
                })
            ));

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating question:', error);
            setError("Đã xảy ra lỗi khi tạo câu hỏi. Vui lòng thử lại.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">Tạo câu hỏi mới</h3>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 10-2 0zm0-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

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
                            <option value="kanji">Hán tự</option>
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
                                        className={`w-full border rounded-lg px-3 py-2 ${!option.optionText.trim() && error ? 'border-red-500' : ''}`}
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
                                            className={`form-radio h-4 w-4 text-blue-600 ${!formData.options.some(opt => opt.isCorrect) && error ? 'border-red-500' : ''}`}
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
                            disabled={!formData.test.id}
                        >
                            Tạo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};