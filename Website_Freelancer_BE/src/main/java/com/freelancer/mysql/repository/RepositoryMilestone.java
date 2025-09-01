package com.freelancer.mysql.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Milestone;

@Repository
public interface RepositoryMilestone extends RepositoryBase<Milestone, Integer> {
    @Query("""
                SELECT m.id, m.content, m.status, m.percent, m.disputed, m.isOverdue,
                       m.startAt, m.endAt, j.title, f.fullName
                FROM Milestone m
                JOIN m.job j
                JOIN m.freelancer f
                WHERE m.employer.id = :employerId
                  AND (
                      :keyword IS NULL OR
                      LOWER(m.content) LIKE CONCAT('%', LOWER(:keyword), '%') OR
                      LOWER(j.title) LIKE CONCAT('%', LOWER(:keyword), '%') OR
                      LOWER(f.fullName) LIKE CONCAT('%', LOWER(:keyword), '%') OR
                      LOWER(f.status) LIKE CONCAT('%', LOWER(:keyword), '%'))                
            """)
    Page<Object[]> searchMilestonesByEmployerIdAndKeyword(
            @Param("employerId") Integer employerId,
            @Param("keyword") String keyword,
        
            Pageable pageable);

  List<Milestone> findByJobId(Integer jobId);

  List<Milestone> findByFreelancerId(Integer freelancerId);
  List<Milestone> findByFreelancerIdAndJobId(Integer freelancerId, Integer jobId);

  @Query("SELECT SUM(m.percent) FROM Milestone m WHERE m.job.id = :jobId")
  Integer totalPercentByJobId(Integer jobId);
}