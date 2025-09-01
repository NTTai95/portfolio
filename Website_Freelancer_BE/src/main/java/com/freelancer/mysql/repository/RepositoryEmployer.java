package com.freelancer.mysql.repository;

import java.util.Optional;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Employer;

@Repository
public interface RepositoryEmployer extends RepositoryBase<Employer, Integer> {
        Optional<Employer> findByEmail(String email);
}
