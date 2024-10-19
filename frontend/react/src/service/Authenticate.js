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
