package com.freelancer.mysql.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("EMPLOYER")
@EqualsAndHashCode(callSuper = true)
public class Employer extends Client {
        @OneToMany(mappedBy = "employer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Job.class)
        private List<Job> jobs = new ArrayList<>();

        @OneToMany(mappedBy = "employer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Review.class)
        private List<Review> reviews = new ArrayList<>();

        @OneToMany(mappedBy = "employer", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Milestone.class)
        private List<Milestone> milestones = new ArrayList<>();

        @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true, targetEntity = Contact.class)
        private List<Contact> contacts = new ArrayList<>();
}
