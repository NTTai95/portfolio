package com.freelancer.mysql.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.freelancer.mysql.model.Report;

@Repository
public interface RepositoryReport extends RepositoryBase<Report, Integer> {

    @Query("""
                SELECT r FROM Report r
                WHERE r.type = 'JOB'
                AND (:status IS NULL OR r.status = :status)
            """)
    Page<Report> findByTypeJobAndStatus(
            @Param("status") Report.Status status,
            Pageable pageable);
}