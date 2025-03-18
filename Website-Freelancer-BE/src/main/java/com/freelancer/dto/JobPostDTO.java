package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.JobPost;
import com.freelancer.model.Product;
import com.freelancer.model.Recruiter;
import com.freelancer.model.Skill;
import com.freelancer.service.ProductService;
import com.freelancer.service.RecruiterService;
import com.freelancer.service.SkillService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobPostDTO implements EntityDTO<JobPost> {
	private Integer id;
	private String title;
	private String description;
	private Date datePosted;
	private Date startDate;
	private Date endDate;
	private Integer budget;
	private Integer status;
	private Integer recruiterId;
	private List<ApplyDTO> applies;
	private List<Integer> skillIds;

	// Chuyển từ JobPostDTO sang JobPost
	public JobPost toEntity() {
		RecruiterService recruiterService = ApplicationContextProvider
				.getBean(RecruiterService.class);
		SkillService skillService = ApplicationContextProvider
				.getBean(SkillService.class);

		Recruiter recruiter = (recruiterId != null)
				? recruiterService.getById(recruiterId).orElse(null)
				: null;
		List<Skill> skills = (skillIds != null)
				? skillService.getAllById(skillIds)
				: null;

		return JobPost.builder().id(this.id).title(this.title)
				.description(this.description)
				.datePosted(
						this.datePosted != null ? this.datePosted : new Date())
				.startDate(this.startDate).endDate(this.endDate)
				.budget(this.budget)
				.status(this.status != null
						? this.status
						: State.JobPost.EDITING)
				.applies(applies != null
						? applies.stream().map(ApplyDTO::toEntity).toList()
						: null)
				.recruiter(recruiter).skills(skills).build();
	}
}
