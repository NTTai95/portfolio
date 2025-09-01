package com.freelancer.mysql.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Contact;

@Repository
public interface RepositoryContact extends RepositoryBase<Contact, Integer> {
        @Query("""
                            SELECT c.id, c.title, c.content, c.status, c.createdAt
                            FROM Contact c
                            WHERE c.user.id = :userId
                            AND (
                                :keyword IS NULL OR
                                LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
                                LOWER(c.content) LIKE LOWER(CONCAT('%', :keyword, '%')))
                        """)
        Page<Object[]> searchContactsByUserIdAndKeyword(@Param("userId") Integer userId,
                        @Param("keyword") String keyword, Pageable pageable);

}
