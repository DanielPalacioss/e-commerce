export interface InvoiceResponseDTO {
    id: string;
    orderId: string;
    totalAmount: number;
    paymentMethod: "CREDIT_CARD" | "DEBIT_CARD";
    createdAt: string;
}

export interface InvoicePageResponseDTO {
    invoices: InvoiceResponseDTO[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export type InvoiceSortForField = "createdAt" | "totalAmount" | "paymentMethod";
export type PaymentMethod = "CREDIT_CARD" | "DEBIT_CARD";