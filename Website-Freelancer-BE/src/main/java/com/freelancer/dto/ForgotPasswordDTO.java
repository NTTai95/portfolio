package com.freelancer.dto;

import java.time.LocalDateTime;

import com.freelancer.model.ForgotPassword;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordDTO implements EntityDTO<ForgotPassword> {
	AccountDTO account;
	String token;
	LocalDateTime dateCreated;

	public ForgotPassword toEntity() {
		return ForgotPassword.builder().account(account.toEntity())
				.token(this.token)
				.dateCeated(this.dateCreated != null
						? this.dateCreated
						: LocalDateTime.now())
				.build();

	}
}
