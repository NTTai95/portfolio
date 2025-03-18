package com.freelancer.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.freelancer.model.Account;

@Repository
public interface RepositoryAccount extends RepositoryEntity<Account, Integer> {
	public Optional<Account> findByEmail(String email);
	public Optional<Account> findByEmailAndPassword(String email, String password);
	public Optional<Account> findByPassword(String password); //dung lenh sdl de truy xuat account theo password
}
