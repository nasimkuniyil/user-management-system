import axios from 'axios';


const API_URL = 'http://localhost:4000/api/auth/';


export const registerUser = async (userData) =>{
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
}

export const logoutUser = () => {
    localStorage.removeItem("token");
}
