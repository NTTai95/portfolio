package com.freelancer.service.mapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.freelancer.dto.responses.ResponseRecord;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.User;

public class DataToRecord {

    /** s.id, s.name, s.description, s.status, s.createdAt, s.major.name */
    public static ResponseRecord.Skill toSkill(Object[] objs) {
        ResponseRecord.Skill skill = new ResponseRecord.Skill();
        skill.setId((Integer) objs[0]);
        skill.setName((String) objs[1]);
        skill.setDescription((String) objs[2]);
        skill.setStatus((Skill.Status) objs[3]);
        skill.setCreatedAt((LocalDateTime) objs[4]);
        skill.setMajorName((String) objs[5]);
        return skill;
    }

    /** m.id, m.name, m.description, m.status, m.createdAt, COUNT(s) */
    public static ResponseRecord.Major toMajor(Object[] objs) {
        ResponseRecord.Major major = new ResponseRecord.Major();
        major.setId((Integer) objs[0]);
        major.setName((String) objs[1]);
        major.setDescription((String) objs[2]);
        major.setStatus((Major.Status) objs[3]);
        major.setCreatedAt((LocalDateTime) objs[4]);
        major.setSkillCount((Long) objs[5]);
        return major;
    }

    /** l.id, l.name, l.iso, l.status, l.createdAt */
    public static ResponseRecord.Language toLanguage(Object[] objs) {
        ResponseRecord.Language language = new ResponseRecord.Language();
        language.setId((Integer) objs[0]);
        language.setName((String) objs[1]);
        language.setIso((String) objs[2]);
        language.setStatus((Language.Status) objs[3]);
        language.setCreatedAt((LocalDateTime) objs[4]);
        return language;
    }

    /**
     * c.id, c.avatar, c.fullName, c.email, c.status, c.joinedAt, c.isMale, c.birthday, r.id,
     * r.name, r.code
     */
    public static ResponseRecord.Client toClient(Object[] objs) {
        ResponseRecord.Client client = new ResponseRecord.Client();
        megreUser(client, objs);
        client.setAvatar((String) objs[1]);
        client.setIsMale((Boolean) objs[6]);
        return client;
    }

    /** s.id, s.fullName, s.email, s.status, s.joinedAt, s.birthday, r.id, r.name, r.code */
    public static ResponseRecord.Staff toStaff(Object[] objs) {
        ResponseRecord.Staff staff = new ResponseRecord.Staff();
        megreUser(staff, objs);
        return staff;
    }

    private static void megreUser(ResponseRecord.Staff target, Object[] objs) {
        target.setId((Integer) objs[0]);
        target.setFullName((String) objs[2]);
        target.setEmail((String) objs[3]);
        target.setStatus((User.Status) objs[4]);
        target.setJoinedAt((LocalDateTime) objs[5]);
        target.setBirthday((LocalDate) objs[7]);

        ResponseRecord.Client.Role role = new ResponseRecord.Client.Role();
        role.setId((Integer) objs[8]);
        role.setName((String) objs[9]);
        role.setCode((String) objs[10]);
        target.setRole(role);
    }

    /** r.id, r.name, r.code, r.description, COUNT(u) */
    public static ResponseRecord.Role role(Object[] objs) {
        ResponseRecord.Role role = new ResponseRecord.Role();
        role.setId((Integer) objs[0]);
        role.setName((String) objs[1]);
        role.setCode((String) objs[2]);
        role.setDescription((String) objs[3]);
        role.setCountUsers((Long) objs[4]);
        return role;
    }

    public static ResponseRecord.Job fromJob(Job job) {
        ResponseRecord.Job res = new ResponseRecord.Job();
        res.setId(job.getId());
        res.setEmployerId(job.getEmployer().getId());
        res.setEmployerAvatar(job.getEmployer().getAvatar());
        res.setEmployerFullName(job.getEmployer().getFullName());
        res.setTitle(job.getTitle());
        res.setDescription(job.getDescription());
        res.setBudget(job.getBudget());
        res.setPostedAt(job.getPostedAt());
        res.setClosedAt(job.getClosedAt());
        res.setDurationHours(job.getDurationHours());
        res.setCountApplies((long) job.getApplies().size());

        res.setSkills(job.getSkills().stream()
                .map(s -> new ResponseRecord.IdAndName(s.getId(), s.getName())).toList());
        res.setLanguages(job.getLanguages().stream()
                .map(l -> new ResponseRecord.IdAndName(l.getId(), l.getName())).toList());
        res.setMajor(
                new ResponseRecord.IdAndName(job.getMajor().getId(), job.getMajor().getName()));
        return res;
    }

    public static ResponseRecord.EmployerJob toEmployerJob(Object[] obj) {
        ResponseRecord.EmployerJob jobDto = new ResponseRecord.EmployerJob();
        jobDto.setId((Integer) obj[0]);
        jobDto.setTitle((String) obj[1]);
        jobDto.setBudget((Integer) obj[2]);
        jobDto.setStatus(obj[3].toString());
        jobDto.setPostedAt((java.time.LocalDateTime) obj[4]);
        jobDto.setMajorName((String) obj[5]);
        return jobDto;
    }

