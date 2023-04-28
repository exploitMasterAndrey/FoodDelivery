package com.example.kr_backend.service;

import com.example.kr_backend.aop.SendEmail;
import com.example.kr_backend.model.Order;
import com.example.kr_backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    @SendEmail
    public Order saveOrder(Order order){
        return orderRepository.save(order);
    }
}
