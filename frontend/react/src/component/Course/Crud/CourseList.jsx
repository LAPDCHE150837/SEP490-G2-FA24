import { useState } from 'react';
import CourseCard from "../CourseCard.jsx";
import {MOCK_COURSES} from "../../../../../mockDara.js";

export const CourseList = () => {
    const [courses] = useState(MOCK_COURSES);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Khóa học của tôi</h2>
                <span className="text-gray-500">{courses.length} khóa học</span>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        type={course.type}
                        image={course.image}
                        date={course.date}
                        progress={course.progress}
                    />
                ))}

                {!courses.length && (
                    <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có khóa học nào</h3>
                        <p className="mt-1 text-sm text-gray-500">Hãy bắt đầu tạo khóa học mới.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseList;