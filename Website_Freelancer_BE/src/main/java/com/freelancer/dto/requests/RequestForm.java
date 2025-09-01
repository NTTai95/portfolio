package com.freelancer.dto.requests;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryMilestone;
import com.freelancer.mysql.repository.RepositoryPermission;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.mysql.repository.RepositoryUser;
import com.freelancer.utils.EndPoint;
import com.freelancer.validations.annotations.BeforeYearsFromNow;
import com.freelancer.validations.annotations.CollectionSize;
import com.freelancer.validations.annotations.DateRange;
import com.freelancer.validations.annotations.Exists;
import com.freelancer.validations.annotations.FileSize;
import com.freelancer.validations.annotations.IgnoreModelBinding;
import com.freelancer.validations.annotations.Image;
import com.freelancer.validations.annotations.MaxLength;
import com.freelancer.validations.annotations.MinLength;
import com.freelancer.validations.annotations.ModelBinding;
import com.freelancer.validations.annotations.Unique;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

public class RequestForm {
    @Getter
    @Setter
    @DateRange(after = "issueDate", before = "expiryDate",
            message = "Ngày cấp phải trước ngày hết hạn")
    public static class Certification {
        @NotBlank(message = "Tên chứng chỉ không được để trống")
        @MaxLength(value = 255, message = "Tên chứng chỉ tối đa 255 ký tự")
        private String name;

        @NotBlank(message = "Tên cơ quan cấp không được để trống")
        @MaxLength(value = 255, message = "Tên chứng chỉ tối đa 255 ký tự")
        private String issueBy;

        @PastOrPresent(message = "Ngày cấp phải trước hoặc là ngày hiện tại")
        private LocalDate issueDate;

        @Future(message = "Ngày hết hạn phải là ngày tương lai")
        private LocalDate expiryDate;

        @URL(message = "Link phải là một URL hợp lệ")
        @MaxLength(value = 1020, message = "Link tối đa 1020 ký tự")
        private String link;

        @Image(message = "File phải là hình ảnh!")
        private MultipartFile frontImage;

        @Image(message = "File phải là hình ảnh!")
        private MultipartFile backImage;
    }

    @Setter
    @Getter
    public static class Contact {
        @NotBlank(message = "Tiêu đề không được để trống!")
        @MaxLength(value = 255, message = "Tiêu đề tối đa 255 ký tự!")
        private String title;

        @NotBlank(message = "Nội dung không được để trống!")
        private String content;
    }

    @Setter
    @Getter
    @DateRange(after = "startDate", before = "endDate",
            message = "Ngày bắt đầu phải trước ngày kết thúc")
    public static class Education {
        @NotBlank(message = "Tên trường không được để trống!")
        @MaxLength(value = 512, message = "Tên trường tối đa 512 ký tự!")
        private String shoolName;

        @NotBlank(message = "Bằng cấp không được để trống!")
        @MaxLength(value = 512, message = "Bằng cấp tối đa 512 ký tự!")
        private String degree;

        @NotBlank(message = "Ngành học không được để trống!")
        @MaxLength(value = 512, message = "Ngành học tối đa 512 ký tự!")
        private String major;

        @NotNull(message = "Ngày bắt đầu không được để trống!")
        @DecimalMin(value = "0.0", message = "Điểm trung bình không được nhỏ hơn 0.0!")
        @DecimalMax(value = "10.0", message = "Điểm trung bình không được lớn hơn 10.0!")
        @Digits(integer = 2, fraction = 2,
                message = "Điểm trung bình phải có 2 chữ số sau dấu phẩy!")
        private Float gpa;

        @NotNull(message = "Ngày bắt đầu không được để trống!")
        @PastOrPresent(message = "Ngày bắt đầu phải là ngày hiện tại hoặc ngày trước!")
        private LocalDate startDate;

        @NotNull(message = "Ngày kết thúc không được để trống!")
        @Future(message = "Ngày kết thúc phải là ngày tương lai!")
        private LocalDate endDate;

        private String description;
    }

    @Setter
    @Getter
    public static class Report {
        @NotBlank(message = "Tiêu đề không được để trống!")
        @MaxLength(value = 255, message = "Tiêu đề tối đa 255 ký tự!")
        private String title;

        @NotBlank(message = "Nội dung không được để trống!")
        private String content;

        @NotNull(message = "ID báo cáo không được để trống!")
        @Positive(message = "ID báo cáo không hợp lệ!")
        private Integer reportId;
    }

