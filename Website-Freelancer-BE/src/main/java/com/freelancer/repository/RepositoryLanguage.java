package com.freelancer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.freelancer.model.Language;

@Repository
public interface RepositoryLanguage extends RepositoryEntity<Language, Integer> {
	public Page<Language> findByNameContainingIgnoreCaseAndISOContainingIgnoreCase(String name, String iso, Pageable pageable);
	public Optional<Language> findByISO(String iso);
	
	public List<Language> findByNameContainingIgnoreCase(String name);
}
