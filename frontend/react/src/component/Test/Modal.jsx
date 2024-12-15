import React, { useState, useEffect } from 'react';
import { Clock, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export const Modal = ({ isOpen, onClose, onConfirm, totalQuestions, answeredQuestions }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold mb-4">Xác nhận nộp bài</h2>
                <p className="text-gray-600 mb-6">
                    Bạn đã trả lời {answeredQuestions}/{totalQuestions} câu hỏi.
                    Bạn có chắc chắn muốn nộp bài?
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
};