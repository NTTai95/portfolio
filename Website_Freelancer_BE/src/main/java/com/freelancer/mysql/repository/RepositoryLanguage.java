package com.freelancer.mysql.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Language;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositoryLanguage extends RepositoryBase<Language, Integer> {

        boolean existsByName(String name);

        boolean existsByIso(String iso);

        @Query("""
                        SELECT l.id, l.name, l.iso, l.status, l.createdAt FROM Language l
                        WHERE (:keyword IS NULL OR LOWER(l.name) LIKE CONCAT('%', LOWER(:keyword), '%')
                                OR LOWER(l.iso) LIKE CONCAT('%',LOWER(:keyword),'%'))
                        AND (:status IS NULL OR l.status = :status)
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        Page<Object[]> searchPageLanguage(@Param("keyword") String keyword,
                        @Param("status") Language.Status status, Pageable pageable);

        @Query("SELECT l.id, l.name, l.iso FROM Language l WHERE l.status = 'ACTIVE'")
        List<Object[]> listLanguages();

        @Query("""
                        SELECT s.status, COUNT(s.id) FROM Language s
                        WHERE s.status IN :statuses
                        GROUP BY s.status
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> metaFilterStatus(@Param("statuses") Language.Status[] statuses);

        @Query("""
                        SELECT l.id, COUNT(j.id), l.name
                        FROM Job j
                        JOIN j.languages l
                        WHERE j.status = 'PUBLIC'
                        GROUP BY l.id, l.name
                        """)
        List<Object[]> metaFilterByJobs();

        @Query("""
                        SELECT f.id, f.fullName, f.email, f.status,
                            (SELECT COUNT(l2) FROM Freelancer f2 JOIN f2.languages l2
                            WHERE f2.id = f.id AND l2.id <> :id)
                        FROM Language l
                        JOIN l.freelancers f
                        WHERE l.id = :id
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> findFreelancersImpactByLanguageId(@Param("id") Integer id);

        @Query("""
                        SELECT j.id, j.title, j.status
                        FROM Job j JOIN j.languages l
                        WHERE l.id = :id AND j.status IN ('DRAFT', 'PUBLIC')
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> findActiveJobsUsingSkillByLanguageId(@Param("id") Integer id);

        @Query("""
                        SELECT l FROM Language l
                        JOIN l.freelancers f
                        WHERE f.id = :freelancerId AND l.status = 'ACTIVE'
                        ORDER BY l.name ASC
                        """)
        List<Language> findAllByFreelancerId(@Param("freelancerId") Integer freelancerId);
}
