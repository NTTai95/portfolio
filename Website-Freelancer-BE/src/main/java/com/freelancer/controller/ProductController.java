package com.freelancer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.ProductDTO;
import com.freelancer.model.Product;
import com.freelancer.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController
		extends
			EntityController<Product, ProductDTO, Integer> {

	@Autowired
	ProductService service;
}
