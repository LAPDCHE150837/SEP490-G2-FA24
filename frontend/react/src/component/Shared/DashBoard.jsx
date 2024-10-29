import {DashboardLayout} from "../Layout/DashBoardLayout.jsx";
import {useState} from "react";
import RecentCourse from "../Course/RecentCourse.jsx";
import CourseCard from "../Course/CourseCard.jsx";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');

    return (
        <DashboardLayout>
            {/* Recent Section */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Đã xem gần đây</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <RecentCourse
                        title="N3 taisaku Bài tập ngữ pháp 1"
                        status="Đang học"
                    />
                </div>
            </section>

            {/* My Courses Section */}
            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h3 className="text-lg font-semibold">Khóa học của tôi</h3>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CourseCard
                        title="N3 TAISAKU"
                        image="/api/placeholder/400/200"
                        type="Khóa chính"
                        date="06-12-2024"
                        progress={0}
                    />
                    {/* More CourseCards */}
                </div>
            </section>

            {/* Suggested Courses Section */}
            <section>
                {/* Your suggested courses section */}
            </section>
        </DashboardLayout>
    );
};

export default Dashboard