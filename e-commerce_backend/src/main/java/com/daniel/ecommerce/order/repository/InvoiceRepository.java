package com.daniel.ecommerce.order.repository;

import com.daniel.ecommerce.order.entity.Invoice;
import com.daniel.ecommerce.order.enums.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, UUID> {
    @EntityGraph(attributePaths = {"order"})
    Page<Invoice> findAllByPaymentMethodAndOrder_User_Id(PaymentMethod paymentMethod, UUID orderUserId, Pageable pageable);

    @EntityGraph(attributePaths = {"order"})
    Page<Invoice> findAllByOrder_User_Id(UUID userId, Pageable pageable);
}
