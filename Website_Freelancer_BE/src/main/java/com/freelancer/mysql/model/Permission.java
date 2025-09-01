package com.freelancer.mysql.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ConstraintMode;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(columnDefinition = "VARCHAR(255) NOT NULL", updatable = false, unique = true)
        private String name;

        @Column(columnDefinition = "VARCHAR(255) NOT NULL", updatable = false, unique = true)
        private String code;

        @Column(columnDefinition = "TEXT NOT NULL", updatable = false)
        private String description;

        @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, targetEntity = Staff.class)
        @JoinTable(name = "permissions_users", joinColumns = @JoinColumn(name = "permission_id",
                        foreignKey = @ForeignKey(name = "fk_permissions_users_permissions",
                                        value = ConstraintMode.CONSTRAINT)),
                        inverseJoinColumns = @JoinColumn(name = "role_id",
                                        foreignKey = @ForeignKey(
                                                        name = "fk_permissions_users_roles",
                                                        value = ConstraintMode.CONSTRAINT)))
        private List<Staff> users = new ArrayList<>();

        @ManyToMany(fetch = FetchType.LAZY, targetEntity = Role.class)
        @JoinTable(name = "permissions_roles", joinColumns = @JoinColumn(name = "permission_id",
                        foreignKey = @ForeignKey(name = "fk_permissions_roles_roles",
                                        value = ConstraintMode.CONSTRAINT)),
                        inverseJoinColumns = @JoinColumn(name = "role_id",
                                        foreignKey = @ForeignKey(
                                                        name = "fk_permissions_roles_permissions",
                                                        value = ConstraintMode.CONSTRAINT)))
        private List<Role> roles = new ArrayList<>();
}
