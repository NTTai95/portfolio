package com.freelancer.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.RegisterDTO;
import com.freelancer.model.Account;
import com.freelancer.model.Profile;
import com.freelancer.service.ProfileService;

@RestController
@RequestMapping("/register")
public class RegisterController {

	@Autowired
	ProfileService profileService;

	@PostMapping
	public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {

		Account account = new Account();
		account.setEmail(registerDTO.getEmail());
		account.setPassword(registerDTO.getPassword());
		account.setIsStaff(false);

		Profile profile = new Profile();
		profile.setAccount(account);
		profile.setFullName(registerDTO.getFullName());
		profile.setPhone(registerDTO.getPhone());
		profile.setBirthday(registerDTO.getBirthday());

		Profile profileNew = profileService.add(profile);

		Map<String, Object> map = new HashMap<>();
		map.put("id", profileNew.getAccount().getId());
		map.put("isStaff", profileNew.getAccount().getIsStaff());
		return ResponseEntity.ok(map);
	}
}
