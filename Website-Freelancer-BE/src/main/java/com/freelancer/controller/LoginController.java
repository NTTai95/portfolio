package com.freelancer.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.LoginDTO;
import com.freelancer.model.Account;
import com.freelancer.service.AccountService;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private AccountService service;

	@PostMapping
	public ResponseEntity<?> Login(@RequestBody LoginDTO login) {
		Optional<Account> account = service
				.getByEmailAndPassword(login.getEmail(), login.getPassword());

		if (!account.isEmpty()) {
			Map<String, Object> response = new HashMap<>();
			response.put("id", account.get().getId());
			response.put("isStaff", account.get().getIsStaff());
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(401).body("Sai email hoặc mật khẩu");
		}
	}
}
