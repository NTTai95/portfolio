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

import com.freelancer.dto.LanguageDTO;
import com.freelancer.model.Language;
import com.freelancer.service.LanguageService;

@RestController
@RequestMapping("/languages")
public class LanguageController
		extends
			EntityController<Language, LanguageDTO, Integer> {

	@Autowired
	LanguageService service;

	@Override
	@GetMapping
	public Page<LanguageDTO> getPage(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search,
			@RequestParam(defaultValue = "id,asc") String[] sort) {

		Pageable pageable = PageRequest.of(page - 1, size,
				Sort.by(sort[1].equalsIgnoreCase("asc")
						? Sort.Direction.ASC
						: Sort.Direction.DESC, sort[0]));

		String name = "", iso = "";

		if (search != null) {
			for (int i = 0; i < search.length - 1; i += 2) {
				String key = search[i].toLowerCase().trim();
				String value = search[i + 1];

				if (key.equals("name")) {
					name = value;
				} else if (key.equals("iso")) {
					iso = value;
				}
			}
		}

		if (name.equals("") && iso.equals("")) {
			return service.getAll(pageable).map(e -> e.toDto());
		}

		return service.search(name, iso, pageable).map((e) -> e.toDto());
	}
	
	@GetMapping("/search/name/{name}")
	public List<LanguageDTO> getListByName(@PathVariable String name) {
		List<Language> languages = service.searchByName(name);
		return languages.stream().map(Language::toDto).collect(Collectors.toList());
	}

}
