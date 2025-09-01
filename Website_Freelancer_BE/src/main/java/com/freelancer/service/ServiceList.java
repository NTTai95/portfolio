package com.freelancer.service;

import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.freelancer.dto.responses.ResponseList;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryPermission;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.service.mapper.DataToList;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceList {
    private final RepositoryLanguage repositoryLanguage;
    private final RepositorySkill repositorySkill;
    private final RepositoryMajor repositoryMajor;
    private final RepositoryRole repositoryRole;
    private final RepositoryPermission repositoryPermission;

    public List<ResponseList.Language> listLanguage() {
        return repositoryLanguage.listLanguages().stream().map(DataToList::language).toList();
    }

    public List<ResponseList.Skill> listSkill() {
        return repositorySkill.listSkills().stream().map(DataToList::skill).toList();
    }

    public List<ResponseList.Major> listMajor() {
        return repositoryMajor.listMajors().stream().map(DataToList::major).toList();
    }

    public List<ResponseList.Role> listRole() {
        return repositoryRole.listRoles().stream().map(DataToList::role).toList();
    }

    public List<ResponseList.Permission> listPermission() {
        return repositoryPermission.listPermissions().stream().map(DataToList::permission).toList();
    }

    public List<ResponseList.Major> listMostMajor() {
        return repositoryMajor.listMostMajors(PageRequest.of(0, 10)).stream().map(DataToList::major)
                .toList();
    }
}
