package com.freelancer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.FreelancerLanguageDTO;
import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.ids.FreelancerLanguageId;
import com.freelancer.service.FreelancerLanguageService;

@RestController
@RequestMapping("/freelancerlanguage")
public class FreelancerLanguageController
		extends
			EntityController<FreelancerLanguage, FreelancerLanguageDTO, FreelancerLanguageId> {
	
	@Autowired
	FreelancerLanguageService freelancerLanguageService;

	@GetMapping("/freelancerId/{freelancerId}/languageId/{languageId}")
	public FreelancerLanguageDTO getById(@PathVariable Integer freelancerId, @PathVariable Integer languageId) {
		FreelancerLanguageId freelancerLanguageId = new FreelancerLanguageId(freelancerId,languageId );
		FreelancerLanguage freelancerLanguage = freelancerLanguageService.getById(freelancerLanguageId).orElse(null);
		return freelancerLanguage == null ? null : freelancerLanguage.toDto();
	}
	
}
