import { useParams } from 'react-router-dom';
import { Book, GraduationCap } from 'lucide-react';
import {MOCK_COURSES} from "../../../../mockDara.js";
import {useNavigate} from "react-router-dom";

const LessonList = () => {
    const { courseId } = useParams();
    const course = MOCK_COURSES.find(c => c.id === Number(courseId));
    const navigate = useNavigate();

    if (!course) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-red-500">Không tìm thấy khóa học</h2>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                        <p className="text-gray-600">{course.type}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-2">Tiến độ tổng thể</div>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                    <div
                        key={lesson.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="p-6">
                            {/* Lesson Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 text-blue-800 text-xl font-semibold rounded-full w-8 h-8 flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-lg font-semibold">{lesson.title}</h3>
                                </div>
                                <button
                                    onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Bắt đầu học
                                </button>
                            </div>

                            {/* Lesson Description */}
                            <p className="text-gray-600 mb-4">{lesson.description}</p>

                            {/* Lesson Content Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Vocabulary */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <Book className="h-5 w-5 text-blue-500" />
                                        <h4 className="font-semibold">Từ vựng</h4>
                                    </div>
                                    <p className="text-gray-600">{lesson.vocabulary.length} từ mới</p>
                                    <div className="mt-2 space-y-1">
                                        {lesson.vocabulary.slice(0, 2).map((vocab, i) => (
                                            <div key={i} className="text-sm text-gray-600">
                                                {vocab.word} ({vocab.reading})
                                            </div>
                                        ))}
                                        {lesson.vocabulary.length > 2 && (
                                            <div className="text-sm text-blue-500">+ more</div>
                                        )}
                                    </div>
                                </div>

                                {/* Grammar */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <GraduationCap className="h-5 w-5 text-green-500" />
                                        <h4 className="font-semibold">Ngữ pháp</h4>
                                    </div>
                                    <p className="text-gray-600">{lesson.grammar.length} cấu trúc</p>
                                    <div className="mt-2 space-y-1">
                                        {lesson.grammar.slice(0, 2).map((gram, i) => (
                                            <div key={i} className="text-sm text-gray-600">
                                                {gram.pattern}
                                            </div>
                                        ))}
                                        {lesson.grammar.length > 2 && (
                                            <div className="text-sm text-blue-500">+ more</div>
                                        )}
                                    </div>
                                </div>

                            {/*    /!* Kanji *!/*/}
                            {/*    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">*/}
                            {/*        <div className="flex items-center space-x-2 mb-3">*/}
                            {/*            <Book className="h-5 w-5 text-red-500" />*/}
                            {/*            <h4 className="font-semibold">Kanji</h4>*/}
                            {/*        </div>*/}
                            {/*        <p className="text-gray-600">{lesson.kanji.length} chữ Kanji</p>*/}
                            {/*        <div className="mt-2 space-y-1">*/}
                            {/*            {lesson.kanji.slice(0, 2).map((kanji, i) => (*/}
                            {/*                <div key={i} className="text-sm text-gray-600">*/}
                            {/*                    {kanji.character} ({kanji.reading})*/}
                            {/*                </div>*/}
                            {/*            ))}*/}
                            {/*            {lesson.kanji.length > 2 && (*/}
                            {/*                <div className="text-sm text-blue-500">+ more</div>*/}
                            {/*            )}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                                        style={{ width: `${lesson.progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {lesson.progress}% hoàn thành
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonList;