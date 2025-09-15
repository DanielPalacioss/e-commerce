package com.daniel.ecommerce.order.service;

import com.daniel.ecommerce.order.dto.request.OrderRequestDTO;
import com.daniel.ecommerce.order.dto.response.OrderPageResponseDTO;
import com.daniel.ecommerce.order.dto.response.OrderResponseDTO;
import com.daniel.ecommerce.order.entity.Order;
import com.daniel.ecommerce.order.enums.OrderStatuses;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface OrderService {

    OrderPageResponseDTO getOrderPageByFiltersMe(Pageable pageable, OrderStatuses status, UUID userId);

    OrderPageResponseDTO getOrderPageWithFilters(Pageable pageable, OrderStatuses status, UUID userId);

    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO, UUID userId);

    OrderResponseDTO updateOrder(UUID orderId, OrderRequestDTO orderRequestDTO, UUID userId);

    Order getOrderById(UUID orderId);

    void cancelOrder(UUID orderId, UUID userId);

    void confirmOrder(UUID orderId, UUID userId);
}
