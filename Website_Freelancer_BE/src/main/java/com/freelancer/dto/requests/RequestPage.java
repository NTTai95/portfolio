package com.freelancer.dto.requests;

import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.validations.annotations.Exists;
import com.freelancer.validations.annotations.FilterField;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class RequestPage {
    @Getter
    @Setter
    public static abstract class PageBase {
        private String keyword;

        @PositiveOrZero(message = "Page phải là số dương")
        private int page = 0;

        @Positive(message = "Size phải là số dương")
        private int size = 10;

        private SortType sortType = SortType.asc;

        public enum SortType {
            asc, desc, ascend, descend
        }

        public abstract Enum<?> getSortField();
    }

    @Getter
    @Setter
    public static class Skill extends PageBase {
        @FilterField(repository = RepositoryMajor.class, method = "metaFilterBySkills")
        @Exists(repository = RepositoryMajor.class, message = "Không tìm thấy ngành nghề")
        private Integer majorId;

        @FilterField(repository = RepositorySkill.class, method = "metaFilterStatus")
        private com.freelancer.mysql.model.Skill.Status status;

        private com.freelancer.mysql.model.Skill.SortField sortField;
    }

    @Getter
    @Setter
    public static class Major extends PageBase {
        @FilterField(repository = RepositoryMajor.class, method = "metaFilterStatus")
        private com.freelancer.mysql.model.Major.Status status;

        private com.freelancer.mysql.model.Major.SortField sortField;
    }

    @Getter
    @Setter
    public static class Language extends PageBase {
        @FilterField(repository = RepositoryLanguage.class, method = "metaFilterStatus")
        private com.freelancer.mysql.model.Language.Status status;

        private com.freelancer.mysql.model.Language.SortField sortField;
    }

    @Getter
    @Setter
    public static class Cilent extends PageBase {
        @FilterField(repository = RepositoryRole.class, method = "metaFilterByClients")
        @Exists(repository = RepositoryRole.class, message = "Không tìm thấy role")
        private Integer roleId;

        @FilterField(repository = RepositoryClient.class, method = "metaFilterStatus")
        private com.freelancer.mysql.model.User.Status status;

        private com.freelancer.mysql.model.User.SortField sortField;
    }

    @Getter
    @Setter
    public static class Staff extends PageBase {
        @FilterField(repository = RepositoryRole.class, method = "metaFilterByStaffs")
        @Exists(repository = RepositoryRole.class, message = "Không tìm thấy role")
        private Integer roleId;

        @FilterField(repository = RepositoryStaff.class, method = "metaFilterStatus")
        private com.freelancer.mysql.model.User.Status status;

        private com.freelancer.mysql.model.User.SortField sortField;

    }

    @Getter
    @Setter
    public static class Role extends PageBase {
        private com.freelancer.mysql.model.Role.SortField sortField;
    }

    @Getter
    @Setter
    public static class Job extends PageBase {
        public Job() {
            super.setSize(20);
        }

        @FilterField(repository = RepositorySkill.class, method = "metaFilterByJobs")
        @Exists(repository = RepositorySkill.class, message = "Không tìm thấy kỹ năng")
        private List<Integer> skillIds;

        @FilterField(repository = RepositoryLanguage.class, method = "metaFilterByJobs")
        @Exists(repository = RepositoryLanguage.class, message = "Không tìm thấy ngôn ngữ")
        private List<Integer> languageIds;

        @PositiveOrZero(message = "Ngân sách tối thiểu phải >= 0")
        private Integer minBudget = 0;

        @Positive(message = "Ngân sách tối đa phải > 0")
        private Integer maxBudget;

        @FilterField(repository = RepositoryMajor.class, method = "metaFilterByJobs")
        @Exists(repository = RepositoryMajor.class, message = "Không tìm thấy chuyên ngành")
        private Integer majorId;

        @Positive(message = "Thời lượng làm việc tối đa phải > 0")
        private Integer maxDurationHours;

        private com.freelancer.mysql.model.Job.SortField sortField;
    }

    @Getter
    @Setter
    public static class MeApplies extends PageBase {
        private com.freelancer.mysql.model.Apply.Status status;

        private com.freelancer.mysql.model.Apply.SortField sortField;
    }

    @Getter
    @Setter
    public static class MeReviews extends PageBase {
        private com.freelancer.mysql.model.Review.SortField sortField;
    }

    @Getter
    @Setter
    public static class MeJobsInProgress extends PageBase {
        private com.freelancer.mysql.model.Job.SortField sortField;
    }
}
