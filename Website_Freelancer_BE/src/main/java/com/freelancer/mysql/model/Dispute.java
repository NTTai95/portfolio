package com.freelancer.mysql.model;

import java.time.LocalDateTime;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "disputes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "resolved_at IS NULL OR (resolved_at > created_at)")
public class Dispute {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(columnDefinition = "BOOLEAN NOT NULL", updatable = false)
        private Boolean employerSues;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false,
                        columnDefinition = "ENUM('OPEN', 'PROCESSING', 'RESOLVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'OPEN'")
        private Status status = Status.OPEN;

        @Column(columnDefinition = "TEXT NOT NULL", updatable = false)
        private String reason;

        @Column(columnDefinition = "TEXT NULL")
        private String resolution;

        @CreationTimestamp
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @Column(columnDefinition = "DATETIME NULL")
        private LocalDateTime resolvedAt;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Milestone.class)
        @JoinColumn(name = "milestone_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_disputes_milestones",
                                        value = ConstraintMode.CONSTRAINT))
        private Milestone milestone;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Staff.class)
        @JoinColumn(name = "solver_id", foreignKey = @ForeignKey(name = "fk_disputes_users",
                        value = ConstraintMode.CONSTRAINT))
        private Staff solver;

        public enum Status {
                OPEN, PROCESSING, RESOLVED, REJECTED, CANCELLED
        }
}
