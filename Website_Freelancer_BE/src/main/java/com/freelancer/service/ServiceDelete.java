package com.freelancer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceDelete {
    private final RepositorySkill repositorySkill;
    private final RepositoryMajor repositoryMajor;
    private final RepositoryLanguage repositoryLanguage;
    private final RepositoryRole repositoryRole;

    public void deleteSkill(Integer id) {
        if (repositorySkill.findActiveJobsUsingSkillBySkillId(id).stream().filter(objs -> {
            return objs[2] == Job.Status.PUBLIC;
        }).toArray().length > 0) {
            throw new DataConflictException(
                    "Không thể xóa skill này vì có job đã đăng sử dụng skill này");
        }

        Skill skill = repositorySkill.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy skill id: " + id));
        repositorySkill.delete(skill);
    }

    public void deleteMajor(Integer id) {
        if (repositoryMajor.findActiveJobsUsingMajorByMajorId(id).stream().filter(objs -> {
            return objs[2] == Job.Status.PUBLIC;
        }).toArray().length > 0) {
            throw new DataConflictException(
                    "Không thể xóa major này vì có job đã đăng sử dụng major này");
        }

        if (repositoryMajor.findSkillsUsingMajorByMajorId(id).size() > 0) {
            throw new DataConflictException(
                    "Không thể xóa major này vì có skill đã sử dụng major này");
        }

        Major major = repositoryMajor.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy major id: " + id));
        repositoryMajor.delete(major);
    }

    public void deleteLanguage(Integer id) {
        if (repositoryLanguage.findActiveJobsUsingSkillByLanguageId(id).stream().filter(objs -> {
            return objs[2] == Job.Status.PUBLIC;
        }).toArray().length > 0) {
            throw new DataConflictException(
                    "Không thể xóa language này vì có job đã đăng sử dụng language này");
        }

        Language language = repositoryLanguage.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy language id: " + id));
        repositoryLanguage.delete(language);
    }

    @Transactional
    public void deleteRole(Integer id) {
        if (repositoryRole.isFixedRoleByRoleId(id)) {
            throw new DataConflictException("Không thể xóa role này vì role này là role cố định");
        }

        if (repositoryRole.existsUsersByRoleId(id)) {
            throw new DataConflictException(
                    "Không thể xóa role này vì có user đã sử dụng role này");
        }

        Role role = repositoryRole.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy role"));

        role.getPermissions().forEach(permission -> permission.getRoles().remove(role));
        role.getPermissions().clear();
        repositoryRole.saveAndFlush(role);
        repositoryRole.delete(role);
    }

}
