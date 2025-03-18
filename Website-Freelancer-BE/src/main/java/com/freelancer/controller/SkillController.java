package com.freelancer.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.SkillDTO;

import com.freelancer.model.Skill;

import com.freelancer.service.SkillService;
import com.freelancer.utils.Formater;

@RestController
@RequestMapping("/skills")
public class SkillController extends EntityController<Skill, SkillDTO, Integer> {

	@Autowired
	private SkillService service;

	@GetMapping
	public Page<SkillDTO> getPage(@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size, @RequestParam(required = false) String[] search,
			@RequestParam(required = false) String[] sort) {
		Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.ASC, "id"));

		Page<Skill> skillPage;

		if (search != null && search.length >= 2) {
			skillPage = service.searchByNameAndDescription(search[1], pageable);
		} else {
			skillPage = service.getAll(pageable);
		}

		return skillPage.map(Skill::toDto);
	}

	@GetMapping("/search/name/{name}")
	public List<SkillDTO> getListByName(@PathVariable String name) {
		List<Skill> skills = service.searchByName(name);
		return skills.stream().map(Skill::toDto).collect(Collectors.toList());
	}

}
