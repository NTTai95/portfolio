package com.freelancer.security;

import java.util.Date;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.repository.RepositoryUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * Lớp tiện ích để xử lý các thao tác liên quan đến JWT (JSON Web Token). Cung cấp các chức năng như
 * tạo token, lấy tên người dùng từ token, và xác minh tính hợp lệ của token.
 * <p>
 * Token được ký bằng thuật toán HS256 và một chuỗi bí mật định nghĩa trong {@link JwtProperties}.
 */
@Component
public class JwtUtils {
    private final RepositoryUser repositoryUser;
    private final JwtProperties jwtProperties;

    /**
     * Khởi tạo một thể hiện của {@code JwtUtils} với cấu hình từ {@link JwtProperties}.
     *
     * @param jwtProperties Đối tượng chứa cấu hình JWT (bí mật và thời gian hết hạn).
     */
    public JwtUtils(JwtProperties jwtProperties, RepositoryUser repositoryUser) {
        this.jwtProperties = jwtProperties;
        this.repositoryUser = repositoryUser;
    }

    /**
     * Tạo một JWT dựa trên thông tin người dùng đã xác thực.
     *
     * @param userDetails Đối tượng chứa thông tin người dùng, bao gồm tên đăng nhập và quyền truy
     *        cập.
     * @return Chuỗi JWT đã được ký hợp lệ.
     */
    public String generateJwtToken(UserDetails userDetails) {
        return Jwts.builder().setSubject(userDetails.getUsername())
                .claim("authorities",
                        userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                                .toList())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecret()).compact();
    }

    /**
     * Trích xuất tên người dùng (username/email) từ JWT.
     *
     * @param token Chuỗi JWT cần được phân tích.
     * @return (username/email) dùng được lưu trữ trong phần subject của JWT.
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token)
                .getBody().getSubject();
    }

    public Integer getUserIdFromJwtToken(String token) {
        return repositoryUser.findByEmail(getUserNameFromJwtToken(token))
                .orElseThrow(
                        () -> new DataConflictException("Không tìm thấy user với token -> email"))
                .getId();
    }

    /**
     * Kiểm tra tính hợp lệ của JWT.
     *
     * @param token Chuỗi JWT cần kiểm tra.
     * @return {@code true} nếu token hợp lệ và chưa hết hạn; {@code false} nếu không hợp lệ hoặc đã
     *         hết hạn.
     */
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
