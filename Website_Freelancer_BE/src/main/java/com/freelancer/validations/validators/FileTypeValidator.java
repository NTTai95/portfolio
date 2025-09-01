package com.freelancer.validations.validators;

import com.freelancer.validations.annotations.FileType;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

public class FileTypeValidator implements ConstraintValidator<FileType, MultipartFile> {

    private String[] allowedTypes;

    @Override
    public void initialize(FileType constraintAnnotation) {
        this.allowedTypes = constraintAnnotation.types();
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            return true; // Cho phép file rỗng hoặc null nếu muốn
        }

        String contentType = file.getContentType();
        String originalFilename = file.getOriginalFilename();

        return Arrays.stream(allowedTypes).anyMatch(type -> {
            if (type == null || type.isEmpty()) {
                return false;
            }

            if (type.startsWith(".")) {
                // Kiểm tra đuôi file không phân biệt hoa thường
                return originalFilename != null &&
                        originalFilename.toLowerCase().endsWith(type.toLowerCase());
            } else {
                // So sánh MIME type không phân biệt hoa thường
                return contentType != null &&
                        contentType.equalsIgnoreCase(type);
            }
        });
    }
}
