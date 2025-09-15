import api from "@/api/axios";
import type {AuthCreateUserRequest, AuthLoginRequest, AuthResponse} from "@/types/auth"
import {jwtDecode} from "jwt-decode";
import {JwtPayload} from "@/lib/JwtPayload";

// Registro de usuario
export const signUp = async (payload: AuthCreateUserRequest): Promise<AuthResponse> => {
    const {data} = await api.post<AuthResponse>("/auth/sign-up", payload)
    return data
}

// Login de usuario
export const login = async (payload: AuthLoginRequest): Promise<AuthResponse> => {
    const {data} = await api.post<AuthResponse>("/auth/log-in", payload)
    return data
}

// Guardar JWT en localStorage
export const saveAuth = (auth: AuthResponse) => {
    localStorage.setItem("token", auth.jwt)
}

// Obtener JWT del localStorage
export const getToken = (): string | null => {
    return localStorage.getItem("token")
}

// Obtener Roles del JWT
export const getRoles = (): string[] | null => {
    const token = localStorage.getItem("token")
    if (!token) return null
    const decoded = jwtDecode<JwtPayload>(token)
    return decoded.authorities
}

// Cerrar sesión
export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.reload()
}
