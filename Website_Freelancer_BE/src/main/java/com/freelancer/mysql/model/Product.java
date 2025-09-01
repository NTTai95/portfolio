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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Check(constraints = "content REGEXP '^(https?://).+'")
    @Column(columnDefinition = "VARCHAR(1020) NOT NULL", updatable = false)
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING','ACCEPT','REJECTED') NOT NULL DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @Column(columnDefinition = "TEXT NULL", updatable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Milestone.class)
    @JoinColumn(name = "milestone_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_products_milestones",
                    value = ConstraintMode.CONSTRAINT))
    private Milestone milestone;

    public enum Status {
        PENDING, ACCEPT, REJECTED
    }
}
