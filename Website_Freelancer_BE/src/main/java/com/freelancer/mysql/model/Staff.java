package com.freelancer.mysql.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToMany;
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
@DiscriminatorValue("STAFF")
@EqualsAndHashCode(callSuper = true)
public class Staff extends User {
    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY, targetEntity = Permission.class)
    private List<Permission> permissions = new ArrayList<>();

    @OneToMany(mappedBy = "solver", fetch = FetchType.LAZY, targetEntity = Dispute.class)
    private List<Dispute> disputes = new ArrayList<>();

    @OneToMany(mappedBy = "solver", fetch = FetchType.LAZY, targetEntity = Report.class)
    private List<Report> reports = new ArrayList<>();
}
