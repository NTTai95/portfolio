package com.freelancer.service.mapper;

import java.util.List;
import com.freelancer.dto.responses.ResponseImpact;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.User;

public class DataToImpact {
    public static ResponseImpact.Skill skill(Skill skill, List<Object[]> freelancersImpact,
            List<Object[]> jobsImpact) {
        ResponseImpact.Skill res = new ResponseImpact.Skill();
        res.setId(skill.getId());
        res.setName(skill.getName());

        // f.id, f.fullName, f.email, f.status, (SELECT COUNT(s2) FROM Freelancer f2 JOIN f2.skills
        // s2 WHERE f2.id = f.id AND s2.id <> :id)
        freelancersImpact.stream().map(data -> {
            ResponseImpact.FreelancersAffected freelancerAffected =
                    new ResponseImpact.FreelancersAffected();
            freelancerAffected.setId((Integer) data[0]);
            freelancerAffected.setFullName((String) data[1]);
            freelancerAffected.setEmail((String) data[2]);
            freelancerAffected.setStatus((User.Status) data[3]);
            freelancerAffected.setRemainingCount((Long) data[4]);
            return freelancerAffected;
        }).forEach(res.getFreelancersAffected()::add);

        // j.id, j.title, j.status
        jobsImpact.stream().map(data -> {
            ResponseImpact.ActiveJobsAffected jobAffected = new ResponseImpact.ActiveJobsAffected();

            jobAffected.setId((Integer) data[0]);
            jobAffected.setTitle((String) data[1]);
            jobAffected.setStatus((Job.Status) data[2]);
            return jobAffected;
        }).forEach(res.getActiveJobsAffected()::add);

        return res;
    }

    public static ResponseImpact.Major major(Major major, List<Object[]> jobsImpact,
            List<Object[]> skillsImpact) {
        ResponseImpact.Major res = new ResponseImpact.Major();
        res.setId(major.getId());
        res.setName(major.getName());

        // s.id, s.name, s.status
        skillsImpact.stream().map(data -> {
            ResponseImpact.SkillsAffected skillAffected = new ResponseImpact.SkillsAffected();
            skillAffected.setId((Integer) data[0]);
            skillAffected.setName((String) data[1]);
            skillAffected.setStatus((Skill.Status) data[2]);
            return skillAffected;
        }).forEach(res.getSkillsAffected()::add);

        // j.id, j.title, j.status
        jobsImpact.stream().map(data -> {
            ResponseImpact.ActiveJobsAffected jobAffected = new ResponseImpact.ActiveJobsAffected();
            jobAffected.setId((Integer) data[0]);
            jobAffected.setTitle((String) data[1]);
            jobAffected.setStatus((Job.Status) data[2]);
            return jobAffected;
        }).forEach(res.getActiveJobsAffected()::add);

        return res;
    }

    public static ResponseImpact.Language language(Language language,
            List<Object[]> freelancersImpact, List<Object[]> jobsImpact) {
        ResponseImpact.Language res = new ResponseImpact.Language();
        res.setId(language.getId());
        res.setName(language.getName());

        // f.id, f.fullName, f.email, f.status (SELECT COUNT(l2) FROM Freelancer f2 JOIN
        // f2.languages l2 WHERE f2.id = f.id AND l2.id <> :id)
        freelancersImpact.stream().map(data -> {
            ResponseImpact.FreelancersAffected freelancerAffected =
                    new ResponseImpact.FreelancersAffected();
            freelancerAffected.setId((Integer) data[0]);
            freelancerAffected.setFullName((String) data[1]);
            freelancerAffected.setEmail((String) data[2]);
            freelancerAffected.setStatus((User.Status) data[3]);
            freelancerAffected.setRemainingCount((Long) data[4]);
            return freelancerAffected;
        }).forEach(res.getFreelancersAffected()::add);

        // j.id, j.title, j.status
        jobsImpact.stream().map(data -> {
            ResponseImpact.ActiveJobsAffected jobAffected = new ResponseImpact.ActiveJobsAffected();
            jobAffected.setId((Integer) data[0]);
            jobAffected.setTitle((String) data[1]);
            jobAffected.setStatus((Job.Status) data[2]);
            return jobAffected;
        }).forEach(res.getActiveJobsAffected()::add);

        return res;
    }
}
