package com.daniel.ecommerce.order.controller;

import com.daniel.ecommerce.order.dto.response.InvoicePageResponseDTO;
import com.daniel.ecommerce.order.enums.InvoiceSortForField;
import com.daniel.ecommerce.order.enums.PaymentMethod;
import com.daniel.ecommerce.order.service.InvoiceService;
import com.daniel.ecommerce.product.enums.SortDirection;
import com.daniel.ecommerce.shared.security.user.CurrentUser;
import com.daniel.ecommerce.shared.security.user.CustomPrincipal;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService, InvoiceService invoiceService1) {
        this.invoiceService = invoiceService1;
    }

    @GetMapping("/me")
    ResponseEntity<InvoicePageResponseDTO> getInvoicePageByFilters(@CurrentUser CustomPrincipal principal,
                                                                   @RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "10") int size,
                                                                   @RequestParam(defaultValue = "createdAt") InvoiceSortForField field,
                                                                   @RequestParam(required = false) PaymentMethod paymentMethod,
                                                                   @RequestParam(defaultValue = "asc") SortDirection direction) {
        Pageable pageable;
        if (SortDirection.asc.equals(direction)) {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(field.name()).descending());
        }
        InvoicePageResponseDTO orderPageResponse = invoiceService.getInvoicePageByFilters(pageable, paymentMethod, UUID.fromString(principal.userId()));
        return ResponseEntity.ok(orderPageResponse);
    }

    @PostMapping("/create/orders/{order_id}/payment_method/{payment_method}")
    ResponseEntity<String> createInvoice(@PathVariable("order_id") UUID orderId, @PathVariable("payment_method") PaymentMethod paymentMethod, @CurrentUser CustomPrincipal principal) {
        invoiceService.createInvoice(orderId, paymentMethod, UUID.fromString(principal.userId()));
        return ResponseEntity.ok("Invoice created successfully");
    }
}
