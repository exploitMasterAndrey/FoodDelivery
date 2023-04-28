package com.example.kr_backend.aop;

import com.example.kr_backend.model.Order;
import com.example.kr_backend.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class EmailProducer {
    private final EmailSenderService emailSenderService;
    @AfterReturning("@annotation(SendEmail)")
    public void afterReturning(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        Order order = (Order) args[0];

        emailSenderService.sendSimpleEmail(
                order.getConsumerEmail(),
                emailSenderService.formatBody(order),
                "Вкусная Доставка"
        );
    }
}
