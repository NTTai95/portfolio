package com.freelancer.security;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerMapping;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException {

        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");

        String endpoint = request.getRequestURI();

        Object handler = request.getAttribute(HandlerMapping.BEST_MATCHING_HANDLER_ATTRIBUTE);

        String message = "Bạn không có quyền truy cập.";

        if (handler instanceof HandlerMethod handlerMethod) {
            PreAuthorize preAuthorize = handlerMethod.getMethodAnnotation(PreAuthorize.class);
            if (preAuthorize == null) {
                preAuthorize = handlerMethod.getBeanType().getAnnotation(PreAuthorize.class);
            }

            if (preAuthorize != null) {
                message = resolveMessageFromSpEL(preAuthorize.value());
            }
        }

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", ZonedDateTime.now().toString());
        body.put("status", 403);
        body.put("error", "Forbidden");
        body.put("message",
                String.format("Bạn không được phép truy cập %s. %s", endpoint, message));

        objectMapper.writeValue(response.getOutputStream(), body);
    }

    private String resolveMessageFromSpEL(String spel) {
        List<String> messages = new ArrayList<>();

        Map<Pattern, String> patterns = Map.of(
                // ROLE
                Pattern.compile("(?<!\\!)hasRole\\('([^']+)'\\)"), "Yêu cầu vai trò: %s.",
                Pattern.compile("(?<!\\!)hasAnyRole\\(([^)]+)\\)"),
                "Yêu cầu một trong các vai trò: %s.", Pattern.compile("!hasRole\\('([^']+)'\\)"),
                "Không cho phép vai trò: %s.", Pattern.compile("!hasAnyRole\\(([^)]+)\\)"),
                "Không cho phép các vai trò: %s.",

                // AUTHORITY
                Pattern.compile("(?<!\\!)hasAuthority\\('([^']+)'\\)"), "Yêu cầu quyền: %s.",
                Pattern.compile("(?<!\\!)hasAnyAuthority\\(([^)]+)\\)"),
                "Yêu cầu một trong các quyền: %s.", Pattern.compile("!hasAuthority\\('([^']+)'\\)"),
                "Không cho phép quyền: %s.", Pattern.compile("!hasAnyAuthority\\(([^)]+)\\)"),
                "Không cho phép các quyền: %s.",

                // AUTHENTICATED
                Pattern.compile("isAuthenticated\\(\\)"), "Yêu cầu đăng nhập.");

        for (Map.Entry<Pattern, String> entry : patterns.entrySet()) {
            Matcher matcher = entry.getKey().matcher(spel);
            while (matcher.find()) {
                if (matcher.groupCount() >= 1) {
                    String rawValue = matcher.group(1);
                    String cleanedValue = cleanListValues(rawValue);
                    messages.add(String.format(entry.getValue(), cleanedValue));
                } else {
                    messages.add(entry.getValue());
                }
            }
        }

        if (messages.isEmpty()) {
            return "Không có yêu cầu đặc biệt hoặc quyền truy cập đã bị từ chối.";
        }

        return String.join(" ", messages);
    }



    private String cleanListValues(String input) {
        if (input == null)
            return "";
        return input.replaceAll("'", "").replaceAll(",", ", ");
    }
}
