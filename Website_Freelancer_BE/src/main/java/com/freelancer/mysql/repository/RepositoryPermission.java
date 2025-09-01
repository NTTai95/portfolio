package com.freelancer.mysql.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import com.freelancer.mysql.model.Permission;

public interface RepositoryPermission extends RepositoryBase<Permission, Integer> {
    boolean existsByName(String name);

    @Query(value = "SELECT p.id, p.name, p.description, p.code FROM Permission p")
    List<Object[]> listPermissions();
}
