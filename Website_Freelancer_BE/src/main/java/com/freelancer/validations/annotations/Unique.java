package com.freelancer.validations.annotations;

import java.lang.annotation.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.validations.validators.UniqueValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

/**
 * Annotation dùng để kiểm tra tính duy nhất của giá trị tại một trường trong cơ
 * sở dữ liệu.
 * <p>
 * Annotation này được sử dụng để đảm bảo rằng giá trị của trường (field) được
 * kiểm tra không bị trùng lặp,
 * thông qua việc gọi phương thức tương ứng trên repository được chỉ định.
 * </p>
 *
 * <p>
 * <b>Cách sử dụng:</b>
 * </p>
 * 
 * <pre>
 * &#64;Unique(value = "v1/unique/endpoint", field = "name", repository = RepositorySkill.class, method = "existsByName", message = "Tên đã tồn tại")
 * private String name;
 * </pre>
 *
 * <p>
 * <b>Giải thích các tham số:</b>
 * </p>
 * <ul>
 * <li><b>value:</b> Endpoint REST mà Frontend có thể gọi để kiểm tra tính duy
 * nhất (không bắt buộc trong server validation).</li>
 * <li><b>field:</b> Tên trường (column) cần kiểm tra tính duy nhất trong
 * database.</li>
 * <li><b>repository:</b> Class repository JPA dùng để truy vấn kiểm tra (phải
 * kế thừa JpaRepository).</li>
 * <li><b>method:</b> Tên phương thức trong repository dùng để kiểm tra (ví dụ:
 * "existsByName"). Nếu không chỉ định, mặc định validator sẽ tự xử lý.</li>
 * <li><b>message:</b> Thông báo lỗi trả về khi giá trị không duy nhất.</li>
 * </ul>
 *
 * <p>
 * Annotation này được xử lý bởi {@link UniqueValidator}.
 * </p>
 * 
 * @author NTT
 */
@Target(ElementType.FIELD)
@Constraint(validatedBy = UniqueValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Unique {

    /**
     * Endpoint để Frontend gọi kiểm tra tính duy nhất (ví dụ: "v1/unique/?").
     * Tham số này có thể dùng cho mục đích API nhưng không bắt buộc trong backend
     * validation.
     *
     * @return endpoint URL
     */
    String value();

    /**
     * Tên trường (field) cần kiểm tra tính duy nhất trong database.
     *
     * @return tên trường
     */
    String field();

    /**
     * Class repository để thực hiện việc kiểm tra tính duy nhất.
     * Repository này phải kế thừa từ {@link JpaRepository}.
     *
     * @return class repository
     */
    Class<? extends JpaRepository<?, ?>> repository();

    /**
     * Tên phương thức trong repository để thực hiện kiểm tra duy nhất.
     * Ví dụ: "existsByName".
     * Nếu không chỉ định, validator có thể tự động suy đoán hoặc sử dụng cách kiểm
     * tra mặc định.
     *
     * @return tên phương thức
     */
    String method() default "";

    String message() default "Giá trị đã tồn tại";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
