package com.freelancer.model;

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
import com.freelancer.dto.FreelancerDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Freelancers")
public class Freelancer implements EntityBase<FreelancerDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "ntext NOT NULL")
	private String introduce;

	@Column(nullable = false)
	@Default
	private Integer status = State.Freelancer.SHOW;

	@OneToOne(mappedBy = "freelancer")
	private Profile profile;

	@OneToMany(mappedBy = "freelancer", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<FreelancerLanguage> freelancerLanguages;

	@ManyToMany
	@JoinTable(name = "Freelancer_Skill", joinColumns = @JoinColumn(name = "FreelancerId"), inverseJoinColumns = @JoinColumn(name = "SkillId"))
	private List<Skill> skills;

	@OneToMany(mappedBy = "freelancer")
	@Column(insertable = false, updatable = false)
	private List<Apply> applies;

	public FreelancerDTO toDto() {
		return FreelancerDTO.builder().id(this.id).introduce(this.introduce)
				.status(this.status)
				.profileId(this.profile != null ? this.profile.getId() : null)
				.skillIds(this.skills != null
						? this.skills.stream().map(Skill::getId)
								.collect(Collectors.toList())
						: null)
				.freelancerLanguages(this.freelancerLanguages != null
						? this.freelancerLanguages.stream()
								.map(FreelancerLanguage::toDto)
								.collect(Collectors.toList())
						: null)
				.applies(this.applies != null
						? this.applies.stream().map(Apply::toDto)
								.collect(Collectors.toList())
						: null)
				.build();
	}
}
