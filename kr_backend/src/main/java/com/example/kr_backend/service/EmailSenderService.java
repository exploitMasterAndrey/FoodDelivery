package com.example.kr_backend.service;

import com.example.kr_backend.model.Order;
import com.example.kr_backend.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService {
    private final JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail, String body, String subject){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("andreylobankoff@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);
    }

    public String formatBody(Order order){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Доставка будет по адресу: ").append(order.getConsumerAddress()).append('\n')
                .append("Ваш заказ:\n");
        for (Product product : order.getProducts()){
            stringBuilder.append(product.getTitle()).append(": ").append(product.getPrice()).append('\n');
        }
        stringBuilder.append("Всего к оплате: ").append(order.getTotal());

        return stringBuilder.toString();
    }
}
