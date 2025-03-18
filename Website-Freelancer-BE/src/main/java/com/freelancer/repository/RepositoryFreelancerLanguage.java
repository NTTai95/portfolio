package com.freelancer.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.ids.FreelancerLanguageId;

@Repository
public interface RepositoryFreelancerLanguage extends RepositoryEntity<FreelancerLanguage, FreelancerLanguageId> {
	public List<FreelancerLanguage> findByLanguageId(FreelancerLanguageId id);
}
