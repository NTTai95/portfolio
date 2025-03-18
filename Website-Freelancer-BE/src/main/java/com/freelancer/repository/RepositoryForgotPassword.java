package com.freelancer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.freelancer.model.ForgotPassword;

@Repository
public interface RepositoryForgotPassword
		extends
			RepositoryEntity<ForgotPassword, String> {
	public List<ForgotPassword> deleteAllByAccount_Id(Integer id);

	public Optional<ForgotPassword> findByToken(String token);
}
