package com.freelancer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.ids.FreelancerLanguageId;
import com.freelancer.repository.RepositoryFreelancerLanguage;

@Service
public class FreelancerLanguageService
		extends
			EntityService<FreelancerLanguage, FreelancerLanguageId> {
	@Autowired
	private RepositoryFreelancerLanguage repository;
	
	
	public List<FreelancerLanguage> getByLanguageId(FreelancerLanguageId id) {
		return repository.findByLanguageId(id);
	}
}
