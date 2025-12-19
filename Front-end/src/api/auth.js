import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Replace with your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

