package com.freelancer.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.LanguageDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Languages")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Language implements EntityBase<LanguageDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(255) NOT NULL")
	private String name;

	@Column(nullable = false, length = 3, unique = true)
	private String ISO;

	@Column(nullable = false)
	@Default
	private Integer status = State.Language.SHOW;

	@OneToMany(mappedBy = "language")
	private List<FreelancerLanguage> freelancerLanguages;

	public LanguageDTO toDto() {
		return LanguageDTO.builder().id(this.id).name(this.name).ISO(this.ISO)
				.status(this.status != null ? this.status : State.Language.SHOW)
				.freelancerLanguageIds(freelancerLanguages != null
						? freelancerLanguages.stream()
								.map(FreelancerLanguage::getId)
								.collect(Collectors.toList())
						: null)
				.build();
	}

}
