package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.Profile;
import com.freelancer.service.AccountService;
import com.freelancer.service.FreelancerService;
import com.freelancer.service.ProfileService;
import com.freelancer.service.RecruiterService;
import com.freelancer.service.WalletService;

import com.freelancer.utils.ApplicationContextProvider;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO implements EntityDTO<Profile> {

	private Integer id;
	private String fullName;
	private Date birthday;
	private String phone;
	private Integer status;
	private String avatar;
	private Date joinDate;
	private AccountDTO account; // DTO cho Account
	private FreelancerDTO freelancer; // DTO cho Freelancer
	private RecruiterDTO recruiter; // DTO cho Recruiter
	private WalletDTO wallet; // DTO cho Wallet
	// Chuyển đổi DTO -> Entity (yêu cầu repository để lấy dữ liệu liên kết)

	public Profile toEntity() {
		ProfileService profileService = ApplicationContextProvider.getBean(ProfileService.class);
		AccountService accountService = ApplicationContextProvider.getBean(AccountService.class);
		FreelancerService freelancerService = ApplicationContextProvider.getBean(FreelancerService.class);
		RecruiterService recruiterService = ApplicationContextProvider.getBean(RecruiterService.class);
		WalletService walletService = ApplicationContextProvider.getBean(WalletService.class);
		Profile profile = profileService.getById(this.id).orElse(new Profile());

		profile.setFullName(this.fullName);
		profile.setBirthday(this.birthday);
		profile.setPhone(this.phone);
		profile.setStatus(this.status);
		profile.setAvatar(this.avatar);
		profile.setJoinDate(this.joinDate != null ? this.joinDate : new Date());

		if (this.account != null && this.account.getId() != null) {
			profile.setAccount(accountService.getById(this.account.getId()).orElse(null));
		}
		if (this.freelancer != null && this.freelancer.getId() != null) {
			profile.setFreelancer(freelancerService.getById(this.freelancer.getId()).orElse(null));
		}
		if (this.recruiter != null && this.recruiter.getId() != null) {
			profile.setRecruiter(recruiterService.getById(this.recruiter.getId()).orElse(null));
		}
		if (this.wallet != null && this.wallet.getId() != null) {
			profile.setWallet(walletService.getById(this.wallet.getId()).orElse(null));
		}

		return profile;
	}
}
