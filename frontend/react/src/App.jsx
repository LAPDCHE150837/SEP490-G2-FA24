import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from "./component/Authentication/Login.jsx";
import Dashboard from "./component/Shared/DashBoard.jsx";
import RegisterPage from "./component/Authentication/Register.jsx";
import LandingPage from "./component/LandingPage.jsx";
import ProtectedRoute from "./component/Shared/ProtectedRoute.jsx";
import ForgotPassword from "./component/Authentication/ForgotPassword.jsx";
import ChangePassword from "./component/Authentication/ChangePassword.jsx";
import JapaneseAlphabet from "./component/Alphabet/Alphabet.jsx";
import LessonList from "./component/Lesson/LessonList.jsx";
import LessonDetail from "./component/Lesson/LessonDetail.jsx";
import QuizView from "./component/Quiz/Quizview.jsx";
import LessonComplete from "./component/Lesson/LessonComplete.jsx";
import FlashcardSetList from "./component/FlashCard/FlashcardSetList.jsx";
import FlashcardStudy from "./component/FlashCard/FlashcardStudy.jsx";
import FlashcardEditor from "./component/FlashCard/FlashcardEditor.jsx";
import StudyStats from "./component/StudyStats/StudyStats.jsx";
import SmartReview from "./component/Review/SmartReview.jsx";
import ReviewSession from "./component/Review/ReviewSession.jsx";
import TestExam from "./component/Test/TestExam.jsx";
import TestResults from "./component/Test/TestResults.jsx";
import {DashboardLayout} from "./component/Layout/DashBoardLayout.jsx";
import CoursePage from "./component/Management/Course/CoursePage.jsx";
import LessonPage from "./component/Management/Lesson/LessonPage.jsx";
import GrammarPage from "./component/Management/Grammar/GrammarPage.jsx";
import FlashcardCRUD from "./component/FlashCard/FlashcardCRUD.jsx";
import TestList from "./component/Management/Test/TestList.jsx";
import QuestionList from "./component/Management/Question/QuestionList.jsx";
import TestListUser from "./component/Test/TestList.jsx";
import TestHistory from "./component/History/TestHistory.jsx";
import User from "./component/Management/User/User.jsx";
import {AuthRoute} from "./context/AuthRoute.jsx";
import CreateBlog from "./component/Blog/Crud/CreateBlog.jsx";
import ViewBlog from "./component/Blog/Crud/ListBlog.jsx";


function App() {
    return (
        <Routes>
            <Route path="/create_blog" element={<CreateBlog/>}/>
            <Route path="/view_blog" element={<ViewBlog/>}/>
            <Route path="/course_crud" element={<ProtectedRoute><CoursePage/></ProtectedRoute>}/>
            <Route path="/lesson_crud" element={<ProtectedRoute><LessonPage/></ProtectedRoute>}/>
            <Route path="/grammar_crud" element={<ProtectedRoute><GrammarPage/></ProtectedRoute>}/>
            <Route path="/landing" element={<AuthRoute><LandingPage/></AuthRoute>}/>
            <Route path="/login" element={<AuthRoute><LoginPage/></AuthRoute>}/>
            <Route path="/register" element={<AuthRoute><RegisterPage/></AuthRoute>}/>
            <Route path="/forgotPassword" element={<AuthRoute><ForgotPassword/></AuthRoute>}/>
            <Route path="/test" element={<ProtectedRoute><TestList/></ProtectedRoute>}/>
            <Route path="/question" element={<ProtectedRoute><QuestionList/></ProtectedRoute>}/>
            <Route path="/user" element={<ProtectedRoute><User/></ProtectedRoute>}/>
            {/*<Route path="/blog" element={<Blog/>}/>*/}
            <Route element={<DashboardLayout/>}>
                <Route path="/reset" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
                <Route path="/flashcards/:setId/cards" element={<ProtectedRoute><FlashcardCRUD/></ProtectedRoute>}/>
                <Route path="/course" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                <Route path="/alphabet" element={<ProtectedRoute><JapaneseAlphabet/></ProtectedRoute>}/>
                <Route path="/courses/:courseId/lessons" element={<ProtectedRoute><LessonList/></ProtectedRoute>}/>
                <Route path="courses/:courseId/lessons/:lessonId" element={<ProtectedRoute><LessonDetail/></ProtectedRoute>}/>
                <Route path="courses/:courseId/lessons/:lessonId/quiz" element={<ProtectedRoute><QuizView/></ProtectedRoute>}/>
                <Route path="courses/:courseId/lessons/:lessonId/complete" element={<ProtectedRoute><LessonComplete/></ProtectedRoute>}/>
                <Route path="/flashcards" element={<ProtectedRoute><FlashcardSetList/></ProtectedRoute>}/>
                <Route path="/flashcards/:setId/study" element={<ProtectedRoute><FlashcardStudy/></ProtectedRoute>}/>
                <Route path="/flashcards/:setId/edit" element={<ProtectedRoute><FlashcardEditor/></ProtectedRoute>}/>
                <Route path="/statistics" element={<ProtectedRoute><StudyStats/></ProtectedRoute>}/>
                <Route path="/history" element={<ProtectedRoute><TestHistory/></ProtectedRoute>}/>
                <Route path="/review" element={<ProtectedRoute><SmartReview/></ProtectedRoute>}/>
                <Route path="/review/session" element={<ProtectedRoute><ReviewSession/></ProtectedRoute>}/>
                <Route path="/courses/:courseId/lessons/:lessonId/test/:testId" element={<ProtectedRoute><TestExam /></ProtectedRoute>} />
                <Route path="/courses/:courseId/lessons/:lessonId/test" element={<ProtectedRoute><TestListUser/></ProtectedRoute>}/>
                <Route path="/courses/:courseId/lessons/:lessonId/test/:testId/result" element={<ProtectedRoute><TestResults /></ProtectedRoute>} />
            </Route>
            <Route path="/" element={<Navigate to="/landing" replace/>}/>
        </Routes>
    );
}

export default App;