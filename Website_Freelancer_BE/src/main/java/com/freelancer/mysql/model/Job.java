package com.freelancer.mysql.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Check(constraints = "budget >= 10000 AND budget <= 100000000")
        @Column(columnDefinition = "INT UNSIGNED NULL")
        private Integer budget;

        @CreationTimestamp
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @Column(columnDefinition = "DATETIME NULL")
        private LocalDateTime postedAt;

        @Column(columnDefinition = "TEXT NULL")
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(columnDefinition = "ENUM('DRAFT', 'PUBLIC', 'PRIVATE', 'PREPARING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'DRAFT'")
        private Status status = Status.DRAFT;

        @Column(columnDefinition = "VARCHAR(200) NULL")
        private String title;

        @Column(columnDefinition = "DATETIME NULL")
        private LocalDateTime closedAt;

        @Check(constraints = "duration_hours > 0 AND duration_hours <= 8760")
        @Column(columnDefinition = "INT UNSIGNED NULL")
        private Integer durationHours;

        @Check(constraints = "document REGEXP '^(https?://).+'")
        @Column(columnDefinition = "VARCHAR(1020) NULL")
        private String document;

        @Check(constraints = "step > 0 AND step < 5")
        @Column(columnDefinition = "INT UNSIGNED NOT NULL DEFAULT 1")
        private Integer step = 1;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Employer.class)
        @JoinColumn(name = "employer_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_jobs_employers",
                                        value = ConstraintMode.CONSTRAINT))
        private Employer employer;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "major_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_jobs_majors",
                                        value = ConstraintMode.CONSTRAINT))
        private Major major;

        @OneToMany(mappedBy = "job", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true)
        private List<Milestone> milestones = new ArrayList<>();

        @OneToMany(mappedBy = "job", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true)
        private List<Apply> applies = new ArrayList<>();

        @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "review_id", foreignKey = @ForeignKey(name = "fk_jobs_reviews",
                        value = ConstraintMode.CONSTRAINT))
        private Review review;

        @ManyToMany(mappedBy = "jobs", fetch = FetchType.LAZY, targetEntity = Skill.class)
        private List<Skill> skills = new ArrayList<>();

        @ManyToMany(mappedBy = "jobs", fetch = FetchType.LAZY, targetEntity = Language.class)
        private List<Language> languages = new ArrayList<>();

        public enum Status {
                DRAFT, PUBLIC, PRIVATE, ACTIVE, COMPLETED, CANCELED, IN_PROGRESS, PREPARING
        }

        public boolean isValid() {
                return getBudget() != null && getClosedAt() != null && getDescription() != null
                                && getDurationHours() != null && getLanguages() != null
                                && !getLanguages().isEmpty() && getSkills() != null
                                && !getSkills().isEmpty() && getTitle() != null
                                && !getTitle().isEmpty() && getMajor() != null;
        }

        public enum SortField {
                id, budget, durationHours, postedAt, closedAt
        }
}
