package com.freelancer.mysql.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.freelancer.mysql.model.Freelancer;

@Repository
public interface RepositoryFreelancer extends RepositoryBase<Freelancer, Integer> {
    Optional<Freelancer> findByEmail(String email);
    @Query("""
            SELECT f FROM Freelancer f ORDER BY f.reputation DESC
            """)
    List<Freelancer> findTop5ByReputation(Pageable pageable);

}
