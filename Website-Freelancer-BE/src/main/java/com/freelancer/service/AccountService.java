package com.freelancer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancer.model.Account;
import com.freelancer.repository.RepositoryAccount;

@Service
public class AccountService extends EntityService<Account, Integer> {

	@Autowired
	private RepositoryAccount repository;

	public Optional<Account> getByEmail(String email) {
		return repository.findByEmail(email);
	}

	public Optional<Account> getByEmailAndPassword(String email, String password) {
		return repository.findByEmailAndPassword(email, password);
	}

	public Optional<Account> getByPassword(String password) {
		return repository.findByPassword(password);
	}
//xu li duoc nhieu nghiep vu hon
}
