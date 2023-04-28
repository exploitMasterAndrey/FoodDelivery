package com.example.kr_backend.dto;

import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Component;

@Data
@Component
@Getter
public class UserDto {
    private String userName;
    private String password;
}
