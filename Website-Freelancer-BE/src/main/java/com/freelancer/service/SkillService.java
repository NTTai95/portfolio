package com.freelancer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;

import com.freelancer.model.Skill;
import com.freelancer.repository.RepositorySkill;

@Service
public class SkillService extends EntityService<Skill, Integer> {
	@Autowired
	private RepositorySkill repository;

	public Page<Skill> searchByNameAndDescription(String text, Pageable pageable) {
		return repository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(text, text, pageable);
	}

	public Skill add(Skill skill) {
		return repository.save(skill);
	}
	
	public List<Skill> searchByName(String name){
		return repository.findByNameContainingIgnoreCase(name);
	}
}
