package com.freelancer.mysql.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Apply;

@Repository
public interface RepositoryApply extends RepositoryBase<Apply, Integer> {
    boolean existsByFreelancer_IdAndJob_Id(Integer freelancerId, Integer jobId);

    List<Apply> findByJobId(Integer jobId);

    List<Apply> findByFreelancer_Id(Integer freelancerId);

    @Query("""
                SELECT a.id, j.id, j.title, a.createdAt, j.budget, a.bidAmount, j.durationHours, a.estimatedHours, a.status
                FROM Apply a
                JOIN a.job j
                WHERE (:keyword IS NULL OR LOWER(j.title) LIKE CONCAT('%', LOWER(:keyword), '%'))
                AND (:status IS NULL OR a.status = :status)
                AND a.freelancer.id = :freelancerId
            """)
    Page<Object[]> searchPageApplies(@Param("freelancerId") Integer freelancerId,
            @Param("keyword") String keyword, @Param("status") Apply.Status status,
            Pageable pageable);

    Optional<Apply> findByJobIdAndFreelancerId(Integer jobId, Integer freelancerId);

}
