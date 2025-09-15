import api from "@/api/axios";
import {UpdateUserPasswordRequest, UpdateUserRequest, UserResponse} from "@/types/user";

const BASE_URL = "/users";
export const userService = {
    async getByUsername(username: string): Promise<UserResponse> {
        const {data} = await api.get<UserResponse>(`${BASE_URL}/${username}`);
        return data;
    },

    async getCurrent(): Promise<UserResponse> {
        const {data} = await api.get<UserResponse>(`${BASE_URL}/me`);
        return data;
    },

    async update(username: string, payload: UpdateUserRequest): Promise<UserResponse> {
        const {data} = await api.patch<UserResponse>(`${BASE_URL}/${username}`, payload);
        return data;
    },

    async updateCurrent(payload: UpdateUserRequest): Promise<UserResponse> {
        const {data} = await api.patch<UserResponse>(`${BASE_URL}/me`, payload);
        return data;
    },

    async changePassword(username: string, payload: UpdateUserPasswordRequest): Promise<string> {
        const {data} = await api.patch<string>(`${BASE_URL}/${username}/change-password`, payload);
        return data;
    },

    async changeCurrentPassword(payload: UpdateUserPasswordRequest): Promise<string> {
        const {data} = await api.patch<string>(`${BASE_URL}/me/change-password`, payload);
        return data;
    },

    async updateProfilePicture(username: string, file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        const {data} = await api.patch<string>(
            `${BASE_URL}/${username}/profile-picture`,
            formData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );

        return data;
    },

    async updateCurrentProfilePicture(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);

        const {data} = await api.patch<string>(
            `${BASE_URL}/me/profile-picture`,
            formData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );

        return data;
    },
};