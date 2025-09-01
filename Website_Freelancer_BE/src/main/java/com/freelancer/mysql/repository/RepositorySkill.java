package com.freelancer.mysql.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Skill;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositorySkill extends RepositoryBase<Skill, Integer> {

        boolean existsByName(String name);

        @Query("""
                        SELECT s.id, s.name, s.description, s.status, s.createdAt, s.major.name FROM Skill s
                        WHERE (:keyword IS NULL OR LOWER(s.name) LIKE CONCAT('%', LOWER(:keyword),'%')
                                OR LOWER(s.description) LIKE CONCAT('%', LOWER(:keyword),'%'))
                        AND (:status IS NULL OR s.status = :status)
                        AND (:majorId IS NULL OR s.major.id = :majorId)
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        Page<Object[]> searchPageSkill(@Param("keyword") String keyword,
                        @Param("majorId") Integer majorId, @Param("status") Skill.Status status,
                        Pageable pageable);

        @Query("""
                        SELECT s.status, COUNT(s.id) FROM Skill s
                        WHERE s.status IN :statuses
                        GROUP BY s.status
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> metaFilterStatus(@Param("statuses") Skill.Status[] statuses);

        @Query("""
                        SELECT s.id, COUNT(j.id), s.name
                        FROM Job j JOIN j.skills s
                        WHERE j.status = 'PUBLIC'
                        GROUP BY s.id, s.name 
                        """)
        List<Object[]> metaFilterByJobs();

        @Query("SELECT s.id, s.name, s.description FROM Skill s WHERE s.status = 'ACTIVE'")
        List<Object[]> listSkills();

        @Query("""
                            SELECT f.id, f.fullName, f.email, f.status,
                                (SELECT COUNT(s2) FROM Freelancer f2 JOIN f2.skills s2
                                WHERE f2.id = f.id AND s2.id <> :id)
                            FROM Skill s
                            JOIN s.freelancers f
                            WHERE s.id = :id
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> findFreelancersImpactBySkillId(@Param("id") Integer id);

        @Query("""
                        SELECT j.id, j.title, j.status
                        FROM Job j JOIN j.skills s
                        WHERE s.id = :id AND j.status IN ('DRAFT', 'PUBLIC')
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> findActiveJobsUsingSkillBySkillId(@Param("id") Integer id);
}
