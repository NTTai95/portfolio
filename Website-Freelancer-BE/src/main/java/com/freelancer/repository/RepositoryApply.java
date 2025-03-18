package com.freelancer.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.freelancer.model.Apply;

@Repository
public interface RepositoryApply extends RepositoryEntity<Apply, Integer> {
	public Page<Apply> findByJobPost_Id(Integer jobPostId, Pageable pageable);

	public void deleteByJobPost_Id(Integer jobPostId);

	@Modifying
	@Transactional
	@Query("UPDATE Apply a SET a.status = :status WHERE a.jobPost.id = :id")
	public void updateAllStatusByJobPostId(@Param("id") Integer id, @Param("status") Integer status);

	public Optional<Apply> findByStatusAndJobPost_Id(Integer status, Integer jobPostId);

	@Query("SELECT a FROM Apply a WHERE a.freelancer.id = :freelancerId AND a.status = :status")
	public Page<Apply> findCompletedJobsByFreelancer(@Param("id") Integer id, @Param("status") Integer status,
			Pageable pageable);

	@Query("SELECT COUNT(a) FROM Apply a WHERE a.freelancer.id = :id AND a.status = :status")
	long countCompletedJobsByFreelancer(@Param("id") Integer id, @Param("status") Integer status);

}
