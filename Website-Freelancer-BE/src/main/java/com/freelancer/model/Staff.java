package com.freelancer.model;

import java.util.Date;
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

import com.freelancer.dto.StaffDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Staffs")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Staff implements EntityBase<StaffDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(255) NOT NULL")
	private String fullName;

	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Date joinDate = new Date();

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date birthday;

	@Column(nullable = false, unique = true)
	private String phone;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Integer status = State.Staff.SHOW;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Boolean isAdmin = false;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "AccountId", nullable = false, unique = true)
	private Account account;

	@ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
	@JoinTable(name = "Permission_Staff", joinColumns = @JoinColumn(name = "StaffId"), inverseJoinColumns = @JoinColumn(name = "PermissionId"))
	private List<Permission> permissions;

	/**
	 * Chuyển đổi từ `Staff` sang `StaffDTO`
	 */
	public StaffDTO toDto() {
		return StaffDTO.builder().id(this.id).fullName(this.fullName)
				.joinDate(this.joinDate).birthday(this.birthday)
				.phone(this.phone).status(this.status)
				.email(this.account != null ? this.account.getEmail() : null)
				.password(this.account != null
						? this.account.getPassword()
						: null)
				.accountId(this.account != null ? this.account.getId() : null)
				.permissionIds(this.permissions != null
						? this.permissions.stream().map(Permission::getId)
								.collect(Collectors.toList())
						: null)
				.build();
	}
}
