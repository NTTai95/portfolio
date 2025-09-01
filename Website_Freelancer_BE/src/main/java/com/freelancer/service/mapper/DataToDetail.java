package com.freelancer.service.mapper;

import java.time.LocalDate;
import java.time.Period;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Staff;

public class DataToDetail {

        public static ResponseDetail.Job job(Job job) {
                ResponseDetail.Job res = new ResponseDetail.Job();

                res.setBudget(job.getBudget());
                res.setClosedAt(job.getClosedAt());
                res.setCountApplies((long) job.getApplies().size());
                res.setDescription(job.getDescription());
                res.setDocument(job.getDocument());
                res.setDurationHours(job.getDurationHours());
                res.setEmployerAge(Period.between(job.getEmployer().getBirthday(), LocalDate.now())
                                .getYears());
                res.setEmployerAvatar(job.getEmployer().getAvatar());
                res.setEmployerFullName(job.getEmployer().getFullName());
                res.setId(job.getId());
                res.setIsMale(job.getEmployer().getIsMale());
                res.setLanguages(job.getLanguages().stream().map(l -> l.getName()).toList());
                res.setMajor(job.getMajor().getName());
                res.setPostedAt(job.getPostedAt());
                res.setEmployerReputation(job.getEmployer().getReputation());
                res.setSkills(job.getSkills().stream().map(s -> s.getName()).toList());
                res.setTitle(job.getTitle());
                return res;
        }

        public static ResponseDetail.MeClient meClient(Client profile) {
                ResponseDetail.MeClient res = new ResponseDetail.MeClient();
                res.setFullName(profile.getFullName());
                res.setId(profile.getId());
                res.setAvatar(profile.getAvatar());
                res.setBirthday(profile.getBirthday());
                res.setEmail(profile.getEmail());
                res.setIsMale(profile.getIsMale());
                res.setPhone(profile.getPhone());
                res.setJoinedAt(profile.getJoinedAt());
                res.setRequtation(profile.getReputation());

                return res;
        }

        public static ResponseDetail.MeAdmin meAdmin(Staff admin) {
                ResponseDetail.MeAdmin res = new ResponseDetail.MeAdmin();
                res.setFullName(admin.getFullName());
                res.setId(admin.getId());
                res.setBirthday(admin.getBirthday());
                res.setEmail(admin.getEmail());
                res.setPhone(admin.getPhone());
                res.setJoinedAt(admin.getJoinedAt());

                return res;
        }

        public static ResponseDetail.Freelancer toFreelancer(Freelancer freelancer) {
                ResponseDetail.Freelancer res =
                                megreClient(freelancer, new ResponseDetail.Freelancer());
                res.setBalance(freelancer.getBalance());

                res.setCertifications(freelancer.getCertifications().stream().map(c -> {
                        ResponseDetail.Certification cer = new ResponseDetail.Certification();
                        cer.setBackImage(c.getBackImage());
                        cer.setExpiryDate(c.getExpiryDate());
                        cer.setFrontImage(c.getFrontImage());
                        cer.setId(c.getId());
                        cer.setIssueBy(c.getIssueBy());
                        cer.setIssueDate(c.getIssueDate());
                        cer.setLink(c.getLink());
                        cer.setName(c.getName());
                        cer.setStatus(c.getStatus());

                        return cer;
                }).toList());

                res.setEducations(freelancer.getEducations().stream().map(e -> {
                        ResponseDetail.Education edu = new ResponseDetail.Education();
                        edu.setDegree(e.getDegree());
                        edu.setDescription(e.getDescription());
                        edu.setEndDate(e.getEndDate());
                        edu.setGpa(e.getGpa());
                        edu.setId(e.getId());
                        edu.setMajor(e.getMajor());
                        edu.setSchoolName(e.getSchoolName());
                        edu.setStartDate(e.getStartDate());

                        return edu;
                }).toList());

                res.setLanguages(freelancer.getLanguages().stream().map(l -> {
                        ResponseDetail.Language lan = new ResponseDetail.Language();
                        lan.setId(l.getId());
                        lan.setIso(l.getIso());
                        lan.setName(l.getName());
                        lan.setStatus(l.getStatus());
                        return lan;
                }).toList());

                res.setSkills(freelancer.getSkills().stream().map(s -> {
                        ResponseDetail.Skill skill = new ResponseDetail.Skill();
                        skill.setId(s.getId());
                        skill.setName(s.getName());
                        skill.setStatus(s.getStatus());
                        return skill;
                }).toList());

                return res;
        }

        public static ResponseDetail.Employer toEmployerInfo(Employer employer) {
                return megreClient(employer, new ResponseDetail.Employer());
        }

        private static <T extends ResponseDetail.Client> T megreClient(Client source, T target) {
                target.setId(source.getId());
                target.setFullName(source.getFullName());
                target.setEmail(source.getEmail());
                target.setPhone(source.getPhone());
                target.setBirthday(source.getBirthday());
                target.setJoinedAt(source.getJoinedAt());
                target.setAvatar(source.getAvatar());
                target.setIsMale(source.getIsMale());
                target.setBio(source.getBio());
                target.setReputation(source.getReputation());
                target.setStatus(source.getStatus());
                ResponseDetail.Role role = new ResponseDetail.Role();
                role.setDescription(source.getRole().getDescription());
                role.setId(source.getRole().getId());
                role.setName(source.getRole().getName());
                target.setRole(role);
                return target;
        }

}
