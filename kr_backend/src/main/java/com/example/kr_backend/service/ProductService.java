package com.example.kr_backend.service;

import com.example.kr_backend.model.Category;
import com.example.kr_backend.model.Product;
import com.example.kr_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public List<Product> getAllProductsByCategoryName(String categoryName){
        return productRepository.findProductByCategory(Category.valueOf(categoryName));
    }

    public Product updateOrSaveProduct(Product product){
        return productRepository.save(product);
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).get();
    }

    public void deleteProductById(Long id){
        productRepository.deleteById(id);
    }
}
