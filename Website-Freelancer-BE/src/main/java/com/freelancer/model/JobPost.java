package com.freelancer.model;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.JobPostDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "JobPosts")
public class JobPost implements EntityBase<JobPostDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(255) NOT NULL")
	private String title;

	@Column(columnDefinition = "ntext NOT NULL")
	private String description;

	@Temporal(TemporalType.TIMESTAMP)
	@Default
	private Date datePosted = new Date();

	@Temporal(TemporalType.DATE)
	private Date startDate;

	@Temporal(TemporalType.DATE)
	private Date endDate;

	private Integer budget;

	@Default
	private Integer status = State.JobPost.EDITING;

	@ManyToOne
	@JoinColumn(name = "RecruiterId", updatable = false)
	private Recruiter recruiter;

	@OneToMany(mappedBy = "jobPost")
	private List<Apply> applies;

	@ManyToMany
	@JoinTable(name = "JobPost_Skill", joinColumns = @JoinColumn(name = "JobPostId"), inverseJoinColumns = @JoinColumn(name = "SkillId"))
	private List<Skill> skills;

	// **Hàm chuyển đổi sang DTO**
	public JobPostDTO toDto() {
		return JobPostDTO.builder().id(this.id).title(this.title)
				.description(this.description).datePosted(this.datePosted)
				.startDate(this.startDate).endDate(this.endDate)
				.budget(this.budget).status(this.status)
				.recruiterId(
						this.recruiter != null ? this.recruiter.getId() : null)
				.skillIds(this.skills != null
						? this.skills.stream().map(Skill::getId)
								.collect(Collectors.toList())
						: null)
				.applies(applies != null
						? applies.stream().map(Apply::toDto).toList()
						: null)
				.build();
	}
}
