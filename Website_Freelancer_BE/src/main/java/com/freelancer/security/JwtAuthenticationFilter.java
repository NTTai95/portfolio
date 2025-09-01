package com.freelancer.security;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Bộ lọc xác thực JWT được thực thi một lần cho mỗi request.
 * <p>
 * Mục tiêu của lớp này là kiểm tra xem request có mang theo JWT hợp lệ hay không. Nếu có, nó sẽ
 * thiết lập thông tin xác thực người dùng vào Spring Security Context.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    /**
     * Tiện ích để xử lý các thao tác liên quan đến JWT như xác thực và trích xuất username
     */
    @Autowired
    private JwtUtils jwtUtils;

    /** Dịch vụ tùy chỉnh để load thông tin người dùng từ username */
    @Autowired
    private CustomUserDetailsService customUserDetailService;

    /**
     * Xử lý lọc yêu cầu HTTP, trích xuất JWT từ header, xác thực token và thiết lập người dùng vào
     * SecurityContext nếu hợp lệ.
     *
     * @param request đối tượng yêu cầu HTTP
     * @param response đối tượng phản hồi HTTP
     * @param filterChain chuỗi filter để tiếp tục xử lý
     * @throws ServletException nếu có lỗi servlet
     * @throws IOException nếu có lỗi I/O
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String username = jwtUtils.getUserNameFromJwtToken(jwt);

            UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null,
                            userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Trích xuất chuỗi JWT từ header `Authorization` trong HTTP request.
     *
     * @param request yêu cầu HTTP hiện tại
     * @return chuỗi JWT nếu tồn tại và bắt đầu bằng "Bearer ", ngược lại trả về null
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); // Bỏ "Bearer " ở đầu chuỗi
        }

        return null;
    }
}
