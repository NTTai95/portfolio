package com.freelancer.mysql.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.User;

@Repository
public interface RepositoryUser extends RepositoryBase<User, Integer> {
    @Query("SELECT u FROM User u " + "JOIN FETCH u.role r " + "LEFT JOIN FETCH r.permissions "
            + "WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    @Query("SELECT u FROM User u WHERE u.id IN :ids")
    List<User> findByIdIn(@Param("ids") List<Integer> ids);
}
