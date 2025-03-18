package com.freelancer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.freelancer.model.Language;
import com.freelancer.repository.RepositoryLanguage;

@Service
public class LanguageService extends EntityService<Language, Integer> {

	@Autowired
	RepositoryLanguage repository;

	public Page<Language> search(String name, String iso, Pageable pageable) {
		return repository
				.findByNameContainingIgnoreCaseAndISOContainingIgnoreCase(name,
						iso, pageable);
	}

	public Optional<Language> getByISO(String iso) {
		return repository.findByISO(iso);
	}

	public List<Language> searchByName(String name) {
		return repository.findByNameContainingIgnoreCase(name);
	}
}
