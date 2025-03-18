package com.freelancer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.freelancer.model.Recruiter;
import com.freelancer.repository.RepositoryRecruiter;

import jakarta.persistence.Tuple;

@Service
public class RecruiterService extends EntityService<Recruiter, Integer> {

	@Autowired
	private RepositoryRecruiter repository;

	public Optional<Recruiter> getByAccountId(Integer id) {
		return repository.findByProfile_Account_Id(id);
	}

	public List<Map<String, Object>> getTop10Recruiters() {
		return repository.findTop10Recruiters(PageRequest.of(0, 10));
	}

}
