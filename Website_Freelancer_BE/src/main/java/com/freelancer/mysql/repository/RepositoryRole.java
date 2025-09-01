package com.freelancer.mysql.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Role;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositoryRole extends RepositoryBase<Role, Integer> {
        Optional<Role> findByCode(String name);

        boolean existsByName(String name);

        @Query(value = """
                        SELECT r.id, r.name, r.code, r.description, COUNT(u)
                        FROM Role r LEFT JOIN r.users u
                        WHERE (:keyword IS NULL OR LOWER(r.name) LIKE CONCAT('%', LOWER(:keyword), '%')
                        OR LOWER(r.description) LIKE CONCAT('%', LOWER(:keyword)))
                        AND (r.code NOT IN ('QUAN_TRI', 'FREELANCER','NHA_TUYEN_DUNG'))
                        GROUP BY r.id, r.name, r.description
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        Page<Object[]> searchPageRole(@Param("keyword") String keyword, Pageable pageable);

        @Query(value = "SELECT r.id, r.name, r.code, r.description FROM Role r WHERE r.code NOT IN ('QUAN_TRI', 'FREELANCER','NHA_TUYEN_DUNG')")
        List<Object[]> listRoles();

        @Query("""
                        SELECT r.id, COUNT(c.id), r.name
                        FROM Client c JOIN c.role r
                        GROUP BY r.id, r.name
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> metaFilterByClients();

        @Query("""
                        SELECT r.id, COUNT(s.id), r.name
                        FROM Staff s JOIN s.role r
                        GROUP BY r.id, r.name
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        List<Object[]> metaFilterByStaffs();

        @Query("""
                            SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
                            FROM Staff s JOIN s.role r
                            WHERE r.id = :id
                        """)
        @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
        boolean existsUsersByRoleId(@Param("id") Integer id);

        @Query("""
                            SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END
                            FROM User u JOIN u.role r
                            WHERE r.id = :id
                              AND r.code IN ('QUAN_TRI', 'FREELANCER', 'NHA_TUYEN_DUNG')
                        """)
        boolean isFixedRoleByRoleId(@Param("id") Integer id);


}