    public static ResponseRecord.EmployerReview toEmployerReview(Object[] obj) {
        ResponseRecord.EmployerReview reviewDto = new ResponseRecord.EmployerReview();
        reviewDto.setId((Integer) obj[0]);
        reviewDto.setEmployerContent((String) obj[1]);
        reviewDto.setEmployerRating((Integer) obj[2]);
        reviewDto.setCreatedAt((java.time.LocalDateTime) obj[3]);
        reviewDto.setFreelancerName((String) obj[4]);
        reviewDto.setJobTitle((String) obj[5]);
        return reviewDto;
    }

    public static ResponseRecord.EmployerMilestone toEmployerMilestone(Object[] obj) {
        ResponseRecord.EmployerMilestone milestoneDto = new ResponseRecord.EmployerMilestone();
        milestoneDto.setId((Integer) obj[0]);
        milestoneDto.setContent((String) obj[1]);
        milestoneDto.setStatus(obj[2].toString());
        milestoneDto.setPercent((Byte) obj[3]);
        milestoneDto.setDisputed((Boolean) obj[4]);
        milestoneDto.setIsOverdue((Boolean) obj[5]);
        milestoneDto.setStartAt((LocalDateTime) obj[6]);
        milestoneDto.setEndAt((LocalDateTime) obj[7]);
        milestoneDto.setJobTitle((String) obj[8]);
        milestoneDto.setFreelancerName((String) obj[9]);
        return milestoneDto;
    }

    public static ResponseRecord.EmployerContact toEmployerContact(Object[] obj) {
        ResponseRecord.EmployerContact contactDto = new ResponseRecord.EmployerContact();
        contactDto.setId((Integer) obj[0]);
        contactDto.setTitle((String) obj[1]);
        contactDto.setContent((String) obj[2]);
        contactDto.setStatus((String) obj[3]);
        contactDto.setCreatedAt((LocalDateTime) obj[4]);
        return contactDto;
    }

    // a.id, j.title, a.createdAt, j.budget, a.bidAmount, j.durationHours, a.estimatedHours,
    // a.status
    public static ResponseRecord.MeApplies toMeApplies(Object[] objs) {
        ResponseRecord.MeApplies res = new ResponseRecord.MeApplies();
        res.setId((Integer) objs[0]);
        res.setJobId((Integer) objs[1]);
        res.setJobTitle((String) objs[2]);
        res.setCreatedAt((LocalDateTime) objs[3]);
        res.setJobBudget((Integer) objs[4]);
        res.setBidAmount((Integer) objs[5]);
        res.setJobDurationHours((Integer) objs[6]);
        res.setEstimatedHours((Integer) objs[7]);
        res.setStatus((Apply.Status) objs[8]);

        return res;
    }

    public static ResponseRecord.MeReviews toMeReviews(Object[] objs) {
        ResponseRecord.MeReviews res = new ResponseRecord.MeReviews();
        res.setId((Integer) objs[0]);
        res.setMeContent((String) objs[1]);
        res.setMeRating((Integer) objs[2]);
        res.setPartnerContent((String) objs[3]);
        res.setPartnerRating((Integer) objs[4]);
        res.setJobId((Integer) objs[5]);
        res.setJobTitle((String) objs[6]);
        res.setPartnerFullName((String) objs[7]);
        res.setPartnerId((Integer) objs[8]);
        return res;
    }

    public static ResponseRecord.MeJobsInProgress toMeJobsInProgress(Job job,
            boolean isFreelancer) {
        ResponseRecord.MeJobsInProgress res = new ResponseRecord.MeJobsInProgress();
        res.setBudget(job.getBudget());
        res.setClosedAt(job.getClosedAt());
        res.setDurationHours(job.getDurationHours());
        res.setId(job.getId());
        res.setLanguages(job.getLanguages().stream()
                .map(l -> new ResponseRecord.IdAndName(l.getId(), l.getName())).toList());
        res.setMajor(
                new ResponseRecord.IdAndName(job.getMajor().getId(), job.getMajor().getName()));

        if (isFreelancer) {
            res.setPartnerAvatar(job.getEmployer().getAvatar());
            res.setPartnerFullName(job.getEmployer().getFullName());
        } else {
            Freelancer freelancer =
                    job.getApplies().stream().filter(a -> a.getStatus() == Apply.Status.ACCEPT)
                            .findFirst().get().getFreelancer();
            res.setPartnerAvatar(freelancer.getAvatar());
            res.setPartnerFullName(freelancer.getFullName());
        }

        res.setPostedAt(job.getPostedAt());
        res.setSkills(job.getSkills().stream()
                .map(s -> new ResponseRecord.IdAndName(s.getId(), s.getName())).toList());
        res.setStatusMilestones(job.getMilestones().stream().map(m -> m.getStatus()).toList());
        res.setTitle(job.getTitle());

        return res;
    }
}
