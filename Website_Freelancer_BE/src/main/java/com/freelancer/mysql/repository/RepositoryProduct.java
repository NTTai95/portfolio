package com.freelancer.mysql.repository;

import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Product;

@Repository
public interface RepositoryProduct extends RepositoryBase<Product, Integer> {
}