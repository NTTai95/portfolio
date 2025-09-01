package com.freelancer.mysql.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.freelancer.mysql.model.Review;

@Repository
public interface RepositoryReview extends RepositoryBase<Review, Integer> {
        @Query("""
                        SELECT r.id, r.employerContent, r.employerRating, r.createdAt,
                               f.fullName, j.title
                        FROM Review r
                        JOIN r.freelancer f
                        JOIN r.job j
                        WHERE r.employer.id = :employerId
                          AND (:keyword IS NULL OR LOWER(f.fullName) LIKE CONCAT('%', LOWER(:keyword), '%') OR LOWER(r.employerContent) LIKE CONCAT('%', LOWER(:keyword), '%'))
                        """)
        Page<Object[]> searchReviewsByEmployerIdAndKeyword(@Param("employerId") Integer employerId,
                        @Param("keyword") String keyword, Pageable pageable);

        @Query("""
                            SELECT r.id,
                                CASE WHEN u.role.code = 'FREELANCER' THEN r.freelancerContent ELSE r.employerContent END,
                                CASE WHEN u.role.code = 'FREELANCER' THEN r.freelancerRating ELSE r.employerRating END,
                                CASE WHEN u.role.code = 'FREELANCER' THEN r.employerContent ELSE r.freelancerContent END,
                                CASE WHEN u.role.code = 'FREELANCER' THEN r.employerRating ELSE r.freelancerRating END,
                                j.id,
                                j.title,
                                CASE WHEN u.role.code = 'FREELANCER' THEN r.employer.fullName ELSE r.freelancer.fullName END,
                                CASE WHEN u.role.code = 'FREELANCER' THEN r.employer.id ELSE r.freelancer.id END
                            FROM Review r
                            JOIN r.job j
                            JOIN User u ON u.id = :clientId
                            WHERE (r.freelancer.id = :clientId OR r.employer.id = :clientId)
                              AND (:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
                        """)
        Page<Object[]> searchPageReviews(@Param("clientId") Integer clientId,
                        @Param("keyword") String keyword, Pageable pageable);

        @Query("""
                        SELECT
                                SUM(CASE WHEN r.freelancerRating IS NOT NULL THEN 1 ELSE 0 END) +
                                SUM(CASE WHEN r.employerRating IS NOT NULL THEN 1 ELSE 0 END),
                                SUM(CASE WHEN r.freelancerRating >= 4 THEN 1 ELSE 0 END) +
                                SUM(CASE WHEN r.employerRating >= 4 THEN 1 ELSE 0 END),
                                COALESCE(SUM(CASE WHEN r.freelancerRating >= 4 THEN 1 ELSE 0 END), 0),
                                COALESCE(SUM(CASE WHEN r.employerRating >= 4 THEN 1 ELSE 0 END), 0),
                                SUM(CASE WHEN r.freelancerRating IS NOT NULL THEN 1 ELSE 0 END),
                                SUM(CASE WHEN r.employerRating IS NOT NULL THEN 1 ELSE 0 END)
                        FROM Review r
                                """)
        Object getSatisfactionStats();


}
