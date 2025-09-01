package com.freelancer.mysql.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.model.User;
import jakarta.persistence.QueryHint;

@Repository
public interface RepositoryClient extends RepositoryBase<Client, Integer> {
    @Query("""
            SELECT c.status, COUNT(c.id) FROM Client c
            WHERE c.status IN :statuses AND c.role.code IN ('NHA_TUYEN_DUNG','FREELANCER')
            GROUP BY c.status
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    List<Object[]> metaFilterStatus(@Param("statuses") Client.Status[] statuses);

    @Query("""
            SELECT c.id, c.avatar, c.fullName, c.email, c.status, c.joinedAt, c.isMale, c.birthday, r.id, r.name, r.code
            FROM Client c LEFT JOIN c.role r
            WHERE (:keyword IS NULL OR LOWER(c.fullName) LIKE CONCAT('%', LOWER(:keyword), '%')
                OR LOWER(c.email) LIKE CONCAT('%', LOWER(:keyword), '%'))
            AND (:roleId IS NULL OR c.role.id = :roleId)
            AND (:status IS NULL OR c.status = :status)
            """)
    @QueryHints(@QueryHint(name = "org.hibernate.readOnly", value = "true"))
    Page<Object[]> searchClientPage(String keyword, Integer roleId, User.Status status,
            Pageable pageable);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM Client u WHERE u.id IN :ids")
    List<Client> findByIdIn(@Param("ids") List<Integer> ids);
}
