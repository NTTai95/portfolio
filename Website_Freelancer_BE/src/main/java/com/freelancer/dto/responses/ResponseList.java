package com.freelancer.dto.responses;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

public class ResponseList {
    @Getter
    @Setter
    public static class Language {
        private Integer id;
        private String name;
        private String iso;
    }

    @Getter
    @Setter
    public static class Skill {
        private Integer id;
        private String name;
        private String description;
    }

    @Getter
    @Setter
    public static class Major {
        private Integer id;
        private String name;
        private String description;
        private Long countJobs;
    }

    @Getter
    @Setter
    public static class Role {
        private Integer id;
        private String name;
        private String code;
        private String description;
    }

    @Getter
    @Setter
    public static class Permission {
        private Integer id;
        private String name;
        private String description;
        private String code;
    }

    @Getter
    @Setter
    public static class FreelancerSkill {
        private Integer id;
        private String name;
    }

    @Setter
    @Getter
    public static class FreelancerLanguage {
        private Integer id;
        private String name;
        private String iso;

    }

    @Getter
    @Setter
    public static class FreelancerEducation {
        private Integer id;
        private String schoolName;
        private String degree;
        private String major;
        private BigDecimal gpa;
        private LocalDate startDate;
        private LocalDate endDate;
        private String description;
    }

    @Getter
    @Setter
    public static class FreelancerCertification {
        private Integer id;
        private String name;
        private String issueBy;
        private LocalDate issueDate;
        private LocalDate expiryDate;
        private String link;
        private String frontImage;
        private String backImage;
        private String status;
    }

}
