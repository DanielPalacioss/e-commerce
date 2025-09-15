import api from "@/api/axios";
const BASE_URL = "/invoices";
export const invoiceService = {
    async getInvoicesMe(page = 0, size = 10, field = "createdAt", direction = "asc", paymentMethod) {
        const params = {
            page,
            size,
            field,
            direction,
        };
        if (paymentMethod) {
            params.paymentMethod = paymentMethod;
        }
        const response = await api.get(`${BASE_URL}/me`, {
            params,
        });
        return response.data;
    },
    async createInvoice(orderId, paymentMethod) {
        const response = await api.post(`${BASE_URL}/create/orders/${orderId}/payment_method/${paymentMethod}`);
        return response.data;
    },
};
