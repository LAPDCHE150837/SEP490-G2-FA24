import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

export const getCourse = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const getCourseForUser = async () => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/a`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const getCourseById = async (id) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/courses/${id}`,
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


export const createAchievement = async (courseId) => {
    try {
        await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-achievements/${courseId}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Achievement created successfully');
    } catch (error) {
        console.error('Error creating achievement:', error);
    }
};