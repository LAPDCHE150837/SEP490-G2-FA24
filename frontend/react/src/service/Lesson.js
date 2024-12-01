import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

export const getLesson = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const getLessonById = async (id) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/${id}`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};