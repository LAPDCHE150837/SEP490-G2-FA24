import React, { useState } from 'react';
import { Play } from 'lucide-react';

const StudyButton = ({ set, onStudyAll, onStudyUnknown }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStudy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleStudyAll = () => {
        onStudyAll(set.id);
        setIsModalOpen(false);
    };

    const handleStudyUnknown = () => {
        onStudyUnknown(set.id);
        setIsModalOpen(false);
    };

    const closeModal = (e) => {
        // Close modal if clicking outside the content
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    if (!isModalOpen) return (
        <button
            onClick={handleStudy}
            className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            <Play size={16}/>
            <span>Học</span>
        </button>
    );

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
        >
            <div className="bg-white rounded-lg p-6 shadow-xl w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Chọn phương thức học</h2>
                <div className="flex flex-col space-y-3">
                    <button
                        onClick={handleStudyAll}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Học toàn bộ
                    </button>
                    <button
                        onClick={handleStudyUnknown}
                        className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-colors"
                    >
                        Học những từ chưa thuộc
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors mt-2"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyButton;