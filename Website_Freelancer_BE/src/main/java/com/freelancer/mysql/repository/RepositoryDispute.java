package com.freelancer.mysql.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Dispute;

@Repository
public interface RepositoryDispute extends RepositoryBase<Dispute, Integer> {
    Page<Dispute> findByStatus(Dispute.Status status, Pageable pageable);

}
