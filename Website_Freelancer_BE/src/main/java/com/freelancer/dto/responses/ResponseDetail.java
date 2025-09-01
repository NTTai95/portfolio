package com.freelancer.dto.responses;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

public class ResponseDetail {
    @Getter
    @Setter
    public static class Job {
        private Integer id;
        private String employerAvatar;
        private String employerFullName;
        private Integer employerAge;
        private Boolean isMale;
        private Integer employerReputation;
        private String title;
        private String description;
        private long countApplies;
        private Integer budget;
        private Integer durationHours;
        private LocalDateTime postedAt;
        private LocalDateTime closedAt;
        private String document;

        private List<String> skills;
        private List<String> languages;
        private String major;
    }

    @Getter
    @Setter
    public static class MeClient {
        private Integer id;
        private String fullName;
        private String email;
        private String phone;
        private Boolean isMale;
        private String avatar;
        private LocalDateTime joinedAt;
        private Integer requtation;
        private LocalDate birthday;
    }

    @Getter
    @Setter
    public static class MeAdmin {
        private Integer id;
        private String fullName;
        private String email;
        private String phone;
        private LocalDateTime joinedAt;
        private LocalDate birthday;
    }

    @Getter
    @Setter
    public static class Client {
        private Integer id;
        private String fullName;
        private String email;
        private String phone;
        private LocalDate birthday;
        private LocalDateTime joinedAt;
        private String avatar;
        private Boolean isMale;
        private String bio;
        private com.freelancer.mysql.model.User.Status status;
        private Role role;
        private Integer reputation;
    }

    @Getter
    @Setter
    public static class Employer extends Client {
    }

    @Getter
    @Setter
    public static class Freelancer extends Client {
        private Integer balance;
        private Float scoreReview;
        private Integer completedJobs;
        private Integer totalEarnings;
        private Float successRate;

        private List<Certification> certifications;
        private List<Education> educations;
        private List<Skill> skills;
        private List<Language> languages;
    }

    @Setter
    @Getter
    public static class Certification {
        private Integer id;
        private String name;
        private String issueBy;
        private LocalDate issueDate;
        private LocalDate expiryDate;
        private String link;
        private String frontImage;
        private String backImage;
        private com.freelancer.mysql.model.Certification.Status status;
    }

    @Getter
    @Setter
    public static class Language {
        private Integer id;
        private String name;
        private String iso;
        private com.freelancer.mysql.model.Language.Status status;
    }


    @Getter
    @Setter
    public static class Education {
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
    public static class Skill {
        private Integer id;
        private String name;
        private String description;
        private com.freelancer.mysql.model.Skill.Status status;
    }

    @Getter
    @Setter
    public static class Major {
        private Integer id;
        private String name;
        private String description;
        private com.freelancer.mysql.model.Major.Status status;
    }

    @Getter
    @Setter
    public static class Role {
        private Integer id;
        private String name;
        private String description;
    }

    @Setter
    @Getter
    public static class Conversation {
        private String id;
        private String lastMessage;
        private Long lastTime;
        private String fullName;
        private String avatar;
        private Integer userId;
        private Long unreadCount;
        private Boolean lastIsRecall;
        private Integer lastSenderId;
    }
}
