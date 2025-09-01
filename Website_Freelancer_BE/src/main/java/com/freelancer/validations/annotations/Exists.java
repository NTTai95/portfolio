package com.freelancer.validations.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import com.freelancer.mysql.repository.RepositoryBase;
import com.freelancer.validations.validators.ExistsValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation dùng để kiểm tra sự tồn tại của một giá trị trong cơ sở dữ liệu,
 * thường dùng cho các trường khóa ngoại.
 * <p>
 * Ví dụ: Kiểm tra xem giá trị ID của một trường có tồn tại trong bảng tương ứng
 * hay không.
 * Annotation này sẽ kiểm tra dữ liệu trong biến được gán với repository và
 * trường (field) chỉ định.
 * <p>
 * Thường dùng trong các trường Entity hoặc DTO để đảm bảo rằng dữ liệu tham
 * chiếu đến một thực thể có thật.
 * <p>
 * Ví dụ sử dụng:
 * 
 * <pre>
 * &#64;Exists(repository = RepositoryIndustry.class, field = "id", message = "Industry không tồn tại")
 * private Long industryId;
 * </pre>
 *
 * <p>
 * <b>Các thuộc tính:</b>
 * </p>
 * <ul>
 * <li><code>repository</code>: Repository JPA dùng để kiểm tra sự tồn tại của
 * giá trị (bắt buộc).</li>
 * <li><code>field</code>: Tên trường trong bảng của repository cần kiểm tra
 * (mặc định là "id").</li>
 * </ul>
 *
 * @see ExistsValidator
 * 
 * @author NTT
 */
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistsValidator.class)
public @interface Exists {
    String message() default "Giá trị không tồn tại!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    /**
     * Class repository (mở rộng từ {@link RepositoryBase}) được sử dụng để
     * kiểm tra sự tồn tại của giá trị.
     *
     * @return class repository
     */
    Class<? extends RepositoryBase<?, ?>> repository();

    /**
     * Tên trường (column) trong bảng tương ứng của repository để kiểm tra
     * sự tồn tại giá trị.
     * <p>
     * Mặc định là "id".
     *
     * @return tên trường cần kiểm tra
     */
    String field() default "id";
}
