package com.freelancer.mysql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Education;

@Repository
public interface RepositoryEducation extends RepositoryBase<Education, Integer> {

    @Query("""
                SELECT e FROM Education e
                WHERE e.freelancer.id = :freelancerId
            """)
    List<Education> findAllByFreelancerId(@Param("freelancerId") Integer freelancerId);

}