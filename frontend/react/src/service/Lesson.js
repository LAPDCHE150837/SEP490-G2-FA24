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

export const addUserItem = async (id) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/addItem/${id}`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

export const getLessonUserVocabulary = async (lessonId,isLearning) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/lessons/user_vocabulary/${lessonId}/${isLearning}`,
            getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};

