package com.freelancer.model;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.freelancer.dto.PermissionDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Permissions")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Permission implements EntityBase<PermissionDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(100) NOT NULL")
	private String name;

	@Column(columnDefinition = "ntext NOT NULL")
	private String description;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Integer status = State.Permission.SHOW;

	@ManyToMany(mappedBy = "permissions", cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	private List<Staff> staffs;

	// Chuyển đổi Entity thành DTO
	public PermissionDTO toDto() {
		return PermissionDTO.builder().id(this.id).name(this.name)
				.description(this.description).status(this.status)
				.staffIds(this.staffs != null
						? this.staffs.stream().map(Staff::getId)
								.collect(Collectors.toList())
						: null)
				.build();
	}
}
