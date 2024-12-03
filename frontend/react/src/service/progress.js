import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
});

export const addProgress = async (data) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/user-progress`,
            data, // Pass the data as the request body
            getAuthConfig() // Include the authentication configuration
        );
    } catch (e) {
        console.error('Error updating progress:', e);
        throw e;
    }
};