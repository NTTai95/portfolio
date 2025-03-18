package com.freelancer.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.ForgotPasswordDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "ForgetPasswords")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class ForgotPassword implements EntityBase<ForgotPasswordDTO> {
	@OneToOne
	@JoinColumn(name = "accountId")
	Account account;

	@Id
	@JoinColumn(name = "token", nullable = false)
	String token;

	@JoinColumn(name = "dateCreated")
	LocalDateTime dateCeated;

	public ForgotPasswordDTO toDto() {
		return ForgotPasswordDTO.builder().account(this.account.toDto())
				.token(this.token).dateCreated(this.dateCeated).build();
	}
}
