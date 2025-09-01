package com.freelancer.mysql.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Major;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositoryMajor extends RepositoryBase<Major, Integer> {
    boolean existsByName(String name);

    @Query(value = """
            SELECT m.id, m.name, m.description, m.status, m.createdAt, COUNT(s)
            FROM Major m LEFT JOIN m.skills s
            WHERE (:keyword IS NULL OR LOWER(m.name) LIKE CONCAT('%',LOWER(:keyword),'%')
                    OR LOWER(m.description) LIKE CONCAT('%',LOWER(:keyword),'%'))
            AND (:status IS NULL OR m.status = :status)
            GROUP BY m.id, m.name, m.description, m.status, m.createdAt
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    Page<Object[]> searchPageMajor(@Param("keyword") String keyword,
            @Param("status") Major.Status status, Pageable pageable);

    @Query(value = """
            SELECT m.id, COUNT(s), m.name
            FROM Major m LEFT JOIN m.skills s
            GROUP BY m.id, m.name
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Object[]> metaFilterBySkills();

    @Query(value = "SELECT m.id, m.name, m.description FROM Major m WHERE m.status = 'ACTIVE'")
    List<Object[]> listMajors();

    @Query("""
            SELECT s.status, COUNT(s.id) FROM Major s
            WHERE s.status IN :statuses
            GROUP BY s.status
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Object[]> metaFilterStatus(@Param("statuses") Major.Status[] statuses);

    @Query("""
            SELECT m.id, COUNT(j.id), m.name
            FROM Job j JOIN j.major m
            WHERE j.status = 'PUBLIC'
            GROUP BY m.id, m.name
            """)
    List<Object[]> metaFilterByJobs();

    @Query("""
                SELECT s.id, s.name, s.status
                FROM Major m JOIN m.skills s
                WHERE m.id = :id
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Object[]> findSkillsUsingMajorByMajorId(@Param("id") Integer id);

    @Query("""
                SELECT j.id, j.title, j.status
                FROM Job j JOIN j.major m
                WHERE m.id = :id AND j.status IN ('DRAFT', 'PUBLIC')
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Object[]> findActiveJobsUsingMajorByMajorId(@Param("id") Integer id);

    @Query(value = """
                SELECT m.id, m.name, m.description, COUNT(j)
                FROM Major m
                JOIN m.jobs j
                GROUP BY m.id, m.name, m.description
                ORDER BY COUNT(j) DESC
            """)
    List<Object[]> listMostMajors(Pageable pageable);

    @Query("""
                SELECT m FROM Major m
                LEFT JOIN m.jobs j
                WHERE m.status = 'ACTIVE'
                GROUP BY m
                ORDER BY COUNT(j) DESC
            """)
    List<Major> findTop8ByJobCount(Pageable pageable);

}
