package com.example.kr_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/healthz")
    public ResponseEntity<?> checkHealth(){
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<?> checkHealth1(){
        return ResponseEntity.ok().build();
    }
}
