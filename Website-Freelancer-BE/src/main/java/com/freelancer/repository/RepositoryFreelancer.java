package com.freelancer.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.freelancer.model.Freelancer;

@Repository
public interface RepositoryFreelancer extends RepositoryEntity<Freelancer, Integer> {
	public Optional<Freelancer> findByProfile_Account_Id(Integer id);
	
	@Query("""
		    SELECT new map(p.fullName as name, p.avatar as avatar ,COUNT(a) as total)
		    FROM Freelancer f
		    JOIN f.profile p
		    LEFT JOIN f.applies a
		    GROUP BY p.fullName, p.avatar
		    ORDER BY COUNT(a) DESC
		""")
List<Map<String,Object>> findTop10Freelancer(Pageable pageable);
}
