package com.freelancer.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.freelancer.model.Skill;

@Repository
public interface RepositorySkill extends RepositoryEntity<Skill, Integer> {

	Page<Skill> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description,
			Pageable pageable);

	List<Skill> findByNameContainingIgnoreCase(String name);
}
