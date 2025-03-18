package com.freelancer.model.ids;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FreelancerLanguageId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "FreelancerId")
    Integer freelancerId;

    @Column(name = "LanguageId")
    Integer languageId;
}
