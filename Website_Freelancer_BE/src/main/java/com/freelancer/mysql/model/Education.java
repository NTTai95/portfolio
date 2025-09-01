package com.freelancer.mysql.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import org.hibernate.annotations.Check;
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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "educations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Check(constraints = "start_date < end_date")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(512) NOT NULL")
    private String schoolName;

    @Column(columnDefinition = "VARCHAR(512) NOT NULL")
    private String degree;

    @Column(columnDefinition = "VARCHAR(512) NOT NULL")
    private String major;

    @Check(constraints = "gpa >= 0.0 AND gpa <= 10.0")
    @Column(columnDefinition = "DECIMAL(4,2) UNSIGNED NOT NULL")
    private BigDecimal gpa;

    @Column(columnDefinition = "DATE NOT NULL")
    private LocalDate startDate;

    @Column(columnDefinition = "DATE NULL")
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT NULL")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
    @JoinColumn(name = "freelancer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_educations_users", value = ConstraintMode.CONSTRAINT))
    private Freelancer freelancer;

    public enum SortField {
        schoolName,
        degree,
        major,
        gpa,
        startDate,
        endDate
    }
}
