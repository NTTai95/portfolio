package com.freelancer.dto;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.Apply;
import com.freelancer.model.Freelancer;
import com.freelancer.model.JobPost;
import com.freelancer.service.FreelancerService;
import com.freelancer.service.JobPostService;
import com.freelancer.service.ProductService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplyDTO implements EntityDTO<Apply> {
	private Integer id;
	private String context;
	private Integer status;
	private Integer freelancerId;
	private Integer jobPostId;
	private Integer productId;
	private LocalDateTime dateCreated;

	// Chuyển đổi DTO thành Entity, sử dụng Repository để lấy liên kết
	public Apply toEntity() {
		JobPostService jobPostService = ApplicationContextProvider
				.getBean(JobPostService.class);
		FreelancerService freelancerService = ApplicationContextProvider
				.getBean(FreelancerService.class);

		ProductService productService = ApplicationContextProvider
				.getBean(ProductService.class);

		Freelancer freelancer = freelancerService.getById(this.freelancerId)
				.orElseThrow(
						() -> new RuntimeException("Freelancer không tồn tại"));
		JobPost jobPost = jobPostService.getById(this.jobPostId).orElseThrow(
				() -> new RuntimeException("JobPost không tồn tại"));

		return Apply.builder().id(this.id).context(this.context)
				.status(this.status != null ? this.status : State.Apply.PENDING)
				.freelancer(freelancer).jobPost(jobPost)
				.dateCreated(this.dateCreated != null
						? this.dateCreated
						: LocalDateTime.now())
				.product(productId != null
						? productService.getById(productId).orElse(null)
						: null)
				.build();
	}

}
