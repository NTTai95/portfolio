package com.freelancer.validations.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import com.freelancer.validations.validators.BeforeYearsFromNowValidator;

/**
 * Annotation dùng để kiểm tra rằng một ngày kiểu {@code LocalDate}
 * phải là trước một số năm nhất định tính từ ngày hiện tại.
 * <p>
 * Ví dụ, nếu {@code years = 5}, thì ngày được kiểm tra phải là trước ít nhất 5
 * năm so với ngày hôm nay.
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;BeforeYearsFromNow(years = 18, message = "Ngày sinh phải cách đây ít nhất 18 năm")
 * private LocalDate birthDate;
 * </pre>
 *
 * <p>
 * Annotation này được xử lý bởi {@link BeforeYearsFromNowValidator}.
 * </p>
 * 
 * @author NTT
 */
@Documented
@Constraint(validatedBy = BeforeYearsFromNowValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface BeforeYearsFromNow {
    String message() default "Ngày phải là {years} năm trước";

    /**
     * Số năm phải cách ngày hiện tại.
     *
     * @return số năm
     */
    int years();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
