package com.freelancer.mysql.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("FREELANCER")
public class Freelancer extends Client {
        @Column(columnDefinition = "INT UNSIGNED NOT NULL DEFAULT 0")
        private Integer balance = 0;

        @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Certification.class)
        private List<Certification> certifications = new ArrayList<>();

        @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Education.class)
        private List<Education> educations = new ArrayList<>();

        @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Apply.class)
        private List<Apply> applies = new ArrayList<>();

        @ManyToMany(mappedBy = "freelancers", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        targetEntity = Skill.class)
        private List<Skill> skills = new ArrayList<>();

        @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Review.class)
        private List<Review> reviews = new ArrayList<>();

        @OneToMany(mappedBy = "freelancer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Milestone.class)
        private List<Milestone> milestones = new ArrayList<>();

        @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Contact.class)
        private List<Contact> contacts = new ArrayList<>();

        @ManyToMany(mappedBy = "freelancers", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        targetEntity = Language.class)
        private List<Language> languages = new ArrayList<>();
}
