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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Skill extends ModelBase {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(columnDefinition = "VARCHAR(255) NOT NULL", unique = true)
        private String name;

        @Column(columnDefinition = "TEXT NOT NULL")
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false,
                        columnDefinition = "ENUM('ACTIVE', 'INVALID') NOT NULL DEFAULT 'ACTIVE'")
        private Status status = Status.ACTIVE;

        @CreationTimestamp
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Major.class)
        @JoinColumn(name = "major_id", nullable = false,
                        foreignKey = @ForeignKey(name = "fk_skills_majors",
                                        value = ConstraintMode.CONSTRAINT))
        private Major major;

        @ManyToMany(fetch = FetchType.LAZY, targetEntity = Job.class)
        @JoinTable(name = "skills_jobs",
                        joinColumns = @JoinColumn(name = "skill_id",
                                        foreignKey = @ForeignKey(name = "fk_skills_jobs_skills",
                                                        value = ConstraintMode.CONSTRAINT)),
                        inverseJoinColumns = @JoinColumn(name = "job_id",
                                        foreignKey = @ForeignKey(name = "fk_skills_jobs_jobs",
                                                        value = ConstraintMode.CONSTRAINT)),
                        uniqueConstraints = @UniqueConstraint(name = "uk_skills_jobs",
                                        columnNames = {"skill_id", "job_id"}))
        private List<Job> jobs = new ArrayList<>();

        @ManyToMany(fetch = FetchType.LAZY, targetEntity = Freelancer.class)
        @JoinTable(name = "skills_freelancers", joinColumns = @JoinColumn(name = "skill_id",
                        foreignKey = @ForeignKey(name = "fk_skills_freelancers_skills",
                                        value = ConstraintMode.CONSTRAINT)),
                        inverseJoinColumns = @JoinColumn(name = "freelancer_id",
                                        foreignKey = @ForeignKey(
                                                        name = "fk_skills_freelancers_freelancers",
                                                        value = ConstraintMode.CONSTRAINT)),
                        uniqueConstraints = @UniqueConstraint(name = "uk_skills_freelancers",
                                        columnNames = {"skill_id", "freelancer_id"}))
        private List<Freelancer> freelancers = new ArrayList<>();

        public enum Status {
                ACTIVE, INVALID
        }

        public enum SortField {
                id, name, createdAt
        }
}
