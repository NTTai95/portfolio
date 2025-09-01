package com.freelancer.mysql.model;

import java.time.LocalDateTime;
import org.hibernate.annotations.Check;
import org.hibernate.annotations.CreationTimestamp;
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
@Table(name = "history_banlaces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryBanlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Check(constraints = "change_amount != 0")
    @Column(columnDefinition = "INT NOT NULL", updatable = false)
    private Integer changeAmount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, targetEntity = Freelancer.class)
    @JoinColumn(name = "freelancer_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_history_banlaces_users",
                    value = ConstraintMode.CONSTRAINT))
    private Freelancer freelancer;
}
