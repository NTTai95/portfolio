package com.freelancer.mysql.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Job;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositoryJob extends RepositoryBase<Job, Integer> {
      @Query("SELECT j FROM Job j JOIN FETCH j.employer WHERE j.id = :jobId")
      Optional<Job> findWithEmployerById(@Param("jobId") Integer jobId);

      @Query("""
                      SELECT DISTINCT j
                      FROM Job j
                      JOIN j.employer e
                      LEFT JOIN j.skills s
                      WHERE (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                             OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
                        AND (:majorId IS NULL OR j.major.id = :majorId)
                        AND (:minBudget IS NULL OR j.budget >= :minBudget)
                        AND (:maxBudget IS NULL OR j.budget <= :maxBudget)
                        AND (:maxDurationHours IS NULL OR j.durationHours <= :maxDurationHours)
                        AND (:skillIds IS NULL OR s.id IN :skillIds)
                        AND j.status = 'PUBLIC'
                        AND j.closedAt > CURRENT_TIMESTAMP
                  """)
      Page<Job> searchJobsPage(@Param("keyword") String keyword,
                  @Param("skillIds") List<Integer> skillIds, @Param("minBudget") Integer minBudget,
                  @Param("maxBudget") Integer maxBudget, @Param("majorId") Integer majorId,
                  @Param("maxDurationHours") Integer maxDurationHours, Pageable pageable);

      @Query("SELECT j FROM Job j WHERE j.status = 'PUBLIC' AND j.id = :id")
      @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
      Optional<Job> findByIdPublic(Integer id);

      @Query("""
                      SELECT j.id, j.title, j.budget, j.status, j.postedAt, j.major.name
                      FROM Job j
                      WHERE j.employer.id = :employerId
                      AND (:keyword IS NULL OR LOWER(j.title) LIKE CONCAT('%', LOWER(:keyword), '%'))
                  """)
      Page<Object[]> searchJobsByEmployerIdAndKeyword(@Param("employerId") Integer employerId,
                  @Param("keyword") String keyword, Pageable pageable);

      @Query("""
                      SELECT a.job FROM Apply a
                      WHERE a.freelancer.id = :freelancerId
                        AND a.status = 'ACCEPT' AND a.job.status = 'IN_PROGRESS'
                  """)
      Page<Job> findAcceptedJobsByFreelancer(@Param("freelancerId") Integer freelancerId,
                  Pageable pageable);

      @Query("""
                      SELECT j FROM Job j
                      WHERE j.employer.id = :employerId
                      AND j.status = 'IN_PROGRESS'
                  """)
      Page<Job> findAcceptedJobsByEmployer(@Param("employerId") Integer employerId,
                  Pageable pageable);

      @Query("""
                  SELECT j
                  FROM Job j
                  WHERE j.employer.id = :employerId
                  AND (:keyword IS NULL OR (LOWER(j.title) LIKE CONCAT('%', LOWER(:keyword), '%')) OR LOWER(j.description) LIKE CONCAT('%', LOWER(:keyword), '%'))
                  AND (:status IS NULL OR j.status = :status)
                  """)
      Page<Job> findByEmployerId(@Param("employerId") Integer employerId,
                  @Param("keyword") String keyword, @Param("status") Job.Status status,
                  Pageable pageable);

      @Query("""
                      SELECT j
                      FROM Job j
                      JOIN j.applies a
                      WHERE a.freelancer.id = :freelancerId
                        AND (:keyword IS NULL OR (LOWER(j.title) LIKE CONCAT('%', LOWER(:keyword), '%')) OR LOWER(j.description) LIKE CONCAT('%', LOWER(:keyword), '%'))
                        AND (:status IS NULL OR j.status = :status)
                        AND a.status != 'REJECTED'
                  """)
      Page<Job> findJobsAppliedByFreelancer(@Param("freelancerId") Integer freelancerId,
                  @Param("keyword") String keyword, @Param("status") Job.Status status,
                  Pageable pageable);

      @Query("""
                      SELECT j
                      FROM Job j
                      LEFT JOIN FETCH j.major
                      WHERE j.employer.id = :employerId
                        AND (:keyword IS NULL OR LOWER(j.title) LIKE CONCAT('%', LOWER(:keyword), '%'))
                        AND (:status IS NULL OR j.status = :status)
                  """)
      Page<Job> searchJobsByEmployerIdAndKeywordAndStatus(@Param("employerId") Integer employerId,
                  @Param("keyword") String keyword, @Param("status") Job.Status status,
                  Pageable pageable);

      long countByStatus(Job.Status status);
}
