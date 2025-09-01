package com.freelancer.dto.responses;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class ResponseRecord {
    @Getter
    @Setter
    public static class ReportJobPost {
        private Integer id;
        private String title;
        private String content;
        private LocalDateTime dateReport;
        private String status;
        private String reporter;
    }

    @Getter
    @Setter
    public static class Skill {
        Integer id;
        String name;
        String description;
        com.freelancer.mysql.model.Skill.Status status;
        LocalDateTime createdAt;
        String majorName;
    }

    @Setter
    @Getter
    public static class Major {
        Integer id;
        String name;
        String description;
        com.freelancer.mysql.model.Major.Status status;
        LocalDateTime createdAt;
        Long skillCount;
    }

    @Setter
    @Getter
    public static class Language {
        Integer id;
        String name;
        String iso;
        com.freelancer.mysql.model.Language.Status status;
        LocalDateTime createdAt;
    }

    @Getter
    @Setter
    public static class Staff {
        private Integer id;
        private String fullName;
        private String email;
        private com.freelancer.mysql.model.User.Status status;
        private Role role;
        private LocalDateTime joinedAt;
        private LocalDate birthday;

        @Getter
        @Setter
        @NoArgsConstructor
        public static class Role {
            private Integer id;
            private String name;
            private String code;
        }
    }

    @Getter
    @Setter
    public static class Client extends Staff {
        private String avatar;
        private Boolean isMale;
    }

    @Getter
    @Setter
    public static class Role {
        private Integer id;
        private String name;
        private String code;
        private String description;
        private Long countUsers;
    }

    @Getter
    @Setter
    public static class Job {
        private Integer id;
        private Integer employerId;
        private String employerAvatar;
        private String employerFullName;
        private String title;
        private String description;
        private Integer budget;
        private LocalDateTime postedAt;
        private LocalDateTime closedAt;
        private Integer durationHours;
        private Long countApplies;

        private List<IdAndName> skills;
        private List<IdAndName> languages;
        private IdAndName major;

    }

    @Getter
    @Setter
    public static class EmployerJob {
        private Integer id;
        private String title;
        private Integer budget;
        private String status;
        private LocalDateTime postedAt;
        private String milestone;
        private String majorName;
    }

    @Getter
    @Setter
    public static class EmployerReview {
        private Integer id;
        private String employerContent;
        private Integer employerRating;
        private LocalDateTime createdAt;
        private String freelancerName;
        private String jobTitle;
    }

    @Getter
    @Setter
    public static class EmployerMilestone {
        private Integer id;
        private String content;
        private String status;
        private Byte percent;
        private Boolean disputed;
        private Boolean isOverdue;
        private LocalDateTime startAt;
        private LocalDateTime endAt;
        private String jobTitle;
        private String freelancerName;
    }

    @Getter
    @Setter
    public static class EmployerContact {
        private Integer id;
        private String title;
        private String content;
        private String status;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    public static class MeApplies {
        private Integer id;
        private Integer jobId;
        private String jobTitle;
        private LocalDateTime createdAt;
        private Integer jobBudget;
        private Integer bidAmount;
        private Integer jobDurationHours;
        private Integer estimatedHours;
        private com.freelancer.mysql.model.Apply.Status status;
    }

    @Getter
    @Setter
    public static class MeReviews {
        private Integer id;
        private String meContent;
        private Integer meRating;
        private String partnerContent;
        private Integer partnerRating;
        private Integer jobId;
        private String jobTitle;
        private String partnerFullName;
        private Integer partnerId;
    }

    @Getter
    @Setter
    public static class MeJobsInProgress {
        private Integer id;
        private String title;
        private Integer budget;
        private LocalDateTime postedAt;
        private LocalDateTime closedAt;
        private Integer durationHours;
        private List<IdAndName> skills;
        private List<IdAndName> languages;
        private IdAndName major;
        private String partnerAvatar;
        private String partnerFullName;

        private List<com.freelancer.mysql.model.Milestone.Status> statusMilestones;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class IdAndName {
        private Integer id;
        private String name;
    }
}
