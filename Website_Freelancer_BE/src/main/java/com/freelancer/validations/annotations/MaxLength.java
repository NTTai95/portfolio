package com.freelancer.validations.annotations;

import java.lang.annotation.*;

import com.freelancer.validations.validators.MaxLengthValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation để kiểm tra độ dài tối đa của chuỗi ký tự (String).
 * <p>
 * Áp dụng cho các trường dữ liệu kiểu {@link String}.
 * <p>
 * Giá trị {@code value} quy định số ký tự tối đa cho phép.
 * Nếu độ dài chuỗi vượt quá giá trị này, validation sẽ báo lỗi.
 * <p>
 * Thông báo lỗi có thể được tùy chỉnh qua thuộc tính {@code message}.
 * <p>
 * Annotation được xử lý bởi class {@link MaxLengthValidator}.
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;MaxLength(value = 50, message = "Tên không được vượt quá 50 ký tự")
 * private String name;
 * </pre>
 * 
 * @author NTT
 */
@Target(ElementType.FIELD)
@Constraint(validatedBy = MaxLengthValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MaxLength {

    /**
     * Độ dài tối đa cho phép của chuỗi ký tự.
     *
     * @return số ký tự tối đa
     */
    int value();

    String message() default "Quá dài";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
