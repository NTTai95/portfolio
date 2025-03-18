package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.freelancer.model.Apply;
import com.freelancer.model.Freelancer;
import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.Profile;
import com.freelancer.model.Skill;
import com.freelancer.service.ApplyService;
import com.freelancer.service.ProfileService;
import com.freelancer.service.SkillService;
import com.freelancer.utils.ApplicationContextProvider;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerDTO implements EntityDTO<Freelancer> {
	private Integer id;
	private String introduce;
	private Integer status;
	private Integer profileId;
	private List<Integer> skillIds;
	private List<FreelancerLanguageDTO> freelancerLanguages;
	private List<ApplyDTO> applies;

	public Freelancer toEntity() {
		ProfileService profileService = ApplicationContextProvider.getBean(ProfileService.class);
		SkillService skillService = ApplicationContextProvider.getBean(SkillService.class);
		
		Profile profile = profileId != null
				? profileService.getById(profileId).orElse(null)
				: null;
		List<Skill> skills = skillIds != null
				? skillService.getAllById(skillIds)
				: List.of();
		List<FreelancerLanguage> freelancerLanguagesE = freelancerLanguages != null
				? freelancerLanguages.stream().map(FreelancerLanguageDTO::toEntity).toList()
				: List.of();
		List<Apply> appliesE = applies != null
				? applies.stream().map(ApplyDTO::toEntity).toList()
				: List.of();

		return Freelancer.builder().id(this.id).introduce(this.introduce)
				.status(this.status).profile(profile).skills(skills)
				.freelancerLanguages(freelancerLanguagesE).applies(appliesE)
				.build();
	}
}
