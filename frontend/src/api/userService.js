import api from "@/api/axios";
const BASE_URL = "/users";
export const userService = {
    async getByUsername(username) {
        const { data } = await api.get(`${BASE_URL}/${username}`);
        return data;
    },
    async getCurrent() {
        const { data } = await api.get(`${BASE_URL}/me`);
        return data;
    },
    async update(username, payload) {
        const { data } = await api.patch(`${BASE_URL}/${username}`, payload);
        return data;
    },
    async updateCurrent(payload) {
        const { data } = await api.patch(`${BASE_URL}/me`, payload);
        return data;
    },
    async changePassword(username, payload) {
        const { data } = await api.patch(`${BASE_URL}/${username}/change-password`, payload);
        return data;
    },
    async changeCurrentPassword(payload) {
        const { data } = await api.patch(`${BASE_URL}/me/change-password`, payload);
        return data;
    },
    async updateProfilePicture(username, file) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await api.patch(`${BASE_URL}/${username}/profile-picture`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return data;
    },
    async updateCurrentProfilePicture(file) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await api.patch(`${BASE_URL}/me/profile-picture`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        return data;
    },
};
