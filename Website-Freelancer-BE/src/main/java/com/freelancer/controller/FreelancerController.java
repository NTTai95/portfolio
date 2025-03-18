package com.freelancer.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.FreelancerDTO;
import com.freelancer.dto.FreelancerLanguageDTO;
import com.freelancer.model.Freelancer;
import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.Profile;
import com.freelancer.model.Skill;
import com.freelancer.service.FreelancerService;

import com.freelancer.service.ProfileService;
import com.freelancer.service.SkillService;
import com.freelancer.utils.State;

@RestController
@RequestMapping("/freelancers")
public class FreelancerController extends EntityController<Freelancer, FreelancerDTO, Integer> {

	@Autowired
	FreelancerService service;

	@Autowired
	SkillService skillService;

	@Autowired
	ProfileService profileService;

	@GetMapping("/account/{id}")
	public FreelancerDTO getByAccountId(@PathVariable Integer id) {
		Freelancer freelancer = service.findByAccountId(id).orElse(null);
		return freelancer == null ? null : freelancer.toDto();
	}

	@Override
	@PostMapping
	public FreelancerDTO add(@RequestBody FreelancerDTO dto) {
		Freelancer freelancer = new Freelancer();
		freelancer.setIntroduce(dto.getIntroduce());
		freelancer.setStatus(State.Freelancer.SHOW);

		List<Skill> skills = skillService.getAllById(dto.getSkillIds());
		freelancer.setSkills(skills);

		Freelancer freelancerNew = service.add(freelancer);

		List<FreelancerLanguage> freelancerLanguages = new ArrayList<>();

		for (FreelancerLanguageDTO freelancerLanguageDTO : dto.getFreelancerLanguages()) {
			freelancerLanguageDTO.setFreelancerId(freelancerNew.getId());
			freelancerLanguages.add(freelancerLanguageDTO.toEntity());
		}
		freelancerNew.setFreelancerLanguages(freelancerLanguages);
		service.update(freelancerNew);

		Profile profile = profileService.getById(dto.getProfileId()).orElse(null);
		profile.setFreelancer(freelancerNew);
		profileService.update(profile);

		return freelancerNew.toDto();
	}
	
	@GetMapping("/top10")
	public List<Map<String, Object>> getTop10() {
		return service.getTop10Freelancer();
	}
}
