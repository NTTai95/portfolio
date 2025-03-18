package com.freelancer.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import com.freelancer.config.OrikaConfig;
import com.freelancer.dto.EntityDTO;
import com.freelancer.model.EntityBase;
import com.freelancer.service.EntityService;

public abstract class EntityController<E extends EntityBase<D>, D extends EntityDTO<E>, ID> {

	@Autowired
	protected EntityService<E, ID> service;

	@Autowired
	private OrikaConfig orikaConfig;

	@GetMapping("/all")
	public List<D> getAll() {
		return service.getAll().stream().map((e) -> e.toDto())
				.collect(Collectors.toList());
	}

	@GetMapping("/count")
	public Long count() {
		return service.count();
	}

	@GetMapping
	public Page<D> getPage(@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search,
			@RequestParam(required = false) String[] sort) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.getAll(pageable).map((e) -> e.toDto());
	}

	@GetMapping("/{id}")
	public D getById(@PathVariable ID id) {
		E e = service.getById(id).orElse(null);
		return e != null ? e.toDto() : null;
	}

	@GetMapping("/list")
	public List<D> getByIds(@RequestParam List<ID> ids) {
		return service.getAllById(ids).stream().map((e) -> e.toDto())
				.collect(Collectors.toList());
	}

	@PostMapping
	public D add(@RequestBody D dto) {
		return service.add(dto.toEntity()).toDto();
	}

	@PutMapping("/{id}")
	public D update(@RequestBody D dto, @PathVariable ID id) {
		D entityDto = service.getById(id).orElse(null).toDto();

		orikaConfig.mergeEntities(entityDto, dto);

		return service.update(entityDto.toEntity()).toDto();
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable ID id) {
		service.deleteById(id);
	}
}
