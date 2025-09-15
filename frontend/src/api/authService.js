import api from "./axios";
import { jwtDecode } from "jwt-decode";
// Registro de usuario
export const signUp = async (payload) => {
    const { data } = await api.post("/auth/sign-up", payload);
    return data;
};
// Login de usuario
export const login = async (payload) => {
    const { data } = await api.post("/auth/log-in", payload);
    return data;
};
// Guardar JWT en localStorage
export const saveAuth = (auth) => {
    localStorage.setItem("token", auth.jwt);
};
// Obtener JWT del localStorage
export const getToken = () => {
    return localStorage.getItem("token");
};
// Obtener Roles del JWT
export const getRoles = () => {
    const token = localStorage.getItem("token");
    if (!token)
        return null;
    const decoded = jwtDecode(token);
    return decoded.authorities;
};
// Cerrar sesión
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
};
