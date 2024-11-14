import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Users, ChevronRight, GraduationCap  } from 'lucide-react';

const CourseCard = ({ id, title, type,level, image, date, progress, students = 128, totalLessons = 12 }) => {
    const navigate = useNavigate();

    const handleStudyClick = () => {
        navigate(`/courses/${id}/lessons`);
    };
// Function to get level color
    const getLevelColor = (level) => {
        switch (level) {
            case 'N5': return 'text-green-400';
            case 'N4': return 'text-blue-400';
            case 'N3': return 'text-yellow-400';
            case 'N2': return 'text-purple-400';
            case 'N1': return 'text-red-400';
            default: return 'text-cyan-400';
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10"/>
                <img
                    src={image || "/api/placeholder/400/200"}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Level Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div
                        className="flex items-center space-x-2 px-3 py-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full border border-cyan-400/20">
                        <GraduationCap size={16} className={getLevelColor(level)}/>
                        <span className={`text-sm font-medium ${getLevelColor(level)}`}>{type}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center text-blue-500 mb-1">
                            <BookOpen size={20}/>
                        </div>
                        <div className="text-sm text-gray-500">Bài học</div>
                        <div className="font-semibold text-gray-700">{totalLessons}</div>
                    </div>
                    <div className="text-center border-x border-gray-100">
                        <div className="flex items-center justify-center text-green-500 mb-1">
                            <Users size={20} />
                        </div>
                        <div className="text-sm text-gray-500">Học viên</div>
                        <div className="font-semibold text-gray-700">{students}</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center text-purple-500 mb-1">
                            <Clock size={20} />
                        </div>
                        <div className="text-sm text-gray-500">Thời gian</div>
                        <div className="font-semibold text-gray-700">2 tháng</div>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={handleStudyClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                             text-white px-6 py-3 rounded-xl font-medium
                             flex items-center justify-center space-x-2
                             transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                             shadow-md hover:shadow-lg"
                >
                    <span>Bắt đầu học</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default CourseCard;