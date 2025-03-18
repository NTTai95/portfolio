package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.freelancer.model.Freelancer;
import com.freelancer.model.JobPost;
import com.freelancer.model.Skill;
import com.freelancer.service.FreelancerService;
import com.freelancer.service.JobPostService;
import com.freelancer.service.SkillService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillDTO implements EntityDTO<Skill> {
	private Integer id;
	private String name;
	private String description;

	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Integer status = State.Skill.SHOW;

	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private List<Integer> freelancerIds = null;

	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private List<Integer> jobPostIds = null;

	public Skill toEntity() {
		SkillService skillService = ApplicationContextProvider
				.getBean(SkillService.class);
		FreelancerService freelancerService = ApplicationContextProvider
				.getBean(FreelancerService.class);
		JobPostService jobPostService = ApplicationContextProvider
				.getBean(JobPostService.class);

		Skill skill = (id == null)
				? new Skill()
				: skillService.getById(this.id).orElse(new Skill());

		skill.setName(this.name);
		skill.setDescription(this.description);
		skill.setStatus(this.status);

		if (this.freelancerIds != null) {
			List<Freelancer> freelancers = freelancerService
					.getAllById(this.freelancerIds);
			skill.setFreelancers(freelancers);
		}

		if (this.jobPostIds != null) {
			List<JobPost> jobPosts = jobPostService.getAllById(this.jobPostIds);
			skill.setJobPosts(jobPosts);
		}

		return skill;
	}
}
