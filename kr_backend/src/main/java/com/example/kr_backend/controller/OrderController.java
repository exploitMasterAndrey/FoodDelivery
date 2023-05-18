package com.example.kr_backend.controller;

import com.example.kr_backend.model.Order;
import com.example.kr_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody Order order){
        Order saveOrder = orderService.saveOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveOrder);
    }
}
