// Updated Dashboard.jsx
import { DashboardLayout } from "../Layout/DashBoardLayout.jsx";
import { useState } from "react";
import RecentCourse from "../Course/RecentCourse.jsx";
import { CourseList } from "../Course/Crud/CourseList.jsx";
import AddCourseDialog from "../../component/Course/Crud/AddCourseDialog.jsx";
import EditCourseDialog from "../../component/Course/Crud/EditCourseDialog.jsx";
import DeleteCourseDialog from "../../component/Course/Crud/DeleteCourseDialog.jsx";

const Dashboard = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleEdit = (course) => {
        setSelectedCourse(course);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (course) => {
        setSelectedCourse(course);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDialogs = () => {
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setSelectedCourse(null);
    };

    return (
        <DashboardLayout>


            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h3 className="text-lg font-semibold">Khóa học của tôi</h3>

                </div>

                <CourseList  />
            </section>


        </DashboardLayout>
    );
};

export default Dashboard;