package com.example.kr_backend.repository;

import com.example.kr_backend.model.Category;
import com.example.kr_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByCategory(Category category);
}
