package com.freelancer.dto.responses;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

public class ResponseImpact {
    @Getter
    @Setter
    public static class Skill {
        private Integer id;
        private String name;

        private List<FreelancersAffected> freelancersAffected = new ArrayList<>();
        private List<ActiveJobsAffected> activeJobsAffected = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class Major {
        private Integer id;
        private String name;

        private List<ActiveJobsAffected> activeJobsAffected = new ArrayList<>();
        private List<SkillsAffected> skillsAffected = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class Language {
        private Integer id;
        private String name;

        private List<FreelancersAffected> freelancersAffected = new ArrayList<>();
        private List<ActiveJobsAffected> activeJobsAffected = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class FreelancersAffected {
        private Integer id;
        private String fullName;
        private String email;
        private com.freelancer.mysql.model.User.Status status;
        private Long remainingCount;
    }

    @Getter
    @Setter
    public static class ActiveJobsAffected {
        private Integer id;
        private String title;
        private com.freelancer.mysql.model.Job.Status status;
    }

    @Getter
    @Setter
    public static class SkillsAffected {
        private Integer id;
        private String name;
        private com.freelancer.mysql.model.Skill.Status status;
    }
}
