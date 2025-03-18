package com.freelancer.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.service.AccountService;
import com.freelancer.service.ForgotPasswordService;
import com.freelancer.service.MailService;
import com.freelancer.service.ProfileService;
import com.freelancer.service.StaffService;
import com.freelancer.utils.GenerateToken;
import com.freelancer.model.Account;
import com.freelancer.model.ForgotPassword;
import com.freelancer.model.Mail;
import com.freelancer.model.Profile;
import com.freelancer.model.Staff;

@RestController
@RequestMapping("/forgetpassword")
public class ForgetPasswordController {
	@Autowired
	MailService mailService;

	@Autowired
	AccountService accountService;

	@Autowired
	ProfileService profileService;

	@Autowired
	ForgotPasswordService service;

	@Autowired
	StaffService staffService;

	@GetMapping("/create/{email}")
	public ResponseEntity<String> create(@PathVariable("email") String email)
			throws IOException {

		Account account = accountService.getByEmail(email).orElse(null);
		if (account == null) {
			return ResponseEntity.badRequest().body("Email không tồn tại!");
		}

		service.deleteAllByAccount_Id(account.getId());

		Profile profile = profileService.getByAccount_Id(account.getId())
				.orElse(null);

		Staff staff = staffService.getByAccount_Id(account.getId())
				.orElse(null);

		if (profile == null && staff == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy tài khoản!");
		}

		String token = GenerateToken.generate();

		ForgotPassword forgotPassword = new ForgotPassword();
		forgotPassword.setAccount(account);
		forgotPassword.setToken(token);
		forgotPassword.setDateCeated(LocalDateTime.now());

		service.add(forgotPassword);

		ClassLoader classLoader = ForgetPasswordController.class
				.getClassLoader();
		InputStream inputStream = classLoader
				.getResourceAsStream("templates/MailResetPassword.html");

		String htmlContent = new String(inputStream.readAllBytes(),
				StandardCharsets.UTF_8);
		htmlContent = htmlContent.replace("[USERNAME]",
				profile != null ? profile.getFullName() : staff.getFullName());
		htmlContent = htmlContent.replace("[RESET_LINK]",
				"http://localhost:5173/changepassword/" + token);

		Mail mail = new Mail();
		mail.setTo(account.getEmail());
		mail.setSubject("Freelancer - Lấy lại mật khẩu");
		mail.setContent(htmlContent);

		mailService.push(mail);
		return ResponseEntity.ok()
				.body("Vui lòng kiểm tra email để đổi mật khẩu mới!");

	}

	@PostMapping()
	public ResponseEntity<String> changePassword(
			@RequestBody Map<String, String> res) {
		String token = res.get("token");
		String password = res.get("password");

		if (token == null && password == null) {
			return ResponseEntity.badRequest().body("Thiếu thông tin!");
		}

		ForgotPassword forgotPassword = service.getByToken(token).orElse(null);

		if (forgotPassword == null) {
			return ResponseEntity.badRequest().body("Không tìm thấy yêu cầu!");
		}

		if (forgotPassword.getDateCeated().plusMinutes(15)
				.isBefore(LocalDateTime.now())) {
			service.deleteById(forgotPassword.getToken());
			return ResponseEntity.badRequest().body("Yêu cầu đã quá hạn!");
		}

		Account account = forgotPassword.getAccount();

		account.setPassword(password);
		accountService.update(account);

		service.deleteById(forgotPassword.getToken());
		return ResponseEntity.ok().body("Đổi mật khẩu thành công!");
	}

	@GetMapping("/datecreated/{token}")
	public ResponseEntity<LocalDateTime> getDateCreated(
			@PathVariable("token") String token) {
		ForgotPassword forgotPassword = service.getByToken(token).orElse(null);

		if (forgotPassword == null) {
			return ResponseEntity.badRequest().body(null);
		}

		if (forgotPassword.getDateCeated().plusMinutes(15)
				.isBefore(LocalDateTime.now())) {
			service.deleteById(forgotPassword.getToken());
			return ResponseEntity.badRequest().body(null);
		}

		return ResponseEntity.ok().body(forgotPassword.getDateCeated());
	}
}
