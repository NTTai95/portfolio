package com.freelancer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.freelancer.repository.RepositoryEntity;

public abstract class EntityService<E, ID> {

	@Autowired
	protected RepositoryEntity<E, ID> repository;

	public List<E> getAll() {
		return repository.findAll();
	}

	public List<E> getAll(Sort sort) {
		return repository.findAll(sort);
	}

	public Page<E> getAll(Pageable pageable) {
		return repository.findAll(pageable);
	}

	public List<E> getAllById(Iterable<ID> ids) {
		return repository.findAllById(ids);
	}

	public List<E> getAllById(List<ID> ids) {
		return repository.findAllById(ids);
	}

	public Optional<E> getById(ID id) {
		return repository.findById(id);
	}

	public E add(E entity) {
		return repository.save(entity);
	}

	@Transactional
	public E update(E entity) {
		System.out.println("--Save");
		return repository.save(entity);
	}

	public void delete(E entity) {
		repository.delete(entity);
	}

	// Phương thức thêm vào Service
	public void deleteById(ID id) {
		repository.deleteById(id);
	}

	public void deleteAllById(Iterable<ID> ids) {
		repository.deleteAllById(ids);
	}

	public void deleteAllById(List<ID> ids) {
		repository.deleteAllById(ids);
	}

	public void deleteAllByIdInBatch(Iterable<ID> ids) {
		repository.deleteAllByIdInBatch(ids);
	}

	public void deleteAllByIdInBatch(List<ID> ids) {
		repository.deleteAllByIdInBatch(ids);
	}

	public void deleteAll() {
		repository.deleteAll();
	}

	public void deleteAll(Iterable<E> entities) {
		repository.deleteAll(entities);
	}
	
	public void deleteAll(List<E> entities) {
		repository.deleteAll(entities);
	}

	public void deleteAllInBatch() {
		repository.deleteAllInBatch();
	}

	public void deleteAllInBatch(Iterable<E> entities) {
		repository.deleteAllInBatch(entities);
	}
	
	public void deleteAllInBatch(List<E> entities) {
		repository.deleteAllInBatch(entities);
	}

	public Long count() {
		return repository.count();
	}

	public Boolean existsById(ID id) {
		return repository.existsById(id);
	}

	public E getReferenceById(ID id) {
		return repository.getReferenceById(id);
	}

	public List<E> saveAll(Iterable<E> entities) {
		return repository.saveAll(entities);
	}

	public List<E> saveAll(List<E> entities) {
		return repository.saveAll(entities);
	}

	public List<E> saveAllAndFlush(Iterable<E> entities) {
		return repository.saveAllAndFlush(entities);
	}

	public List<E> saveAllAndFlush(List<E> entities) {
		return repository.saveAllAndFlush(entities);
	}

	public E saveAndFlush(E entity) {
		return repository.saveAndFlush(entity);
	}
}

