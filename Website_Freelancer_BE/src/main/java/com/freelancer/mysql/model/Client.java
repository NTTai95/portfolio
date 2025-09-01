package com.freelancer.mysql.model;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.Check;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public abstract class Client extends User {
        @Check(constraints = "avatar REGEXP '^(https?://).+'")
        @Column(columnDefinition = "VARCHAR(1020) NOT NULL DEFAULT 'https://res.cloudinary.com/dzrds49tb/image/upload/v1738941978/avatarDefaul.jpg'")
        private String avatar =
                        "https://res.cloudinary.com/dzrds49tb/image/upload/v1738941978/avatarDefaul.jpg";

        @Column(columnDefinition = "BOOLEAN NOT NULL DEFAULT TRUE")
        private Boolean isMale = true;

        @Column(columnDefinition = "INT UNSIGNED NOT NULL DEFAULT 0")
        private Integer reputation = 0;

        @Column(columnDefinition = "TEXT NULL")
        private String bio;

        @OneToMany(mappedBy = "reporter", fetch = FetchType.LAZY, cascade = CascadeType.ALL,
                        orphanRemoval = true)
        private List<Report> reports = new ArrayList<>();
}
