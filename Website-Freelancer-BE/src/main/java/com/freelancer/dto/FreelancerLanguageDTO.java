package com.freelancer.dto;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.Freelancer;
import com.freelancer.model.FreelancerLanguage;
import com.freelancer.model.Language;
import com.freelancer.model.ids.FreelancerLanguageId;
import com.freelancer.service.FreelancerLanguageService;
import com.freelancer.service.FreelancerService;
import com.freelancer.service.LanguageService;
import com.freelancer.utils.ApplicationContextProvider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerLanguageDTO implements EntityDTO<FreelancerLanguage> {
	private Integer freelancerId;
	private Integer languageId;
    private Integer level;
    
 // Chuyển đổi DTO thành entity
    public FreelancerLanguage toEntity() {
    	FreelancerService freelancerService = ApplicationContextProvider.getBean(FreelancerService.class);
    	LanguageService languageService = ApplicationContextProvider.getBean(LanguageService.class);
    	
    	FreelancerLanguageId id = new FreelancerLanguageId(this.freelancerId, this.languageId);
    	Freelancer freelancer = freelancerService.getById(this.freelancerId).orElse(null);
    	Language language = languageService.getById(this.languageId).orElse(null);

        return FreelancerLanguage.builder()
                .id(id)
                .freelancer(freelancer)
                .language(language)
                .level(this.level)
                .build();
    }
}
