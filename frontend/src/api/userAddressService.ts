import {UserAddressRequest, UserAddressResponse} from "@/types/userAddress";
import api from "@/api/axios";

const BASE_URL = "/users/me/user-addresses";

export const userAddressService = {
    async getAll(): Promise<UserAddressResponse[]> {
        const {data} = await api.get<UserAddressResponse[]>(BASE_URL);
        return data;
    },

    async create(address: UserAddressRequest): Promise<UserAddressResponse> {
        const {data} = await api.post<UserAddressResponse>(BASE_URL, address);
        return data;
    },

    async update(
        addressId: string,
        address: UserAddressRequest
    ): Promise<UserAddressResponse> {
        const {data} = await api.patch<UserAddressResponse>(
            `${BASE_URL}/${addressId}`,
            address
        );
        return data;
    },

    async delete(addressId: string): Promise<string> {
        const {data} = await api.delete<string>(`${BASE_URL}/${addressId}`);
        return data;
    },
};