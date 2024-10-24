import axios from "axios";

export const login = async (emailAndPassword) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/v1/auth/authenticate`,
            emailAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const register = async (info) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/v1/auth/register`,
            info
        )
    } catch (e) {
        throw e;
    }
}
export const sendEmailToResetPassword = async (email) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/v1/auth/forgot-password`,
            email
        )
    } catch (e) {
        throw e;
    }
}

export const resetPassword = async (token, changePasswordRequest) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/v1/auth/reset-password?token=${token}`,
            changePasswordRequest
        );
        // OR alternatively using query parameter
        // return await axios.post(
        //     `${import.meta.env.VITE_API_BASE_URL}/v1/auth/reset-password?token=${token}`,
        //     { password: newPassword }
        // );
    } catch (e) {
        throw e;
    }
};
