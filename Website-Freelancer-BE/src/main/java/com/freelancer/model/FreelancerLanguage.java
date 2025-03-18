package com.freelancer.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.FreelancerLanguageDTO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.freelancer.model.ids.FreelancerLanguageId;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Freelancer_Language")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class FreelancerLanguage implements EntityBase<FreelancerLanguageDTO> {

	@EmbeddedId
	private FreelancerLanguageId id;

	@ManyToOne
	@MapsId("freelancerId")
	@JoinColumn(name = "FreelancerId")
	private Freelancer freelancer;

	@ManyToOne
	@MapsId("languageId")
	@JoinColumn(name = "LanguageId")
	private Language language;

	@Column(nullable = false)
	private Integer level;

	// Chuyển đổi entity sang DTO
	public FreelancerLanguageDTO toDto() {
		return FreelancerLanguageDTO.builder().freelancerId(freelancer.getId())
				.languageId(language.getId()).level(this.level).build();
	}
}
