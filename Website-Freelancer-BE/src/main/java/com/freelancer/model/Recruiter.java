package com.freelancer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.RecruiterDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Recruiters")
public class Recruiter implements EntityBase<RecruiterDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(255) NOT NULL")
	private String name;

	@Column(columnDefinition = "ntext NOT NULL")
	private String introduce;

	@Column(nullable = false)
	@Default
	private Integer status = State.Recruiter.SHOW;

	@OneToOne(mappedBy = "recruiter")
	private Profile profile;

	@OneToMany(mappedBy = "recruiter")
	@Column(insertable = false, updatable = false)
	private List<JobPost> jobPosts;

	// Phương thức chuyển đổi từ Entity sang DTO
	public RecruiterDTO toDto() {
		return RecruiterDTO.builder().id(this.id).name(this.name)
				.introduce(this.introduce).status(this.status)
				.profileId(this.profile != null ? this.profile.getId() : null)
				.jobPostIds(this.jobPosts != null
						? this.jobPosts.stream().map(JobPost::getId)
								.collect(Collectors.toList())
						: null)
				.build();
	}
}
