package com.freelancer.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.freelancer.dto.AccountDTO;
import com.freelancer.model.Account;
import com.freelancer.service.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController extends EntityController<Account, AccountDTO, Integer> {
	@Autowired
	AccountService accountService;

	@GetMapping("/{id}/check/password/{password}")
	public Boolean checkPassword(@PathVariable String password, @PathVariable Integer id) {
		Account account = accountService.getById(id).orElse(null);
		if (account == null) {
			return false;
		} else {
			if (account.getPassword().equals(password)) {
				return true;
			}
			return false;
		}
	}

	@PutMapping("/changepassword/{id}")
	public AccountDTO changePassword(@RequestBody String password, @PathVariable Integer id) {
		Account account = service.getById(id).orElse(null);
		account.setPassword(password.replace("\"", ""));
		return accountService.update(account).toDto();
	}
	
	
	@PutMapping("/profile/changepassword/{id}")
	public AccountDTO changePassword(@RequestBody Map<String, String> request, @PathVariable Integer id) {
	    Account account = service.getById(id).orElse(null);
	    if (account == null) {
	        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");
	    }

	    String newPassword = request.get("password"); // Lấy giá trị đúng từ JSON
	    account.setPassword(newPassword);

	    return accountService.update(account).toDto();
	}

}
