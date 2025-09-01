package com.freelancer.validations.annotations;

import java.lang.annotation.*;

import com.freelancer.validations.validators.InValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation {@code @In} được sử dụng để kiểm tra xem giá trị của một trường
 * (field) có thuộc tập giá trị hợp lệ đã định nghĩa sẵn hay không.
 * <p>
 * Annotation này áp dụng cho các trường kiểu chuỗi (String) và sẽ được xử lý
 * bởi lớp {@link InValidator}.
 * <p>
 * Ví dụ sử dụng:
 * 
 * <pre>
 * {@code
 * @In(value = { "ADMIN", "USER", "MANAGER" })
 * private String role;
 * }
 * </pre>
 * 
 * Trong ví dụ trên, chỉ chấp nhận giá trị "ADMIN", "USER", hoặc "MANAGER" cho
 * trường {@code role}.
 *
 * @see com.freelancer.validations.validators.InValidator
 * 
 * @author NTT
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = InValidator.class)
@Documented
public @interface In {

    /**
     * Danh sách các giá trị hợp lệ mà trường được gán annotation này phải thuộc về.
     *
     * @return Mảng các giá trị String hợp lệ.
     */
    String[] value();

    /**
     * Thông báo lỗi khi giá trị không hợp lệ.
     *
     * @return Thông báo lỗi dưới dạng String.
     */
    String message() default "Giá trị không hợp lệ!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
