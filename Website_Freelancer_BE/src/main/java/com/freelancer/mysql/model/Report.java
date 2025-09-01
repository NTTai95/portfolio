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
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "resolved_at >= created_at")
@Check(constraints = "reporter_id != solver_id")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL", updatable = false)
    private String title;

    @Column(columnDefinition = "TEXT NOT NULL", updatable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING', 'REJECTED', 'ACCEPT', 'RECALL') NOT NULL DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('JOB', 'USER', 'APLLY', 'STAGE', 'PRODUCT', 'EVALUATION') NOT NULL",
            updatable = false)
    private Type type;

    @Check(constraints = "object_report_id > 0")
    @Column(columnDefinition = "INT UNSIGNED NOT NULL", updatable = false)
    private Integer objectReportId;

    @CreationTimestamp
    @Column(columnDefinition = "DATETIME NOT NULL", updatable = false)
    private LocalDateTime createdAt;

    @Column(columnDefinition = "DATETIME NULL")
    private LocalDateTime resolvedAt;

    @Column(columnDefinition = "TEXT NULL", updatable = false)
    private String feedback;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Client.class)
    @JoinColumn(name = "reporter_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_reports_users_reporter",
                    value = ConstraintMode.CONSTRAINT))
    private Client reporter;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Staff.class)
    @JoinColumn(name = "solver_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_reports_users_solver",
                    value = ConstraintMode.CONSTRAINT))
    private Staff solver;

    public enum Status {
        PENDING, REJECTED, ACCEPT, RECALL
    }

    public enum Type {
        JOB, USER, APLLY, STAGE, PRODUCT, EVALUATION
    }
}
