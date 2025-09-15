import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});
// Interceptor para agregar token automáticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Manejo de errores global
api.interceptors.response.use(response => response, (error) => {
    if (error.response?.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});
export default api;
