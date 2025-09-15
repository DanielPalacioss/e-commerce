package com.daniel.ecommerce.order.service;

import com.daniel.ecommerce.order.dto.response.InvoicePageResponseDTO;
import com.daniel.ecommerce.order.enums.PaymentMethod;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface InvoiceService {

    InvoicePageResponseDTO getInvoicePageByFilters(Pageable pageable, PaymentMethod paymentMethod, UUID userId);

    void createInvoice(UUID orderId, PaymentMethod paymentMethod, UUID userId);
}
