import api from "@/api/axios";
const BASE_URL = "/orders";
export const orderService = {
    async getMyOrders(page = 0, size = 10, orderStatuses, field = "createdAt", direction = "asc") {
        const { data } = await api.get(`${BASE_URL}/me`, {
            params: { page, size, orderStatuses, field, direction },
        });
        return data;
    },
    async getUserOrders(userId, page = 0, size = 10, orderStatuses, field = "createdAt", direction = "asc") {
        const { data } = await api.get(`${BASE_URL}/users/${userId}`, {
            params: { page, size, orderStatuses, field, direction },
        });
        return data;
    },
    async createMyOrder(payload) {
        const { data } = await api.post(`${BASE_URL}/me`, payload);
        return data;
    },
    async updateMyOrder(orderId, payload) {
        const { data } = await api.patch(`${BASE_URL}/${orderId}/me`, payload);
        return data;
    },
    async cancelMyOrder(orderId) {
        const { data } = await api.post(`${BASE_URL}/${orderId}/cancel/me`);
        return data;
    },
};
