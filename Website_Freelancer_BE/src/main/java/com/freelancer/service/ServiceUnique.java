package com.freelancer.service;

import org.springframework.stereotype.Service;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryUser;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceUnique {
    private final RepositoryUser repositoryUser;
    private final RepositorySkill repositorySkill;
    private final RepositoryMajor repositoryMajor;
    private final RepositoryLanguage repositoryLanguage;
    private final RepositoryRole repositoryRole;

    public boolean uniqueEmail(String email) {
        return !repositoryUser.existsByEmail(email);
    }

    public boolean uniqueSkillName(String name) {
        return !repositorySkill.existsByName(name);
    }

    public boolean uniquePhone(String phone) {
        return !repositoryUser.existsByPhone(phone);
    }

    public boolean uniqueMajorName(String name) {
        return !repositoryMajor.existsByName(name);
    }

    public boolean uniqueLanguageName(String name) {
        return !repositoryLanguage.existsByName(name);
    }

    public boolean uniqueLanguageIso(String iso) {
        return !repositoryLanguage.existsByIso(iso);
    }

    public boolean uniqueRoleName(String name) {
        return !repositoryRole.existsByName(name);
    }
}
