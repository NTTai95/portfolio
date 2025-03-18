package com.freelancer.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.freelancer.model.Profile;
import com.freelancer.model.Wallet;

@Repository
public interface RepositoryWallet extends RepositoryEntity<Wallet, Integer> {
	public Optional<Wallet> findByProfile_Recruiter_Id(Integer id);
	public Optional<Wallet> findByProfile_id(Integer id);

}
