package com.freelancer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.RecruiterDTO;
import com.freelancer.model.Recruiter;
import com.freelancer.service.RecruiterService;

@RestController
@RequestMapping("/recruiters")
public class RecruiterController
		extends
			EntityController<Recruiter, RecruiterDTO, Integer> {

	@Autowired
	RecruiterService service;

	@GetMapping("/account/{id}")
	public RecruiterDTO getByAccount(@PathVariable("id") Integer id) {
		Recruiter recruiter = service.getByAccountId(id).orElse(null);
		return recruiter == null ? null : recruiter.toDto();
	}

	@GetMapping("/top10")
	public List<Map<String, Object>> getTop10() {
		return service.getTop10Recruiters();
	}

}
