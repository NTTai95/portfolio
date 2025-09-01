package com.freelancer.validations.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import com.freelancer.validations.validators.CollectionSizeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation dùng để kiểm tra kích thước (số lượng phần tử) của một {@link java.util.Collection}
 * hoặc các kiểu dữ liệu tương tự.
 * <p>
 * Kiểm tra số lượng phần tử trong collection có nằm trong khoảng từ {@code min} đến {@code max}.
 * <p>
 * Thường áp dụng cho các trường kiểu {@code Collection<?>} như List, Set, v.v.
 *
 * <p>
 * <b>Ví dụ sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;CollectionSize(min = 1, max = 5, minMessage = "Phải có ít nhất 1 phần tử",
 *         maxMessage = "Không được quá 5 phần tử")
 * private Set&lt;String&gt; tags;
 * </pre>
 * 
 * @author NTT
 */
@Documented
@Constraint(validatedBy = CollectionSizeValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CollectionSize {

    /**
     * Số phần tử tối thiểu cho phép trong collection.
     *
     * @return số phần tử tối thiểu
     */
    int min()

    default 0;

    /**
     * Số phần tử tối đa cho phép trong collection.
     *
     * @return số phần tử tối đa
     */
    int max()

    default Integer.MAX_VALUE;

    String minMessage()

    default "Phải có ít nhất {min} phần tử";

    String maxMessage() default "Không được quá {max} phần tử";

    String message() default "Số lượng phần tử không hợp lệ";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
