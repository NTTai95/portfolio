package com.freelancer.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.freelancer.model.Freelancer;
import com.freelancer.repository.RepositoryFreelancer;

@Service
public class FreelancerService extends EntityService<Freelancer, Integer> {
	@Autowired
	private RepositoryFreelancer repository;

	public Optional<Freelancer> findByAccountId(Integer id) {
		return repository.findByProfile_Account_Id(id);
	}

	public List<Map<String, Object>> getTop10Freelancer() {
		return repository.findTop10Freelancer(PageRequest.of(0, 10));
	}
}
