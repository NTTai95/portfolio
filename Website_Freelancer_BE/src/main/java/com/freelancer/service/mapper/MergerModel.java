package com.freelancer.service.mapper;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Permission;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.Staff;
import com.freelancer.service.ServiceCloudinary;
import com.freelancer.service.ServiceFileStorage;
import com.freelancer.utils.Formater;
import com.freelancer.utils.RelationshipUtils;
import jakarta.annotation.PostConstruct;

@Component
public class MergerModel {
    @Autowired
    private PasswordEncoder injectedPasswordEncoder;

    @Autowired
    private static ServiceFileStorage serviceFileStorage;
    @Autowired
    private ServiceCloudinary injectedServiceCloudinary;
    public static PasswordEncoder passwordEncoder;
    public static ServiceCloudinary serviceCloudinary;

    @PostConstruct
    public void init() {
        MergerModel.passwordEncoder = injectedPasswordEncoder;
        MergerModel.serviceCloudinary = injectedServiceCloudinary;
    }

    protected static void mergerSkill(Skill skill, RequestForm.Skill req, Major major) {
        skill.setName(req.getName());
        skill.setDescription(req.getDescription());
        skill.setMajor(major);
    }

    protected static void mergerMajor(Major major, RequestForm.Major req) {
        major.setName(req.getName());
        major.setDescription(req.getDescription());
    }

    protected static void mergerLanguage(Language language, RequestForm.Language req) {
        language.setName(req.getName());
        language.setIso(req.getIso());
    }

    protected static void mergerRole(Role role, RequestForm.Role req,
            List<Permission> permissions) {
        role.setName(req.getName());
        role.setCode(Formater.nameToCode(req.getName()));
        role.setDescription(req.getDescription());
        RelationshipUtils.updateManyToMany(role, permissions, Role::getPermissions,
                Permission::getRoles);
    }


    protected static void mergerJobStep1(Job job, RequestForm.JobStep1 req, Major major,
            Employer employer) {
        job.setTitle(req.getTitle());
        job.setMajor(major);
        job.setEmployer(employer);
        job.setStep(1);
    }

    protected static void mergerJobStep2(Job job, List<Skill> skills, List<Language> languages) {
        RelationshipUtils.updateManyToMany(job, skills, Job::getSkills, Skill::getJobs);
        RelationshipUtils.updateManyToMany(job, languages, Job::getLanguages, Language::getJobs);
        job.setStep(2);
    }

    protected static void mergerJobStep3(Job job, RequestForm.JobStep3 req) {
        job.setBudget(req.getBudget());
        job.setClosedAt(req.getClosedAt());
        job.setDurationHours(req.getDurationHours());
        job.setStep(3);
    }

    protected static void mergerJobStep4(Job job, RequestForm.JobStep4 req, Boolean isPublic) {
        try {
            if (req.getDocument() != null) {
                job.setDocument(serviceFileStorage.uploadFileWithName(req.getDocument(),
                        "document-" + req.getDocument().getOriginalFilename()));
            } else {
                job.setDocument(null);
            }
            job.setDescription(req.getDescription());
            job.setStep(4);

            if (isPublic) {
                job.setStatus(Job.Status.PUBLIC);
            }
        } catch (Exception e) {
            new DataConflictException("Upload file failed");
            e.printStackTrace();
        }
    }

    protected static void mergerStaff(Staff staff, RequestForm.Staff req, Role role,
            boolean isCreate) {
        staff.setBirthday(req.getBirthday());
        staff.setEmail(req.getEmail());
        staff.setFullName(req.getFullName());
        staff.setPhone(req.getPhone());
        staff.setRole(role);

        if (isCreate) {
            staff.setPassword(passwordEncoder.encode(req.getPassword()));
        }
    }

    protected static void mergerApply(Apply apply, RequestForm.Apply req, Freelancer freelancer,
            Job job) {
        apply.setBidAmount(req.getBidAmount());
        apply.setContent(req.getContent());
        apply.setEstimatedHours(req.getEstimatedHours());
        apply.setFreelancer(freelancer);
        apply.setJob(job);
    }
}
