package com.freelancer.dto;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.freelancer.model.Account;
import com.freelancer.service.AccountService;
import com.freelancer.utils.ApplicationContextProvider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO implements EntityDTO<Account> {
	private Integer id;
	private String email;
	private Boolean isStaff;
	private Integer status;

	// Phương thức chuyển đổi DTO -> Entity, sử dụng service để lấy entity nếu có ID
	public Account toEntity() {
		AccountService accountService = ApplicationContextProvider.getBean(AccountService.class);
		Account account = accountService.getById(id).orElse(new Account());
		account.setEmail(this.email);
		account.setIsStaff(this.isStaff);
		account.setStatus(this.status);
		return account;
	}
}
