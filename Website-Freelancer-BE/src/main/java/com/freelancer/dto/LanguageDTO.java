package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.Language;
import com.freelancer.model.ids.FreelancerLanguageId;
import com.freelancer.service.FreelancerLanguageService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LanguageDTO implements EntityDTO<Language> {
	private Integer id;
	private String name;
	private String ISO;
	private Integer status;
	private List<FreelancerLanguageId> freelancerLanguageIds;

	// Chuyển đổi DTO thành Entity
	public Language toEntity() {

		FreelancerLanguageService freelancerLanguageService = ApplicationContextProvider
				.getBean(FreelancerLanguageService.class);

		Language language = new Language();
		language.setId(this.id);
		language.setName(this.name);
		language.setISO(this.ISO);
		language.setStatus(
				this.status == null ? State.Language.SHOW : this.status);

		if (freelancerLanguageIds != null && !freelancerLanguageIds.isEmpty()) {
			List<FreelancerLanguage> freelancerLanguage = freelancerLanguageService
					.getAllById(freelancerLanguageIds);
			language.setFreelancerLanguages(freelancerLanguage);
		} else {
			language.setFreelancerLanguages(
					new ArrayList<FreelancerLanguage>());
		}

		return language;
	}
}
