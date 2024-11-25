import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GrammarModal = ({ isOpen, onClose, mode, grammarData, lessons, onSubmit }) => {
    const [formData, setFormData] = useState({
        lesson: { id: '' },
        pattern: '',
        meaning: '',
        usage: '',
        example: '',
        exampleReading: '',
        exampleMeaning: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) {
            setFormData({
                lesson: { id: '' },
                pattern: '',
                meaning: '',
                usage: '',
                example: '',
                exampleReading: '',
                exampleMeaning: ''
            });
            setErrors({});
        } else if (mode === 'edit' && grammarData) {
            setFormData({
                lesson: { id: grammarData.lesson.id },
                pattern: grammarData.pattern,
                meaning: grammarData.meaning,
                usage: grammarData.usage,
                example: grammarData.example,
                exampleReading: grammarData.exampleReading,
                exampleMeaning: grammarData.exampleMeaning
            });
        }
    }, [isOpen, mode, grammarData]);

    const validateForm = () => {
        const errors = {};
        if (!formData.lesson.id) errors.lessonId = 'Vui lòng chọn bài học';
        if (!formData.pattern) errors.pattern = 'Mẫu câu không được để trống';
        if (!formData.meaning) errors.meaning = 'Ý nghĩa không được để trống';
        if (!formData.usage) errors.usage = 'Cách dùng không được để trống';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
                <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {mode === 'view' ? 'Chi tiết ngữ pháp' :
                                    mode === 'edit' ? 'Sửa ngữ pháp' : 'Thêm ngữ pháp mới'}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {mode === 'view' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bài học</label>
                                    <p className="mt-1">
                                        {lessons.find(l => l.id === grammarData.lesson.id)?.title || 'Unknown Lesson'}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mẫu câu</label>
                                    <p className="mt-1">{grammarData.pattern}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ý nghĩa</label>
                                    <p className="mt-1">{grammarData.meaning}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cách dùng</label>
                                    <p className="mt-1">{grammarData.usage}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ví dụ</label>
                                    <p className="mt-1">{grammarData.example}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cách đọc ví dụ</label>
                                    <p className="mt-1">{grammarData.exampleReading}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nghĩa của ví dụ</label>
                                    <p className="mt-1">{grammarData.exampleMeaning}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Bài học
                                    </label>
                                    <select
                                        value={formData.lesson.id}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            lesson: { id: e.target.value }
                                        })}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.lessonId ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    >
                                        <option value="">Chọn bài học</option>
                                        {lessons.map((lesson) => (
                                            <option key={lesson.id} value={lesson.id}>
                                                {lesson.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.lessonId && (
                                        <p className="mt-1 text-sm text-red-600">{errors.lessonId}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mẫu câu
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.pattern}
                                        onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.pattern ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    />
                                    {errors.pattern && (
                                        <p className="mt-1 text-sm text-red-600">{errors.pattern}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ý nghĩa
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.meaning}
                                        onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.meaning ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    />
                                    {errors.meaning && (
                                        <p className="mt-1 text-sm text-red-600">{errors.meaning}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Cách dùng
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.usage}
                                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                                        className={`mt-1 block w-full rounded-lg border ${
                                            errors.usage ? 'border-red-300' : 'border-gray-300'
                                        } px-3 py-2`}
                                    />
                                    {errors.usage && (
                                        <p className="mt-1 text-sm text-red-600">{errors.usage}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ví dụ
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.example}
                                        onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Cách đọc ví dụ
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.exampleReading}
                                        onChange={(e) => setFormData({ ...formData, exampleReading: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nghĩa của ví dụ
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.exampleMeaning}
                                        onChange={(e) => setFormData({ ...formData, exampleMeaning: e.target.value })}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                    >
                                        {mode === 'edit' ? 'Cập nhật' : 'Thêm mới'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrammarModal;