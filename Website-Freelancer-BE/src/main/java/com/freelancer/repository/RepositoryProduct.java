package com.freelancer.repository;

import org.springframework.stereotype.Repository;

import com.freelancer.model.Product;

@Repository
public interface RepositoryProduct extends RepositoryEntity<Product, Integer> {

}
