package com.freelancer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.freelancer.model.Profile;
import com.freelancer.repository.RepositoryProfile;

@Service
public class ProfileService extends EntityService<Profile, Integer> {
	@Autowired
	private RepositoryProfile repository;

	public Optional<Profile> getByPhone(String phone) {
		return repository.findByPhone(phone);
	}

	public Optional<Profile> getByAccount_Id(Integer id) {
		return repository.findByAccount_Id(id);
	}

	public Optional<Profile> getByRecruiter_Id(Integer id) {
		return repository.findByRecruiter_Id(id);
	}

	public Page<Profile> getByFreelancerIdNotNull(String fullName,
			Pageable pageable) {
		return repository.findByFreelancerIdNotNullAndFullNameContainingIgnoreCase(fullName, pageable);
	}

	public Optional<Profile> getByFreeLancer_Id(Integer id) {
		return repository.findByFreelancer_Id(id);
	}

}
