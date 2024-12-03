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


        <section>


            <CourseList  />
        </section>


    );
};

export default Dashboard;