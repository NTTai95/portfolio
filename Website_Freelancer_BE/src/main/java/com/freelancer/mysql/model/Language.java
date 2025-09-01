package com.freelancer.mysql.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "languages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Language extends ModelBase {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(columnDefinition = "VARCHAR(50) NOT NULL", unique = true)
        private String name;

        @Column(columnDefinition = "CHAR(2) NOT NULL", unique = true)
        private String iso;

        @Column(columnDefinition = "ENUM('ACTIVE', 'INVALID') NOT NULL DEFAULT 'ACTIVE'")
        @Enumerated(EnumType.STRING)
        private Status status = Status.ACTIVE;

        @CreationTimestamp
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @ManyToMany(fetch = FetchType.LAZY, targetEntity = Job.class)
        @JoinTable(name = "languages_jobs", joinColumns = @JoinColumn(name = "language_id",
                        foreignKey = @ForeignKey(name = "fk_languages_jobs_languages",
                                        value = ConstraintMode.CONSTRAINT)),
                        inverseJoinColumns = @JoinColumn(name = "job_id",
                                        foreignKey = @ForeignKey(name = "fk_languages_jobs_jobs",
                                                        value = ConstraintMode.CONSTRAINT)),
                        uniqueConstraints = @UniqueConstraint(name = "uk_languages_jobs",
                                        columnNames = {"language_id", "job_id"}))
        private List<Job> jobs = new ArrayList<>();

        @ManyToMany(fetch = FetchType.LAZY, targetEntity = Freelancer.class)
        @JoinTable(name = "languages_users", joinColumns = @JoinColumn(name = "language_id",
                        foreignKey = @ForeignKey(name = "fk_languages_users_languages",
                                        value = ConstraintMode.CONSTRAINT)),
                        inverseJoinColumns = @JoinColumn(name = "user_id",
                                        foreignKey = @ForeignKey(name = "fk_languages_users_users",
                                                        value = ConstraintMode.CONSTRAINT)),
                        uniqueConstraints = @UniqueConstraint(name = "uk_languages_users",
                                        columnNames = {"language_id", "user_id"}))
        private List<Freelancer> freelancers = new ArrayList<>();

        public enum Status {
                ACTIVE, INVALID
        }

        public enum SortField {
                name, iso, createdAt
        }
}
