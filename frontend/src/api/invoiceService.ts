import {InvoicePageResponseDTO, InvoiceSortForField, PaymentMethod} from "@/types/invoice";
import api from "@/api/axios";
import {SortDirection} from "@/types/share";

const BASE_URL = "/invoices";

export const invoiceService = {
    async getInvoicesMe(
        page: number = 0,
        size: number = 10,
        field: InvoiceSortForField = "createdAt",
        direction: SortDirection = "asc",
        paymentMethod?: PaymentMethod
    ): Promise<InvoicePageResponseDTO> {
        const params: Record<string, string | number> = {
            page,
            size,
            field,
            direction,
        };
        if (paymentMethod) {
            params.paymentMethod = paymentMethod;
        }

        const response = await api.get<InvoicePageResponseDTO>(`${BASE_URL}/me`, {
            params,
        });
        return response.data;
    },

    async createInvoice(
        orderId: string,
        paymentMethod: PaymentMethod
    ): Promise<string> {
        const response = await api.post<string>(
            `${BASE_URL}/create/orders/${orderId}/payment_method/${paymentMethod}`
        );
        return response.data;
    },
};