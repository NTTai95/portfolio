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
@Table(name = "applies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Apply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "TEXT NOT NULL", updatable = false)
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING', 'ACCEPT', 'REJECTED') NOT NULL DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @Check(constraints = "bid_amount >= 10000 AND bid_amount <= 100000000")
    @Column(columnDefinition = "INT UNSIGNED NOT NULL", updatable = false)
    private Integer bidAmount;

    @Check(constraints = "estimated_hours > 0 AND estimated_hours <= 8760")
    @Column(columnDefinition = "INT UNSIGNED NOT NULL", updatable = false)
    private Integer estimatedHours;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Job.class)
    @JoinColumn(name = "job_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_applies_jobs", value = ConstraintMode.CONSTRAINT))
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
    @JoinColumn(name = "freelancer_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_applies_freelancers",
                    value = ConstraintMode.CONSTRAINT))
    private Freelancer freelancer;

    public enum Status {
        PENDING, ACCEPT, REJECTED, WITHDRAWN
    }

    public enum SortField {
        id, bidAmount, estimatedHourst
    }
}
