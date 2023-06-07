package com.example.kr_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/healthz")
public class HealthController {
    @GetMapping
    public ResponseEntity<?> checkHealth(){
        return ResponseEntity.ok().build();
    }
}
