package com.freelancer.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.freelancer.dto.responses.ResponseImpact;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.service.mapper.DataToImpact;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceImpact {
    private final RepositorySkill repositorySkill;
    private final RepositoryMajor repositoryMajor;
    private final RepositoryLanguage repositoryLanguage;

    public ResponseImpact.Skill impactSkill(Integer id) {
        Skill skill = repositorySkill.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy skill với id: " + id));
        List<Object[]> freelancersImpact = repositorySkill.findFreelancersImpactBySkillId(id);
        List<Object[]> jobsImpact = repositorySkill.findActiveJobsUsingSkillBySkillId(id);
        return DataToImpact.skill(skill, freelancersImpact, jobsImpact);
    }

    public ResponseImpact.Major impactMajor(Integer id) {
        Major major = repositoryMajor.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy major với id: " + id));
        List<Object[]> jobsImpact = repositoryMajor.findActiveJobsUsingMajorByMajorId(id);
        List<Object[]> skillsImpact = repositoryMajor.findSkillsUsingMajorByMajorId(id);
        return DataToImpact.major(major, jobsImpact, skillsImpact);
    }

    public ResponseImpact.Language impactLanguage(Integer id) {
        Language language = repositoryLanguage.findById(id).orElseThrow(
                () -> new DataConflictException("Không tìm thấy language với id: " + id));
        List<Object[]> freelancersImpact = repositoryLanguage.findFreelancersImpactByLanguageId(id);
        List<Object[]> jobsImpact = repositoryLanguage.findActiveJobsUsingSkillByLanguageId(id);
        return DataToImpact.language(language, freelancersImpact, jobsImpact);
    }
}
