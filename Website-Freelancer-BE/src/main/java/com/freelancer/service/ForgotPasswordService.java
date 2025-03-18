package com.freelancer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancer.model.ForgotPassword;
import com.freelancer.repository.RepositoryForgotPassword;

import jakarta.transaction.Transactional;

@Service
public class ForgotPasswordService
		extends
			EntityService<ForgotPassword, String> {
	@Autowired
	RepositoryForgotPassword repository;

	@Transactional
	public List<ForgotPassword> deleteAllByAccount_Id(Integer id) {
		return repository.deleteAllByAccount_Id(id);
	}
	
	public Optional<ForgotPassword> getByToken(String token) {
		return repository.findByToken(token);
	}

}
