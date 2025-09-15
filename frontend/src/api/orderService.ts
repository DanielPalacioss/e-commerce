import {OrderPageResponse, OrderRequest, OrderResponse, OrderSortForField, OrderStatuses,} from "@/types/order";
import api from "@/api/axios";
import {SortDirection} from "@/types/share";

const BASE_URL = "/orders";

export const orderService = {
    async getMyOrders(
        page = 0,
        size = 10,
        orderStatuses?: OrderStatuses,
        field: OrderSortForField = "createdAt",
        direction: SortDirection = "asc"
    ): Promise<OrderPageResponse> {
        const {data} = await api.get<OrderPageResponse>(`${BASE_URL}/me`, {
            params: {page, size, orderStatuses, field, direction},
        });
        return data;
    },

    async getUserOrders(
        userId: string,
        page = 0,
        size = 10,
        orderStatuses?: OrderStatuses,
        field: OrderSortForField = "createdAt",
        direction: SortDirection = "asc"
    ): Promise<OrderPageResponse> {
        const {data} = await api.get<OrderPageResponse>(`${BASE_URL}/users/${userId}`, {
            params: {page, size, orderStatuses, field, direction},
        });
        return data;
    },

    async createMyOrder(payload: OrderRequest): Promise<OrderResponse> {
        const {data} = await api.post<OrderResponse>(`${BASE_URL}/me`, payload);
        return data;
    },

    async updateMyOrder(orderId: string, payload: OrderRequest): Promise<OrderResponse> {
        const {data} = await api.patch<OrderResponse>(`${BASE_URL}/${orderId}/me`, payload);
        return data;
    },

    async cancelMyOrder(orderId: string): Promise<string> {
        const {data} = await api.post<string>(`${BASE_URL}/${orderId}/cancel/me`);
        return data;
    },
};