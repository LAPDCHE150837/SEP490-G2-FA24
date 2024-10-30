import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

export const getCourse = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/course`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const addCourse = async (courseDTO) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/course`,
            courseDTO,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const updateCourse = async (courseId, courseDTO) => {
    try {
        return await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
            courseDTO,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const deleteCourse = async (courseId) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/course/${courseId}`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};