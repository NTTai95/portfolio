package com.freelancer.mysql.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface RepositoryBase<M, ID> extends JpaRepository<M, ID>, JpaSpecificationExecutor<M> {
    Long countByIdIn(List<ID> ids);
}
