package com.freelancer.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.freelancer.model.Recruiter;

import jakarta.persistence.Tuple;

@Repository
public interface RepositoryRecruiter
		extends
			RepositoryEntity<Recruiter, Integer> {

	public Optional<Recruiter> findByProfile_Account_Id(Integer id);

	@Query("""
			    SELECT new map(p.fullName as name, p.avatar as avatar ,COUNT(j) as total)
			    FROM Recruiter r
			    JOIN r.profile p
			    LEFT JOIN r.jobPosts j
			    GROUP BY p.fullName, p.avatar
			    ORDER BY COUNT(j) DESC
			""")
	List<Map<String,Object>> findTop10Recruiters(Pageable pageable);

}