    @Setter
    @Getter
    public static class RequestPayment {
        @NotNull(message = "Số tiền không được để trống!")
        @Min(value = 10000, message = "Số tiền tối thiểu là 10,000")
        @Max(value = 100000000, message = "Số tiền tối đa là 100,000,000")
        private Integer amount;
    }

    @Setter
    @Getter
    public static class Register {
        @NotBlank(message = "Tên đăng nhập không được để trống!")
        @MaxLength(value = 255, message = "Tên đăng nhập tối đa 255 ký tự!")
        @Pattern(regexp = "^[A-Za-zÀ-ỹ\\s]+$",
                message = "Tên đăng nhập chỉ được chứa chữ cái và khoảng trắng!")
        private String fullName;

        @NotBlank(message = "Email không được để trống!")
        @Email(message = "Email không hợp lệ!")
        @MaxLength(value = 500, message = "Email tối đa 500 ký tự!")
        @Unique(repository = RepositoryUser.class, method = "existsByEmail", field = "email",
                value = EndPoint.Unique.User.EMAIL, message = "Email đã tồn tại!")
        private String email;

        @NotBlank(message = "Mật khẩu không được để trống!")
        @MaxLength(value = 50, message = "Mật khẩu tối đa 50 ký tự!")
        @MinLength(value = 6, message = "Mật khẩu tối thiểu 6 ký tự!")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+\\-=]{6,50}$",
                message = "Mật khẩu phải có ít nhất 1 chữ cái và 1 số!")
        private String password;

        @NotNull(message = "Giới tính không được để trống!")
        private Boolean isMale;

        @NotNull(message = "Ngày sinh không được để trống!")
        @BeforeYearsFromNow(years = 18, message = "Ngày sinh phải sao ngày hiện tại 18 năm!")
        @JsonFormat(pattern = "dd/MM/yyyy")
        private LocalDate birthday;
    }

    @Getter
    @Setter
    public static class Login {
        @NotBlank(message = "Email không được để trống!")
        private String email;

        @NotBlank(message = "Mật khẩu không được để trống!")
        private String password;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositorySkill.class)
    public static class Skill {
        @NotBlank(message = "Tên kỹ năng không được để trống!")
        @MaxLength(value = 255, message = "Tên kỹ năng tối đa 255 ký tự!")
        @Unique(repository = RepositorySkill.class, field = "name",
                value = EndPoint.Unique.Skill.NAME, message = "Tên kỹ năng đã tồn tại!")
        private String name;

        @NotBlank(message = "Mô tả không được để trống!")
        @MaxLength(value = 1000, message = "Mô tả tối đa 1000 ký tự!")
        private String description;

        @NotNull(message = "Mã chuyên ngành không được để trống!")
        @Exists(repository = RepositoryMajor.class, message = "Ngành học không tồn tại!")
        @Positive(message = "Mã chuyên ngành không hợp lệ!")
        private Integer majorId;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryMajor.class)
    public static class Major {
        @NotBlank(message = "Tên chuyên ngành không được để trống!")
        @MaxLength(value = 255, message = "Tên chuyên ngành tối đa 255 ký tự!")
        @Unique(repository = RepositoryMajor.class, field = "name",
                value = EndPoint.Unique.Major.NAME, message = "Tên chuyên ngành đã tồn tại!")
        private String name;

        @NotBlank(message = "Mô tả không được để trống!")
        @MaxLength(value = 1000, message = "Mô tả tối đa 1000 ký tự!")
        private String description;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryLanguage.class)
    public static class Language {
        @NotBlank(message = "Tên ngôn ngữ không được để trống!")
        @MaxLength(value = 50, message = "Tên ngôn ngữ tối đa 50 ký tự!")
        @Unique(repository = RepositoryLanguage.class, field = "name",
                value = EndPoint.Unique.Language.NAME, message = "Tên ngôn ngữ đã tồn tại!")
        private String name;

        @NotBlank(message = "Mã ngôn ngữ không được để trống!")
        @Length(min = 2, max = 2, message = "Mã ngôn ngữ phải có 2 ký tự!")
        @Unique(repository = RepositoryLanguage.class, field = "iso",
                value = EndPoint.Unique.Language.ISO, message = "Mã ngôn ngữ đã tồn tại!")
        private String iso;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryJob.class)
    public static class JobStep1 {
        @NotBlank(message = "Tiêu đề công việc không được để trống!")
        @MinLength(value = 10, message = "Tiêu đề công việc tối thiểu 10 ký tự!")
        @MaxLength(value = 200, message = "Tiêu đề công việc tối đa 200 ký tự!")
        private String title;

        @NotNull(message = "Mã chuyên ngành không được để trống!")
        @Exists(repository = RepositoryMajor.class, message = "Chuyên ngành không tồn tại!")
        @Positive(message = "Mã chuyên ngành không hợp lệ!")
        private Integer majorId;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryJob.class)
    public static class JobStep2 {
        @CollectionSize(min = 1, max = 10, minMessage = "Ít nhất 1 kỹ năng!",
                maxMessage = "Tối đa 10 kỹ năng!")
        @Exists(repository = RepositorySkill.class, message = "Có kỹ năng không tồn tại!")
        private List<Integer> skillIds;

        @CollectionSize(min = 1, max = 5, minMessage = "Ít nhất 1 ngôn ngữ!",
                maxMessage = "Tối đa 5 ngôn ngữ!")
        @Exists(repository = RepositoryLanguage.class, message = "Có ngôn ngữ không tồn tại!")
        private List<Integer> languageIds;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryJob.class)
    public static class JobStep3 {
        @NotNull(message = "Ngân sách không được để trống!")
        @Min(value = 10000, message = "Ngân sách tối thiểu 10.000 VNĐ!")
        @Max(value = 100000000, message = "Ngân sách tối đa 100.000.000 VNĐ!")
        private Integer budget;

        @NotNull(message = "Thời gian làm việc không được để trống!")
        @Min(value = 1, message = "Thời gian làm việc tối thiểu 1 giờ!")
        @Max(value = 8760, message = "Thời gian làm việc tối đa 8760 giờ!")
        private Integer durationHours;

        @NotNull(message = "Ngày đóng không được để trống!")
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
        private LocalDateTime closedAt;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryJob.class)
    public static class JobStep4 {
        @NotBlank(message = "Mô tả công việc không được để trống!")
        @MinLength(value = 100, message = "Mô tả công việc tối thiểu 100 ký tự!")
        @MaxLength(value = 10000, message = "Mô tả công việc tối đa 10000 ký tự!")
        private String description;

        @FileSize(maxSize = 1024 * 1024 * 10, message = "Dung lượng tối đa 10MB!")
        private MultipartFile document;
    }

    @Getter
    @Setter
    public static class Apply {
        @NotBlank(message = "Nội dung không được để trống!")
        @MinLength(value = 10, message = "Nội dung tối thiểu 10 ký tự!")
        @MaxLength(value = 10000, message = "Nội dung tối đa 10000 ký tự!")
        private String content;

        @NotNull(message = "Số tiền không được để trống!")
        @Min(value = 10000, message = "Số tiền tối thiểu 10.000 VNĐ!")
        @Max(value = 100000000, message = "Số tiền tối đa 100.000.000 VNĐ!")
        private Integer bidAmount;

        @NotNull(message = "Thời gian ước tính không được để trống!")
        @Min(value = 1, message = "Thời gian ước tính tối thiểu 1 giờ!")
        @Max(value = 8760, message = "Thời gian ước tính tối đa 8760 giờ!")
        private Integer estimatedHours;
    }

    @Getter
    @Setter
    public static class Milestone {
        @NotNull(message = "Phần trăm không được để trống!")
        @Min(value = 1, message = "Phần trăm tối thiểu 1%!")
        @Max(value = 100, message = "Phần trăm tối đa 100%!")
        private Integer percent;

        @NotBlank(message = "Nội dung không được để trống!")
        @MinLength(value = 10, message = "Nội dung tối thiểu 10 ký tự!")
        @MaxLength(value = 10000, message = "Nội dung tối đa 10000 ký tự!")
        private String content;

        @NotNull(message = "Thời gian không được để trống!")
        @FutureOrPresent(message = "Thời gian không hợp lệ!")
        private LocalDateTime startAt;

        @NotNull(message = "Thời gian không được để trống!")
        @Min(value = 1, message = "Thời gian tối thiểu 1 giờ!")
        @Max(value = 8760, message = "Thời gian tối đa 8760 giờ!")
        private Integer durationHours;

        @FileSize(maxSize = 1024 * 1024 * 10, message = "Dung lượng tối đa 10MB!")
        private MultipartFile document;
    }

    @Getter
    @Setter
    public static class Product {
        @NotNull(message = "nội dung sản phẩm được để trống!")
        private MultipartFile content;

        @MinLength(value = 10, message = "Mô tả sản phẩm tối thiểu 10 ký tự!")
        @MaxLength(value = 10000, message = "Mô tả sản phẩm tối đa 10000 ký tự!")
        private String description;
    }

    @Getter
    @Setter
    public static class Dispute {

        @NotBlank(message = "Lý do không được để trống!")
        @MinLength(value = 10, message = "Lý do tối thiểu 10 ký tự!")
        @MaxLength(value = 10000, message = "Lý do tối đa 10000 ký tự!")
        private String reason;

        @NotNull(message = "milestoneId không được để trống!")
        @Exists(repository = RepositoryMilestone.class, message = "Milestone không tồn tại!")
        @Positive(message = "milestoneId không hợp lệ!")
        private Integer milestoneId;
    }

    @Getter
    @Setter
    public static class Resolve {
        @NotBlank(message = "Giải quyết không được để trống!")
        @MinLength(value = 10, message = "Giải quyết tối thiểu 10 ký tự!")
        @MaxLength(value = 10000, message = "Giải quyết tối đa 10000 ký tự!")
        private String resolution;
    }

    @Getter
    @Setter
    public static class Review {
        @NotNull(message = "Đánh giá không được để trống!")
        @MinLength(value = 100, message = "Đánh giá tối thiểu 100 ký tự!")
        @MaxLength(value = 10000, message = "Đánh giá tối đa 10000 ký tự!")
        private String content;

        @NotNull(message = "Đánh giá không được để trống!")
        @Min(value = 1, message = "Đánh giá tối thiểu 1 sao!")
        @Max(value = 5, message = "Đánh giá tối đa 5 sao!")
        private Integer rating;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryStaff.class)
    public static class Staff {
        @NotBlank(message = "Họ và tên không được để trống!")
        @MaxLength(value = 255, message = "Họ và tên tối đa 255 ký tự!")
        @Pattern(regexp = "^[A-Za-zÀ-ỹ\\s]+$",
                message = "Họ và tên chỉ được chứa chữ cái và khoảng trắng!")
        private String fullName;

        @NotNull(message = "Vai trò không được để trống!")
        @Exists(repository = RepositoryRole.class, message = "Role không tồn tại!")
        private Integer roleId;

        @NotBlank(message = "Email không được để trống!")
        @Email(message = "Email không hợp lệ!")
        @MaxLength(value = 500, message = "Email tối đa 500 ký tự!")
        @Unique(repository = RepositoryStaff.class, method = "existsByEmail", field = "email",
                value = EndPoint.Unique.User.EMAIL, message = "Email đã tồn tại!")
        private String email;

        @NotBlank(message = "Mật khẩu không được để trống!")
        @MaxLength(value = 50, message = "Mật khẩu tối đa 50 ký tự!")
        @MinLength(value = 6, message = "Mật khẩu tối thiểu 6 ký tự!")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*()_+\\-=]{6,50}$",
                message = "Mật khẩu phải có ít nhất 1 chữ cái và 1 số!")
        @IgnoreModelBinding
        private String password;

        @Unique(repository = RepositoryStaff.class, method = "existsByPhone", field = "phone",
                value = EndPoint.Unique.User.PHONE, message = "Số điện thoại đã tồn tại!")
        @Pattern(regexp = "^(\\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$",
                message = "Số điện thoại không hợp lệ!")
        private String phone;

        @NotNull(message = "Ngày sinh không được để trống!")
        @BeforeYearsFromNow(years = 18, message = "Ngày sinh phải sao ngày hiện tại 18 năm!")
        @JsonFormat(pattern = "dd/MM/yyyy")
        private LocalDate birthday;
    }

    @Getter
    @Setter
    @ModelBinding(repository = RepositoryRole.class)
    public static class Role {
        @NotBlank(message = "Tên không được để trống!")
        @MaxLength(value = 100, message = "Tên tối đa 100 ký tự!")
        @Unique(repository = RepositoryRole.class, field = "name",
                value = EndPoint.Unique.Role.NAME, message = "Tên đã tồn tại!")
        private String name;

        @NotBlank(message = "Mô tả không được để trống!")
        @MaxLength(value = 1000, message = "Mô tả tối đa 1000 ký tự!")
        private String description;

        @NotNull(message = "Quyền không được để trống!")
        @Exists(repository = RepositoryPermission.class, message = "Permission không tồn tại!")
        private List<Integer> permissionIds;
    }
}
