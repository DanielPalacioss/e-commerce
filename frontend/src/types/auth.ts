export interface AuthCreateUserRequest {
    name: string
    username: string
    password: string
    email: string
}

export interface AuthLoginRequest {
    username: string
    password: string
}

export interface AuthResponse {
    jwt: string
}
