package com.freelancer.service;

import org.springframework.stereotype.Service;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.Staff;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryStaff;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceChangeState {

    private final RepositorySkill repositorySkill;
    private final RepositoryMajor repositoryMajor;
    private final RepositoryLanguage repositoryLanguage;
    private final RepositoryJob repositoryJob;
    private final RepositoryStaff repositoryStaff;

    // ---------- SKILL ----------
    public void activeSkill(Integer id) {
        Skill skill = repositorySkill.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy skill id: " + id));
        skill.setStatus(Skill.Status.ACTIVE);
        repositorySkill.save(skill);
    }

    public void invalidSkill(Integer id) {
        Skill skill = repositorySkill.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy skill id: " + id));
        skill.setStatus(Skill.Status.INVALID);
        repositorySkill.save(skill);
    }

    // ---------- MAJOR ----------
    public void activeMajor(Integer id) {
        Major major = repositoryMajor.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy major id: " + id));
        major.setStatus(Major.Status.ACTIVE);
        repositoryMajor.save(major);
    }

    public void invalidMajor(Integer id) {
        Major major = repositoryMajor.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy major id: " + id));
        major.setStatus(Major.Status.INVALID);
        repositoryMajor.save(major);
    }

    // ---------- LANGUAGE ----------
    public void activeLanguage(Integer id) {
        Language language = repositoryLanguage.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy language id: " + id));
        language.setStatus(Language.Status.ACTIVE);
        repositoryLanguage.save(language);
    }

    public void invalidLanguage(Integer id) {
        Language language = repositoryLanguage.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy language id: " + id));
        language.setStatus(Language.Status.INVALID);
        repositoryLanguage.save(language);
    }

    // ---------- STAFF ----------
    public void activeStaff(Integer id) {
        Staff staff = repositoryStaff.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy staff với id: " + id));
        staff.setStatus(Staff.Status.ACTIVE);
        repositoryStaff.save(staff);
    }

    public void invalidStaff(Integer id) {
        Staff staff = repositoryStaff.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy staff với id: " + id));
        staff.setStatus(Staff.Status.DISABLED);
        repositoryStaff.save(staff);
    }

    // ---------- JOB ----------
    public void postPublicJob(Integer id) {
        postJob(id, Job.Status.PUBLIC);
    }

    public void postPrivateJob(Integer id) {
        postJob(id, Job.Status.PRIVATE);
    }

    private void postJob(Integer id, Job.Status status) {
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy job id: " + id));
        if (!job.isValid()) {
            throw new DataConflictException("Job không chưa đầy đủ thông tin");
        }
        if (job.getStatus() != Job.Status.DRAFT) {
            throw new DataConflictException("Job không thể đăng");
        }
        job.setStatus(status);
        repositoryJob.save(job);
    }
}
