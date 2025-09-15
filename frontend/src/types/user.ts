export interface UserResponse {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePictureUrl: string | null;
}

export interface UpdateUserRequest {
    name: string;
    email: string;
}

export interface UpdateUserPasswordRequest {
    oldPassword?: string;
    newPassword: string;
}