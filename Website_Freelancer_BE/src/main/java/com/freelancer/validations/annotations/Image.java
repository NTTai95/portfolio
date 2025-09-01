package com.freelancer.validations.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.freelancer.validations.validators.ImageValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation dùng để xác thực file ảnh được upload (MultipartFile).
 * <p>
 * Cho phép kiểm tra các định dạng ảnh được hỗ trợ như JPEG, PNG, WEBP.
 * Có thể tùy chọn định dạng ảnh hợp lệ bằng cách cấu hình các thuộc tính
 * boolean.
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;Image(JPEG = true, PNG = true, WEBP = false, message = "Chỉ cho phép ảnh JPG và PNG")
 * private MultipartFile avatar;
 * </pre>
 *
 * <p>
 * Annotation này được xử lý bởi {@link ImageValidator}.
 * </p>
 * 
 * @author NTT
 */
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImageValidator.class)
public @interface Image {
    String message() default "File phải là hình ảnh!";

    /**
     * Cho phép định dạng JPEG (image/jpeg).
     *
     * @return true nếu cho phép JPEG
     */
    boolean JPEG() default true;

    /**
     * Cho phép định dạng PNG (image/png).
     *
     * @return true nếu cho phép PNG
     */
    boolean PNG() default true;

    /**
     * Cho phép định dạng WEBP (image/webp).
     *
     * @return true nếu cho phép WEBP
     */
    boolean WEBP() default true;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
