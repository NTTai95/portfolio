package com.freelancer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.service.AccountService;
import com.freelancer.service.LanguageService;
import com.freelancer.service.ProfileService;
import com.freelancer.service.StaffService;

@RestController
@RequestMapping("/check")
public class CheckController {
	
	@Autowired
	AccountService accountService;
	
	@Autowired
	StaffService staffService;
	
	@Autowired
	ProfileService profileService;
	
	@Autowired
	LanguageService languageService;
	
	@GetMapping("/exists/email/{email}")
	public Boolean checkEmail(@PathVariable String email) {
		return accountService.getByEmail(email).isPresent();
	}
	
	@GetMapping("/exists/phone/{phone}")
	public Boolean checkUsername(@PathVariable String phone) {
		return staffService.getByPhone(phone).isPresent() || profileService.getByPhone(phone).isPresent();
	}
	
	@GetMapping("/exists/iso/{iso}")
	public Boolean checkIso(@PathVariable String iso) {
		return languageService.getByISO(iso).isPresent();
	}
}
