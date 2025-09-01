package com.freelancer.service.mapper;

import com.freelancer.dto.responses.ResponseList;
import com.freelancer.mysql.model.Certification;
import com.freelancer.mysql.model.Education;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Skill;

public class DataToList {
    // l.id, l.name, l.iso
    public static ResponseList.Language language(Object[] objs) {
        ResponseList.Language language = new ResponseList.Language();
        language.setId((Integer) objs[0]);
        language.setName((String) objs[1]);
        language.setIso((String) objs[2]);
        return language;
    }

    // s.id, s.name, s.description
    public static ResponseList.Skill skill(Object[] objs) {
        ResponseList.Skill skill = new ResponseList.Skill();
        skill.setId((Integer) objs[0]);
        skill.setName((String) objs[1]);
        skill.setDescription((String) objs[2]);
        return skill;
    }

    // m.id, m.name, m.description
    public static ResponseList.Major major(Object[] objs) {
        ResponseList.Major major = new ResponseList.Major();
        major.setId((Integer) objs[0]);
        major.setName((String) objs[1]);
        major.setDescription((String) objs[2]);
        return major;
    }

    // r.id, r.name, r.code, r.description
    public static ResponseList.Role role(Object[] objs) {
        ResponseList.Role role = new ResponseList.Role();
        role.setId((Integer) objs[0]);
        role.setName((String) objs[1]);
        role.setCode((String) objs[2]);
        role.setDescription((String) objs[3]);
        return role;
    }

    // p.id, p.name, p.description, p.code
    public static ResponseList.Permission permission(Object[] objs) {
        ResponseList.Permission permission = new ResponseList.Permission();
        permission.setId((Integer) objs[0]);
        permission.setName((String) objs[1]);
        permission.setDescription((String) objs[2]);
        permission.setCode((String) objs[3]);
        return permission;
    }

    // -------------------- FREELANCER --------------------
    public static ResponseList.FreelancerSkill toFreelancerSkill(Skill skill) {
        ResponseList.FreelancerSkill dto = new ResponseList.FreelancerSkill();
        dto.setId(skill.getId());
        dto.setName(skill.getName());
        return dto;
    }

    public static ResponseList.FreelancerLanguage toFreelancerLanguage(Language language) {
        ResponseList.FreelancerLanguage dto = new ResponseList.FreelancerLanguage();
        dto.setId(language.getId());
        dto.setName(language.getName());
        dto.setIso(language.getIso());
        return dto;
    }

    public static ResponseList.FreelancerEducation toFreelancerEducation(Education education) {
        ResponseList.FreelancerEducation dto = new ResponseList.FreelancerEducation();
        dto.setId(education.getId());
        dto.setSchoolName(education.getSchoolName());
        dto.setDegree(education.getDegree());
        dto.setMajor(education.getMajor());
        dto.setGpa(education.getGpa());
        dto.setStartDate(education.getStartDate());
        dto.setEndDate(education.getEndDate());
        dto.setDescription(education.getDescription());
        return dto;
    }

    public static ResponseList.FreelancerCertification toFreelancerCertification(
            Certification cert) {
        ResponseList.FreelancerCertification certDto = new ResponseList.FreelancerCertification();
        certDto.setId(cert.getId());
        certDto.setName(cert.getName());
        certDto.setIssueBy(cert.getIssueBy());
        certDto.setIssueDate(cert.getIssueDate());
        certDto.setExpiryDate(cert.getExpiryDate());
        certDto.setLink(cert.getLink());
        certDto.setFrontImage(cert.getFrontImage());
        certDto.setBackImage(cert.getBackImage());
        certDto.setStatus(cert.getStatus().name()); // chuyển enum sang String
        return certDto;
    }

}
