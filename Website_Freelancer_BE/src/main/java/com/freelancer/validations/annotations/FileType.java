package com.freelancer.validations.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import com.freelancer.validations.validators.FileTypeValidator;

/**
 * Annotation dùng để kiểm tra định dạng của tệp tin tải lên.
 * <p>
 * Cho phép kiểm tra theo đuôi tệp (extension) hoặc theo
 * {@link org.springframework.http.MediaType}.
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;FileType(types = { MediaType.IMAGE_JPEG_VALUE, ".png" }, message = "Chỉ cho phép JPG hoặc PNG")
 * private MultipartFile file;
 * </pre>
 *
 * <p>
 * <b>Các kiểu định dạng được hỗ trợ:</b>
 * </p>
 * <ul>
 * <li>Đuôi tệp: <code>".jpg"</code>, <code>".png"</code>,
 * <code>".pdf"</code>, ...</li>
 * <li>Mime type: <code>"image/jpeg"</code>, <code>"application/pdf"</code>,
 * ...</li>
 * </ul>
 *
 * <p>
 * Annotation này được xử lý bởi {@link FileTypeValidator}.
 * </p>
 * 
 * @author NTT
 */
@Documented
@Constraint(validatedBy = FileTypeValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface FileType {

    String message()

    default "Định dạng file không hợp lệ";

    /**
     * Danh sách định dạng tệp được chấp nhận.
     * <p>
     * Chấp nhận mime types (VD: {@code "image/jpeg"}) hoặc phần mở rộng (VD:
     * {@code ".png"}).
     *
     * @return mảng các định dạng hợp lệ
     */
    String[] types();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
