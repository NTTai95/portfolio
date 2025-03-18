package com.freelancer.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.freelancer.model.JobPost;

@Repository
public interface RepositoryJobPost extends RepositoryEntity<JobPost, Integer> {
	public Page<JobPost> findByStatus(Integer status, Pageable pageable);

	public Page<JobPost> findByRecruiter_Profile_Account_Id(Integer id,
			Pageable pageable);

	@Query("SELECT DISTINCT j FROM JobPost j LEFT JOIN j.skills s "
			+ "WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	public Page<JobPost> searchJobPosts(@Param("keyword") String keyword,
			Pageable pageable);

	Page<JobPost> findByStatusInAndRecruiter_Profile_Account_Id(
			List<Integer> status, Integer accountId, Pageable pageable);

	Page<JobPost> findByStatusIn(List<Integer> status, Pageable pageable);

	@Query("SELECT DISTINCT j FROM JobPost j LEFT JOIN j.skills s "
			+ "WHERE (LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) "
			+ "OR LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) "
			+ "AND j.status IN :status")
	Page<JobPost> searchJobPostsWithStatus(@Param("keyword") String keyword,
			@Param("status") List<Integer> status, Pageable pageable);

	@Query("SELECT COUNT(j) FROM JobPost j WHERE j.datePosted BETWEEN :startDate AND :endDate")
	Long countInCurrentMonth(@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate);

	@Query("SELECT COUNT(j) FROM JobPost j WHERE j.status IN :status AND j.datePosted BETWEEN :startDate AND :endDate")
	Long countInCurrentMonthByStatus(
			@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate,
			@Param("status") List<Integer> status);
	
	@Query("SELECT COUNT(j) FROM JobPost j WHERE j.recruiter.id = :id")
	long countJobPostsByRecruiter(@Param("id") Integer id);

}
