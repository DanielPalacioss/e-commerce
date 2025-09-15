import api from "@/api/axios";
const BASE_URL = "/users/me/user-addresses";
export const userAddressService = {
    async getAll() {
        const { data } = await api.get(BASE_URL);
        return data;
    },
    async create(address) {
        const { data } = await api.post(BASE_URL, address);
        return data;
    },
    async update(addressId, address) {
        const { data } = await api.patch(`${BASE_URL}/${addressId}`, address);
        return data;
    },
    async delete(addressId) {
        const { data } = await api.delete(`${BASE_URL}/${addressId}`);
        return data;
    },
};
