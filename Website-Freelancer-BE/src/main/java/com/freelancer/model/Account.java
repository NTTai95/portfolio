package com.freelancer.model;

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
import com.freelancer.dto.AccountDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Accounts")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Account implements EntityBase<AccountDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, length = 50)
	private String password;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Boolean isStaff = true;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Integer status = State.Account.USE;

	// Phương thức chuyển đổi Entity -> DTO
	public AccountDTO toDto() { //truyen dl qua giao dien(2 chieu)
		return AccountDTO.builder().id(this.id).email(this.email)
				.isStaff(this.isStaff).status(this.status).build();
	}
}
