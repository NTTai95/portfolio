package com.freelancer.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.freelancer.dto.ProfileDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "Profiles")
public class Profile implements EntityBase<ProfileDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(columnDefinition = "nvarchar(255) NOT NULL")
	private String fullName;

	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private Date birthday;

	@Column(nullable = false, unique = true)
	private String phone;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Integer status = State.Profile.SHOW;

	@Column(nullable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private String avatar = "https://res.cloudinary.com/dzrds49tb/image/upload/v1738941978/avatarDefaul.jpg";

	@Column(updatable = false, nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@JsonSetter(nulls = Nulls.SKIP)
	@Default
	private Date joinDate = new Date();
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "AccountId", nullable = false, unique = true)
	private Account account;

	@OneToOne
	@JoinColumn(name = "FreelancerId", insertable = false)
	@JsonSetter(nulls = Nulls.SKIP)
	private Freelancer freelancer;

	@OneToOne
	@JoinColumn(name = "RecruiterId", updatable = false, insertable = false)
	private Recruiter recruiter;
	
	@OneToOne
	@JoinColumn(name = "WalletId")
	private Wallet wallet;

    //Chuyển đổi Entity -> DTO
    public ProfileDTO toDto() {
        return ProfileDTO.builder()
                .id(this.id)
                .fullName(this.fullName)
                .birthday(this.birthday)
                .phone(this.phone)
                .status(this.status)
                .avatar(this.avatar)
                .joinDate(this.joinDate)
                .account(this.account != null ? this.account.toDto() : null)
                .freelancer(this.freelancer != null ? this.freelancer.toDto() : null)
                .recruiter(this.recruiter != null ? this.recruiter.toDto() : null)
                .wallet(this.wallet != null ? this.wallet.toDto() : null)
                .build();
    }
}
