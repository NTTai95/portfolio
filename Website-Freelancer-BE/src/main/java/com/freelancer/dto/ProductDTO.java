package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.Product;
import com.freelancer.service.ApplyService;
import com.freelancer.service.JobPostService;
import com.freelancer.service.ProductService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO implements EntityDTO<Product> {
	private Integer id;
	private Date dateCreated;
	private String description;
	private String link;
	private Integer status;
	private Integer applyId;

	public Product toEntity() {
		ProductService productService = ApplicationContextProvider
				.getBean(ProductService.class);

		ApplyService applyService = ApplicationContextProvider
				.getBean(ApplyService.class);

		Product product = id != null
				? productService.getById(id).orElse(new Product())
				: new Product();
		product.setDateCreated(
				this.dateCreated != null ? this.dateCreated : new Date());
		product.setDescription(
				this.description != null ? this.description : "");
		product.setLink(this.link);
		product.setStatus(
				this.status != null ? this.status : State.Product.REVIEWING);
		product.setApply(applyId != null
				? applyService.getById(applyId).orElse(null)
				: null);
		return product;
	}
}
