package com.daniel.ecommerce.order.service;

import com.daniel.ecommerce.order.dto.response.InvoicePageResponseDTO;
import com.daniel.ecommerce.order.dto.response.InvoiceResponseDTO;
import com.daniel.ecommerce.order.entity.Invoice;
import com.daniel.ecommerce.order.entity.Order;
import com.daniel.ecommerce.order.enums.PaymentMethod;
import com.daniel.ecommerce.order.repository.InvoiceRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final OrderService orderService;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, OrderService orderService) {
        this.invoiceRepository = invoiceRepository;
        this.orderService = orderService;
    }

    @Override
    public InvoicePageResponseDTO getInvoicePageByFilters(Pageable pageable, PaymentMethod paymentMethod, UUID userId) {
        Page<Invoice> invoicePage;
        if (paymentMethod == null) {
            invoicePage = invoiceRepository.findAllByOrder_User_Id(userId, pageable);

        } else {
            invoicePage = invoiceRepository.findAllByPaymentMethodAndOrder_User_Id(paymentMethod, userId, pageable);
        }

        return InvoicePageResponseDTO.builder()
                .invoices(invoicePage.stream().map(invoice -> new InvoiceResponseDTO(invoice)).toList())
                .page(invoicePage.getNumber())
                .totalPages(invoicePage.getTotalPages())
                .totalElements(invoicePage.getTotalElements())
                .size(invoicePage.getSize())
                .build();
    }

    @Transactional
    @Override
    public void createInvoice(UUID orderId, PaymentMethod paymentMethod, UUID userId) {
        Order order = orderService.getOrderById(orderId);

        Invoice invoice = Invoice.builder()
                .order(order)
                .totalAmount(order.getTotalPrice())
                .paymentMethod(paymentMethod)
                .build();
        invoiceRepository.save(invoice);
        orderService.confirmOrder(orderId, userId);
    }
}
