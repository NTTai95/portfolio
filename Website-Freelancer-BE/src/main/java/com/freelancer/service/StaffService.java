package com.freelancer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.freelancer.model.Staff;
import com.freelancer.repository.RepositoryStaff;

@Service
public class StaffService extends EntityService<Staff, Integer> {
	@Autowired
	private RepositoryStaff repository;

	public Optional<Staff> getByPhone(String phone) {
		return repository.findByPhone(phone);
	}

	public Page<Staff> searchAndSort(String fullName, String email, String phone, Pageable pageable) {
		return repository
				.findByFullNameContainingIgnoreCaseAndAccount_EmailContainingIgnoreCaseAndPhoneContainingIgnoreCase(
						fullName, email, phone, pageable);
	}
	
	public Optional<Staff> getByAccount_Id(Integer id) {
		return repository.findByAccount_Id(id);
	}
}
