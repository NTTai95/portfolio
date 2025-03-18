package com.freelancer.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.freelancer.model.Profile;

@Repository
public interface RepositoryProfile extends RepositoryEntity<Profile, Integer> {
	public Optional<Profile> findByPhone(String phone);
	public Optional<Profile> findByAccount_Id(Integer id);
	public Optional<Profile> findByRecruiter_Id(Integer id);
	public Page<Profile> findByFreelancerIdNotNullAndFullNameContainingIgnoreCase(String fullName ,Pageable pageable);
	public Optional<Profile> findByFreelancer_Id(Integer id);
}
