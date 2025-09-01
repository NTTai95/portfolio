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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "milestones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Milestone {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Enumerated(EnumType.STRING)
        @Column(columnDefinition = "ENUM('DISPUTE', 'UNPAID', 'DOING', 'PENDING','REJECTED','DONE', 'REVIEWING', 'DRAFT' ) NOT NULL DEFAULT 'DRAFT'")
        private Status status = Status.PENDING;

        @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT FALSE")
        private Boolean isOverdue = false;

        @Check(constraints = "percent >= 1 AND percent <= 100")
        @Column(columnDefinition = "TINYINT UNSIGNED NOT NULL")
        private Byte percent;

        @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT FALSE")
        private Boolean disputed = false;

        @Column(columnDefinition = "TEXT NOT NULL")
        private String content;

        @Column(columnDefinition = "DATETIME NOT NULL")
        private LocalDateTime startAt;

        @Column(columnDefinition = "DATETIME NOT NULL")
        private LocalDateTime endAt;

        @Column(columnDefinition = "DATETIME DEFAULT NULL")
        private LocalDateTime fundedAt = null;

        @Column(columnDefinition = "DATETIME DEFAULT NULL")
        private LocalDateTime disburseAt = null;

        @CreationTimestamp
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @Check(constraints = "document REGEXP '^(https?://).+'")
        @Column(columnDefinition = "VARCHAR(1020) NULL")
        private String document;

        @Column(columnDefinition = "INT UNSIGNED DEFAULT NULL")
        private Integer bidAmount = null;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Job.class)
        @JoinColumn(name = "job_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_milestone_job_id",
                                        value = ConstraintMode.CONSTRAINT))
        private Job job;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
        @JoinColumn(name = "freelancer_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_milestone_user_id",
                                        value = ConstraintMode.CONSTRAINT))
        private Freelancer freelancer;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Employer.class)
        @JoinColumn(name = "employer_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_milestone_employer_id",
                                        value = ConstraintMode.CONSTRAINT))
        private Employer employer;

        @OneToMany(mappedBy = "milestone", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true)
        private List<Product> products = new ArrayList<>();

        @OneToMany(mappedBy = "milestone", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true)
        private List<Dispute> disputes = new ArrayList<>();

        public enum Status {
                DISPUTE, UNPAID, DOING, PENDING, REJECTED, DONE, REVIEWING, DRAFT
        }

        public enum SortField {
                id, createdAt, percent, status
        }
}
