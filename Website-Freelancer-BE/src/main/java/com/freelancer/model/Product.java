package com.freelancer.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.ProductDTO;
import com.freelancer.utils.State;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Products")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Product implements EntityBase<ProductDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@Default
	private Date dateCreated = new Date();

	@Column(columnDefinition = "ntext NOT NULL")
	private String description;

	@Column(columnDefinition = "text NOT NULL")
	private String link;

	@Column(nullable = false)
	@Default
	private Integer status = State.Product.REVIEWING;

	@OneToOne
	@JoinColumn(name = "ApplyId", updatable = false)
	private Apply apply;

	public ProductDTO toDto() {
		return ProductDTO.builder().id(this.id).dateCreated(this.dateCreated)
				.description(this.description).link(this.link)
				.status(this.status)
				.applyId(this.apply != null ? this.apply.getId() : null)
				.build();
	}
}
