package com.freelancer.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.freelancer.model.Staff;

@Repository
public interface RepositoryStaff extends RepositoryEntity<Staff, Integer> {
	public Optional<Staff> findByPhone(String phone);

	public Page<Staff> findByFullNameContainingIgnoreCaseAndAccount_EmailContainingIgnoreCaseAndPhoneContainingIgnoreCase(
			String fullName, String email, String phone, Pageable pageable);
	
	public Optional<Staff> findByAccount_Id(Integer id);
}
