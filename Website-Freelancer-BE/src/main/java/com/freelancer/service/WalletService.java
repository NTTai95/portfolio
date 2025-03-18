package com.freelancer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancer.model.Wallet;
import com.freelancer.repository.RepositoryProfile;
import com.freelancer.repository.RepositoryWallet;

@Service
public class WalletService extends EntityService<Wallet, Integer> {
	@Autowired
	RepositoryWallet repository;

	@Autowired
	RepositoryProfile profileRepository;

	public Optional<Wallet> getByRecruiterId(Integer id) {
		return repository.findByProfile_Recruiter_Id(id);
	}

	public Optional<Wallet> getByProfileId(Integer id) {
		return repository.findByProfile_id(id);
	}

}
