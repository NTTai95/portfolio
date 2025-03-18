package com.freelancer.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.ApplyDTO;
import com.freelancer.utils.State;

import jakarta.persistence.*;
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
@Table(name = "Applies")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Apply implements EntityBase<ApplyDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "ntext NOT NULL")
	private String context;

	@Column(nullable = false)
	@Default
	private Integer status = State.Apply.PENDING;

	@Column(nullable = false)
	@Default
	private LocalDateTime dateCreated = LocalDateTime.now();

	@OneToOne(mappedBy = "apply")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "FreelancerId", nullable = false)
	private Freelancer freelancer;

	@ManyToOne
	@JoinColumn(name = "JobPostId", nullable = false)
	private JobPost jobPost;

	// Chuyển đổi sang DTO
	public ApplyDTO toDto() {
		return ApplyDTO.builder().id(this.id).context(this.context)
				.status(this.status).freelancerId(this.freelancer.getId())
				.productId(product != null ? product.getId() : null)
				.jobPostId(this.jobPost.getId()).dateCreated(dateCreated)
				.build();
	}
}
