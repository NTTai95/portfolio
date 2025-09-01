package com.freelancer.validations.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import com.freelancer.validations.validators.FileSizeValidator;

/**
 * Annotation để kiểm tra kích thước tối đa của tệp tin.
 * <p>
 * Có thể áp dụng cho các trường
 * {@link org.springframework.web.multipart.MultipartFile}.
 * <p>
 * Mặc định giới hạn là 5MB (5 * 1024 * 1024 bytes).
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;FileSize(maxSize = 2 * 1024 * 1024, message = "File không được vượt quá 2MB")
 * private MultipartFile file;
 * </pre>
 *
 * @author NTT
 */
@Documented
@Constraint(validatedBy = FileSizeValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface FileSize {
    String message() default "File vượt quá kích thước cho phép";

    /**
     * Kích thước tối đa của file tính bằng byte.
     * Ví dụ: 2 * 1024 * 1024 = 2MB.
     *
     * @return giới hạn kích thước file
     */
    long maxSize() default 5 * 1024 * 1024;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
