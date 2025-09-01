package com.freelancer.validations.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.freelancer.validations.validators.BeforeDaysFromNowValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation dùng để kiểm tra một giá trị ngày {@code LocalDateTime}
 * có nằm trước một số ngày nhất định tính từ ngày hiện tại hay không.
 * <p>
 * Ví dụ: {@code @BeforeDaysFromNow(days = 5)} sẽ kiểm tra giá trị ngày có phải
 * là ít nhất 5 ngày trước ngày hiện tại.
 * <p>
 * Annotation này thường được áp dụng cho các trường kiểu ngày tháng (Date,
 * LocalDate, LocalDateTime,...).
 * <p>
 * Annotation được xử lý bởi {@link BeforeDaysFromNowValidator}.
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;BeforeDaysFromNow(days = 7, message = "Ngày phải cách đây ít nhất 7 ngày")
 * private LocalDate someDate;
 * </pre>
 *
 * @author NTT
 */
@Documented
@Constraint(validatedBy = BeforeDaysFromNowValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface BeforeDaysFromNow {
    String message() default "Ngày phải là {days} ngày trước";

    /**
     * Số ngày phải nằm trước ngày hiện tại.
     *
     * @return số ngày tính từ hiện tại
     */
    int days();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
