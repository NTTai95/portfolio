package com.freelancer.service.mapper;

import java.util.List;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Permission;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.Staff;

public class FormToModel extends MergerModel {
    public static void registerToProfile(Client profile, RequestForm.Register req, Role role) {
        profile.setEmail(req.getEmail());
        profile.setFullName(req.getFullName());
        profile.setPassword(req.getPassword());
        profile.setBirthday(req.getBirthday());
        profile.setIsMale(req.getIsMale());
        profile.setRole(role);
    }

    public static Skill fromToSkill(Skill skill, RequestForm.Skill req, Major major) {
        skill = skill != null ? skill : new Skill();
        mergerSkill(skill, req, major);
        return skill;
    }

    public static Major fromToMajor(Major major, RequestForm.Major req) {
        major = major != null ? major : new Major();
        mergerMajor(major, req);
        return major;
    }

    public static Language fromToLanguage(Language language, RequestForm.Language req) {
        language = language != null ? language : new Language();
        mergerLanguage(language, req);
        return language;
    }

    public static Role fromToRole(Role role, RequestForm.Role req, List<Permission> permissions) {
        role = role != null ? role : new Role();
        mergerRole(role, req, permissions);
        return role;
    }

    public static Job fromToJobStep1(Job job, RequestForm.JobStep1 req, Major major,
            Employer employer) {
        job = job != null ? job : new Job();
        mergerJobStep1(job, req, major, employer);
        return job;
    }

    public static Job fromToJobStep2(Job job, List<Skill> skills, List<Language> languages) {
        mergerJobStep2(job, skills, languages);
        return job;
    }

    public static Job fromToJobStep3(Job job, RequestForm.JobStep3 req) {
        mergerJobStep3(job, req);
        return job;
    }

    public static Job fromToJobStep4(Job job, RequestForm.JobStep4 req, Boolean isPublic) {
        mergerJobStep4(job, req, isPublic);
        return job;
    }

    public static Staff fromToStaff(Staff staff, RequestForm.Staff req, Role role) {
        boolean isCreate = staff == null;
        staff = staff != null ? staff : new Staff();
        mergerStaff(staff, req, role, isCreate);
        return staff;
    }

    public static Apply fromToApply(Apply apply, RequestForm.Apply req, Job job,
            Freelancer freelancer) {
        apply = apply != null ? apply : new Apply();
        mergerApply(apply, req, freelancer, job);
        return apply;
    }
}
