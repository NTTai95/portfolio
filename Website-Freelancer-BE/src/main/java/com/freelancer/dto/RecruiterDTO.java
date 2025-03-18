package com.freelancer.dto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.Recruiter;
import com.freelancer.service.ProfileService;
import com.freelancer.service.RecruiterService;
import com.freelancer.utils.ApplicationContextProvider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterDTO implements EntityDTO<Recruiter> {
	private Integer id;
	private String name;
	private String introduce;
	private Integer status;
	private Integer profileId;
	private List<Integer> jobPostIds;

	// Phương thức chuyển đổi từ DTO sang Entity
	public Recruiter toEntity() {
		RecruiterService recruiterService = ApplicationContextProvider
				.getBean(RecruiterService.class);
		ProfileService profileService = ApplicationContextProvider
				.getBean(ProfileService.class);

		Recruiter recruiter = recruiterService.getById(this.id)
				.orElse(new Recruiter());

		recruiter.setName(this.name);
		recruiter.setIntroduce(this.introduce);
		recruiter.setStatus(this.status);

		if (this.profileId != null) {
			recruiter.setProfile(
					profileService.getById(this.profileId).orElse(null));
		}

		return recruiter;
	}
}
