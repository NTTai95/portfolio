package com.freelancer.mysql.model;

import java.time.LocalDateTime;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Review {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(columnDefinition = "TEXT NULL")
        private String freelancerContent;

        @Check(constraints = "freelancer_rating IS NULL OR (freelancer_rating >= 1 AND freelancer_rating <= 5)")
        @Column(columnDefinition = "INT NULL")
        private Integer freelancerRating;

        @Column(columnDefinition = "TEXT NULL")
        private String employerContent;

        @Check(constraints = "employer_rating IS NULL OR (employer_rating >= 1 AND employer_rating <= 5)")
        @Column(columnDefinition = "INT NULL")
        private Integer employerRating;

        @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT FALSE")
        private Boolean freelancerRated = false;

        @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT FALSE")
        private Boolean employerRated = false;

        @CreationTimestamp
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @OneToOne(mappedBy = "review", fetch = FetchType.LAZY)
        private Job job;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
        @JoinColumn(name = "freelancer_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_reviews_freelancers",
                                        value = ConstraintMode.CONSTRAINT))
        private Freelancer freelancer;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Employer.class)
        @JoinColumn(name = "employer_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_reviews_employers",
                                        value = ConstraintMode.CONSTRAINT))
        private Employer employer;

        public enum SortField {
                id, employerRating, freelancerRating
        }

}
