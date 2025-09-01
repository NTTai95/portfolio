package com.freelancer.validations.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import com.freelancer.mysql.repository.RepositoryBase;

/**
 * Annotation dùng để đánh dấu một trường (field) là một tiêu chí lọc (filter)
 * trong hệ thống.
 * Annotation này cho phép liên kết trường đó với một phương thức truy vấn trong
 * repository để lấy danh sách các giá trị có thể lọc.
 *
 * <p>
 * Phương thức trong repository được chỉ định phải trả về một mảng các object
 * ({@code Object[]}) với tối đa 3 phần tử theo thứ tự:
 * <ul>
 * <li><b>value</b>: Giá trị lọc (bắt buộc)</li>
 * <li><b>count</b>: Số lượng tương ứng với giá trị lọc (bắt buộc)</li>
 * <li><b>label</b>: Nhãn hiển thị cho frontend (không bắt buộc, frontend có thể
 * tự đặt nếu không có)</li>
 * </ul>
 *
 * <p>
 * Annotation này thường được sử dụng trong các class DTO kế thừa từ
 * {@code PageBase} để hỗ trợ sinh danh sách các bộ lọc động.
 *
 * <pre>{@code
 * @FilterField(repository = RepositorySkill.class, method = "metaFilter")
 * private Integer skillId;
 * }</pre>
 * 
 * @author NTT
 */
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface FilterField {

    /**
     * Tên phương thức trong repository dùng để truy vấn danh sách giá trị filter.
     * Phương thức này phải trả về danh sách các {@code Object[]} có định dạng:
     * {@code new Object[] { value, count, label (optional) }}.
     *
     * @return tên phương thức trong repository
     */
    String method();

    /**
     * Repository class dùng để gọi hàm truy vấn dữ liệu filter.
     * Repository này cần kế thừa từ {@code RepositoryBase<?, ?>}.
     *
     * @return class của repository
     */
    Class<? extends RepositoryBase<?, ?>> repository();
}
