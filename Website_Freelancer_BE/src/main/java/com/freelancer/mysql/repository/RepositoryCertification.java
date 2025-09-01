package com.freelancer.mysql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Certification;

@Repository
public interface RepositoryCertification extends RepositoryBase<Certification, Integer> {

  @Query("""
          SELECT c FROM Certification c
          WHERE c.freelancer.id = :freelancerId
          ORDER BY c.issueDate DESC
      """)
  List<Certification> findAllByFreelancerId(@Param("freelancerId") Integer freelancerId);

}