import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from "./component/Authentication/Login.jsx";
import Dashboard from "./component/Shared/DashBoard.jsx";
import RegisterPage from "./component/Authentication/Register.jsx";
import LandingPage from "./component/LandingPage.jsx";
import FlashCardForLearner from "./component/Demo/FlashCardForLearner.jsx";
import FlashCardLession from "./component/Demo/FlashCardLession.jsx";
import AddKanjiByTeacher from "./component/Demo/AddKanjiByTeacher.jsx"; //
import ForgotPassword from "./component/Authentication/ForgotPassword.jsx";
import ChangePassword from "./component/Authentication/ChangePassword.jsx";
import ProtectedRoute from "./component/Shared/ProtectRoute.jsx";
import JapaneseAlphabet from "./component/Alphabet/Alphabet.jsx";
import CourseCard from "./component/Course/CourseCard.jsx";
import Courses from "./component/Demo/Courses.jsx";
import Alphabets from "./component/Demo/Alphabets.jsx";
import DashBoardForTeacher from "./component/Demo/DashBoardForTeacher.jsx";
import Course from "./Course.jsx";
import LessonDetail from "./component/Lesson/LessonDetail.jsx";
import LessonList from "./component/Lesson/LessonList.jsx";
import QuizView from "./component/Quiz/Quizview.jsx";
import LessonComplete from "./component/Lesson/LessonComplete.jsx";
import UserProfile from "./component/Demo/UserProfile.jsx";
import StudyStats from "./component/StudyStats/StudyStats.jsx";
import Achievements from "./component/Achievement/Achievements.jsx";
import SmartReview from "./component/Review/SmartReview.jsx";
import ReviewSession from "./component/Review/ReviewSession.jsx";
import TestExam from "./component/Test/TestExam.jsx";
import TestResults from "./component/Test/TestResults.jsx";
import {DashboardLayout} from "./component/Layout/DashBoardLayout.jsx";
import Record from "./component/Record/RecordingModal .jsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/landing" element={<LandingPage/>}/>
                <Route path="/forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/flashCardForStudent" element={<FlashCardForLearner/>}/>
            <Route path="/flashCardLession" element={<FlashCardLession/>}/>
            <Route path="/DBTeacher" element={<DashBoardForTeacher/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/course" element={<Course/>}/>
            <Route path="/alphabets" element={<Alphabets/>}/>
            <Route path="/userProfile" element={<UserProfile/>}/>
                <Route path="/reset" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
                <Route element={<DashboardLayout/>}>
                        <Route path="/course" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                        <Route path="/alphabet" element={<JapaneseAlphabet/>}/>
                        <Route path="/courses/:courseId/lessons" element={<LessonList/>}/>
                        <Route path="courses/:courseId/lessons/:lessonId" element={<LessonDetail/>}/>
                        <Route path="courses/:courseId/lessons/:lessonId/quiz" element={<QuizView/>}/>
                        <Route path="courses/:courseId/lessons/:lessonId/complete" element={<LessonComplete/>}/>
                        <Route path="/flashcards" element={<FlashcardSetList/>}/>
                        <Route path="/flashcards/:setId/study" element={<FlashcardStudy/>}/>
                        <Route path="/flashcards/:setId/edit" element={<FlashcardEditor/>}/>
                        <Route path="/statistics" element={<StudyStats/>}/>
                        <Route path="/achievements" element={<Achievements/>}/>
                        <Route path="/review" element={<SmartReview/>}/>
                        <Route path="/review/session" element={<ReviewSession/>}/>
                        <Route path="/courses/:courseId/lessons/:lessonId/test" element={<TestExam/>}/>
                        <Route path="/courses/:courseId/lessons/:lessonId/test/result" element={<TestResults/>}/>
                </Route>

            <Route path="/" element={<Navigate to="/landing" replace/>}/>

        </Routes>

    );
}

export default App;