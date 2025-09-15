import {UserAddressResponse} from "@/types/userAddress";

export interface OrderItemRequest {
    productId: string;
    quantity: number;
}

export interface OrderRequest {
    shippingAddressId: string;
    items: OrderItemRequest[];
}

export type OrderStatuses = "PENDING" | "CONFIRMED" | "CANCELLED";
export type OrderSortForField = "createdAt" | "totalPrice" | "status";

export interface OrderItemResponse {
    id: string;
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderResponse {
    id: string;
    user: string;
    shippingAddress: UserAddressResponse;
    totalPrice: number;
    status: OrderStatuses;
    items: OrderItemResponse[];
    createdAt: string;
}

export interface OrderPageResponse {
    orders: OrderResponse[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}