package com.example.kr_backend.controller;

import com.example.kr_backend.model.Product;
import com.example.kr_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService productService;
    @GetMapping
    public ResponseEntity<?> getAllProducts(){
        List<Product> allProducts = productService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }

    @GetMapping("/{categoryName}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String categoryName){
        List<Product> productsByCategoryName = productService.getAllProductsByCategoryName(categoryName);
        return ResponseEntity.ok(productsByCategoryName);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@RequestBody Product product){
        Product savedProduct = productService.updateOrSaveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody Product product){
        Product savedProduct = productService.updateOrSaveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @GetMapping("/single/{id}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable Long id){
        Product productById = productService.getProductById(id);
        return ResponseEntity.ok(productById);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProductById(@PathVariable Long id){
        productService.deleteProductById(id);
    }

}
