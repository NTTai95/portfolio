package com.freelancer.validations.validators;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.freelancer.validations.annotations.Image;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ImageValidator implements ConstraintValidator<Image, MultipartFile> {

    private final List<String> allowedMimeTypes = new ArrayList<>();

    @Override
    public void initialize(Image constraintAnnotation) {
        allowedMimeTypes.clear();

        if (constraintAnnotation.JPEG()) {
            allowedMimeTypes.add("image/jpeg");
        }
        if (constraintAnnotation.PNG()) {
            allowedMimeTypes.add("image/png");
        }
        if (constraintAnnotation.WEBP()) {
            allowedMimeTypes.add("image/webp");
        }
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            return true;
        }

        String contentType = file.getContentType();
        return contentType != null && allowedMimeTypes.contains(contentType.toLowerCase());
    }
}
