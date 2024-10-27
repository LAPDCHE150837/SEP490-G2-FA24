import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./component/Authentication/Login.jsx";
import Dashboard from "./component/Shared/DashBoard.jsx";
import RegisterPage from "./component/Authentication/Register.jsx";
import LandingPage from "./component/LandingPage.jsx";
import FlashCardForLearner from "./component/Shared/FlashCardForLearner.jsx";
import FlashCardLession from "./component/Shared/FlashCardLession.jsx";
import AddKanjiByTeacher from "./component/Shared/AddKanjiByTeacher.jsx"; //
import ForgotPassword from "./component/Authentication/ForgotPassword.jsx";
import ChangePassword from "./component/Authentication/ChangePassword.jsx";
import ProtectedRoute from "./component/Shared/ProtectRoute.jsx"; // Assuming you have a Dashboard component

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/flashCardForStudent" element={<FlashCardForLearner />} />
            <Route path="/flashCardLession" element={<FlashCardLession />} />
            {/*<Route path="/addKanji" element={<AddKanjiByTeacher />} />*/}
            <Route path="/register" element={<ForgotPassword />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/reset" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/landing" replace />} />
        </Routes>

    );
}

export default App;