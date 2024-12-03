import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";

export const AuthRoute = ({ children }) => {
    const { isCustomerAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isCustomerAuthenticated()) {
            navigate("/course"); // or any default authenticated route
        }
    }, [isCustomerAuthenticated, navigate]);

    return !isCustomerAuthenticated() ? children : null;
};