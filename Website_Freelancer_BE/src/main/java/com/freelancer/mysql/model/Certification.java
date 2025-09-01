package com.freelancer.mysql.model;

import java.time.LocalDate;
import org.hibernate.annotations.Check;
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
@Table(name = "certifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "issue_date < expiry_date")
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String name;

    @Column(columnDefinition = "VARCHAR(255) NOT NULL")
    private String issueBy;

    @Column(columnDefinition = "DATE NOT NULL")
    private LocalDate issueDate;

    @Column(columnDefinition = "DATE NULL")
    private LocalDate expiryDate;

    @Check(constraints = "link REGEXP '^(https?://).+'")
    @Column(columnDefinition = "VARCHAR(1020) NULL")
    private String link;

    @Check(constraints = "front_image REGEXP '^(https?://).+'")
    @Column(columnDefinition = "VARCHAR(1020) NULL")
    private String frontImage;

    @Check(constraints = "back_image REGEXP '^(https?://).+'")
    @Column(columnDefinition = "VARCHAR(1020) NULL")
    private String backImage;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('ACTIVE','EXPIRED') NOT NULL DEFAULT 'ACTIVE'")
    private Status status = Status.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
    @JoinColumn(name = "freelancer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_certifications_users", value = ConstraintMode.CONSTRAINT))
    private Freelancer freelancer;

    public enum Status {
        ACTIVE, EXPIRED
    }

    public enum SortField {
        name, issueDate, expiryDate, status
    }

}
