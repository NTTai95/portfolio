package com.freelancer.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Permission;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.Staff;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryPermission;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.service.mapper.FormToModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceUpdate {
        private final RepositorySkill repositorySkill;
        private final RepositoryMajor repositoryMajor;
        private final RepositoryLanguage repositoryLanguage;
        private final RepositoryRole repositoryRole;
        private final RepositoryPermission repositoryPermission;
        private final RepositoryJob repositoryJob;
        private final RepositoryStaff repositoryStaff;

        public void updateSkill(Integer id, RequestForm.Skill req) {
                Skill skill = repositorySkill.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy skill id: " + id));
                Major major = repositoryMajor.findById(req.getMajorId())
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy major id: " + req.getMajorId()));
                repositorySkill.save(FormToModel.fromToSkill(skill, req, major));
        }

        public void updateMajor(Integer id, RequestForm.Major req) {
                Major major = repositoryMajor.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy major id: " + id));
                repositoryMajor.save(FormToModel.fromToMajor(major, req));
        }

        public void updateLanguage(Integer id, RequestForm.Language req) {
                Language language = repositoryLanguage.findById(id)
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy language id: " + id));
                repositoryLanguage.save(FormToModel.fromToLanguage(language, req));
        }

        public void updateRole(Integer id, RequestForm.Role req) {
                Role role = repositoryRole.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy role id: " + id));
                List<Permission> permissions = (List<Permission>) repositoryPermission
                                .findAllById(req.getPermissionIds());
                repositoryRole.save(FormToModel.fromToRole(role, req, permissions));
        }

        public void updateJobStep1(Integer id, RequestForm.JobStep1 req) {
                Job job = repositoryJob.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy job id: " + id));
                Major major = repositoryMajor.findById(req.getMajorId())
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy major id: " + req.getMajorId()));
                repositoryJob.save(FormToModel.fromToJobStep1(job, req, major, job.getEmployer()));
        }

        public void updateJobStep2(Integer id, RequestForm.JobStep2 req) {
                Job job = repositoryJob.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy job id: " + id));
                List<Skill> skills = (List<Skill>) repositorySkill.findAllById(req.getSkillIds());
                List<Language> languages = (List<Language>) repositoryLanguage
                                .findAllById(req.getLanguageIds());
                repositoryJob.save(FormToModel.fromToJobStep2(job, skills, languages));
        }

        public void updateJobStep3(Integer id, RequestForm.JobStep3 req) {
                Job job = repositoryJob.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy job id: " + id));
                repositoryJob.save(FormToModel.fromToJobStep3(job, req));
        }

        public void updateJobStep4(Integer id, RequestForm.JobStep4 req, Boolean isPublic) {
                Job job = repositoryJob.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy job id: " + id));
                repositoryJob.save(FormToModel.fromToJobStep4(job, req, isPublic));
        }

        public void updateStaff(Integer id, RequestForm.Staff req) {
                Staff staff = repositoryStaff.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy staff id: " + id));
                Role role = repositoryRole.findById(req.getRoleId())
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy role id: " + req.getRoleId()));
                repositoryStaff.save(FormToModel.fromToStaff(staff, req, role));
        }
}
