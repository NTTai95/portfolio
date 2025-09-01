package com.freelancer.mysql.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.model.Staff;
import com.freelancer.mysql.model.User;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositoryStaff extends RepositoryBase<Staff, Integer> {
    Optional<Staff> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByRole_Name(String name);

    List<Staff> findByRole_Name(String name);

    @Query("SELECT s FROM Staff s LEFT JOIN FETCH s.permissions WHERE s.id = :id")
    Optional<Staff> findByIdWithPermissions(@Param("id") Integer id);

    @Query("""
            SELECT s.status, COUNT(s.id) FROM Staff s
            WHERE s.status IN :statuses
            GROUP BY s.status
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Object[]> metaFilterStatus(@Param("statuses") Client.Status[] statuses);

    @Query("""
            SELECT s.id, null, s.fullName, s.email, s.status, s.joinedAt, null, s.birthday, r.id, r.name, r.code
            FROM Staff s LEFT JOIN s.role r
            WHERE (:keyword IS NULL OR LOWER(s.fullName) LIKE CONCAT('%', LOWER(:keyword), '%')
                OR LOWER(s.email) LIKE CONCAT('%', LOWER(:keyword), '%'))
            AND (:roleId IS NULL OR s.role.id = :roleId)
            AND (:status IS NULL OR s.status = :status)
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    Page<Object[]> searchStaffPage(String keyword, Integer roleId, User.Status status,
            Pageable pageable);

}
