package com.freelancer.validations.annotations;

import java.lang.annotation.*;

import com.freelancer.validations.validators.MinLengthValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation dùng để kiểm tra độ dài tối thiểu của một chuỗi (String).
 * <p>
 * Áp dụng cho các trường kiểu {@code String} để đảm bảo giá trị nhập vào
 * có độ dài ít nhất bằng giá trị chỉ định.
 * <p>
 * Ví dụ sử dụng:
 * 
 * <pre>
 * &#64;MinLength(value = 5, message = "Độ dài tối thiểu là 5 ký tự")
 * private String username;
 * </pre>
 *
 * <p>
 * Annotation này được xử lý bởi {@link MinLengthValidator}.
 * </p>
 * 
 * @author NTT
 */
@Target(ElementType.FIELD)
@Constraint(validatedBy = MinLengthValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MinLength {

    /**
     * Độ dài tối thiểu cho phép của chuỗi.
     *
     * @return độ dài tối thiểu
     */
    int value();

    String message() default "Quá ngắn";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
