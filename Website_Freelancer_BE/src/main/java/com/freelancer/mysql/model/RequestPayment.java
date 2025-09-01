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
@Table(name = "request_payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Check(constraints = "amount >= 10000 AND amount <= 100000000")
    @Column(columnDefinition = "INT UNSIGNED NOT NULL")
    private Integer amount;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, updatable = false)
    private String bankName;

    @Column(nullable = false, updatable = false)
    private String bankAccountNumber;

    @Column(nullable = false, updatable = false)
    private String accountHolderName;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('PENDING', 'REJECTED', 'ACCEPT') NOT NULL DEFAULT 'PENDING'")
    private Status status = Status.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
    @JoinColumn(name = "freelancer_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_request_payments_users",
                    value = ConstraintMode.CONSTRAINT))
    private Freelancer freelancer;

    public enum Status {
        PENDING, REJECTED, ACCEPT
    }
}
