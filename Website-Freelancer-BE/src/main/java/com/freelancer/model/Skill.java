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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.SkillDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Skills")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Skill implements EntityBase<SkillDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(100) NOT NULL")
	private String name;

	@Column(columnDefinition = "nvarchar(MAX) NOT NULL")
	private String description;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Integer status = State.Skill.SHOW;

	@ManyToMany(mappedBy = "skills")
	private List<Freelancer> freelancers;

	@ManyToMany(mappedBy = "skills")
	private List<JobPost> jobPosts;

	// Phương thức chuyển đổi từ Entity sang DTO
	public SkillDTO toDto() {
		List<Integer> freelancerIds = this.freelancers == null ? null
				: this.freelancers.stream().map(Freelancer::getId).collect(Collectors.toList());

		List<Integer> jobPostIds = this.jobPosts == null ? null
				: this.jobPosts.stream().map(JobPost::getId).collect(Collectors.toList());

		return SkillDTO.builder().id(this.id).name(this.name).description(this.description).status(this.status)
				.freelancerIds(freelancerIds).jobPostIds(jobPostIds).build();
	}

}
