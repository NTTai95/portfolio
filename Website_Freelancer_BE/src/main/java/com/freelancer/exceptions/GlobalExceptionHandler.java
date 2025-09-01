package com.freelancer.exceptions;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private ResponseEntity<Object> buildResponse(HttpStatus status, String message, Object errors) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", ZonedDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        if (errors != null)
            body.put("errors", errors);
        return new ResponseEntity<>(body, status);
    }

    // ✅ Xử lý lỗi validation của @Valid (400)
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            @NonNull MethodArgumentNotValidException ex, @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status, @NonNull WebRequest request) {
        List<Object> errors = ex.getBindingResult().getFieldErrors().stream().map(error -> {
            Map<String, Object> err = new HashMap<>();
            err.put("field", error.getField());
            if (error.getField().equals("status") || error.getField().equals("type")) {
                err.put("message", "Giá trị truyền vào không hợp lệ");
            } else {
                err.put("message", error.getDefaultMessage());
            }
            err.put("rejectedValue", error.getRejectedValue());
            return err;
        }).collect(Collectors.toList());
        return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", errors);
    }

    // ✅ Xử lý lỗi 404 khi endpoint không tồn tại
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(
            @NonNull NoHandlerFoundException ex, @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status, @NonNull WebRequest request) {
        String message = String.format("Không tìm thấy endpoint: %s %s", ex.getHttpMethod(),
                ex.getRequestURL());
        return buildResponse(HttpStatus.NOT_FOUND, message, null);
    }

    // ✅ 404 - Không tìm thấy tài nguyên
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFound(ResourceNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), null);
    }

    // ✅ 405 - Không hỗ trợ phương thức
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            @NonNull HttpRequestMethodNotSupportedException ex, @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status, @NonNull WebRequest request) {

        String message =
                String.format("Method %s không có trong endpont này, các method hiện có: %s",
                        ex.getMethod(), ex.getSupportedHttpMethods());

        return buildResponse(HttpStatus.METHOD_NOT_ALLOWED, message, null);
    }

    // ✅ 409 - Xung đột dữ liệu
    @ExceptionHandler(DataConflictException.class)
    public ResponseEntity<Object> handleDataConflict(DataConflictException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), null);
    }

    // ✅ 400 - Dữ liệu gửi lên không hợp lệ
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            @NonNull HttpMessageNotReadableException ex, @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status, @NonNull WebRequest request) {

        String detailMessage =
                "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra định dạng của trường dữ liệu.";

        Throwable rootCause = ex.getRootCause();

        if (rootCause instanceof java.time.format.DateTimeParseException) {
            detailMessage = "Sai định dạng ngày. Định dạng đúng là dd/MM/yyyy hoặc yyyy-MM-dd.";
        } else if (rootCause instanceof com.fasterxml.jackson.databind.exc.InvalidFormatException invalidFormatException) {
            String fieldName = "unknown";
            String expectedType = "không rõ";

            if (!invalidFormatException.getPath().isEmpty()) {
                fieldName = invalidFormatException.getPath().get(0).getFieldName();
            }

            Class<?> targetType = invalidFormatException.getTargetType();
            expectedType = targetType.getSimpleName();

            detailMessage = String.format(
                    "Kiểu dữ liệu không hợp lệ cho trường '%s'. Dữ liệu phải có định dạng: %s.",
                    fieldName, expectedType);
        }

        return buildResponse(HttpStatus.BAD_REQUEST, detailMessage, null);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            @NonNull HttpMediaTypeNotSupportedException ex, @NonNull HttpHeaders headers,
            @NonNull HttpStatusCode status, @NonNull WebRequest request) {
        return buildResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                "Định dạng dữ liệu không đúng server yêu cầu json", null);
    }

    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity<Object> handleBadCredentials(BadCredentialsException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.FORBIDDEN, "Email hoặc mật khẩu không đúng!", null);
    }
}
