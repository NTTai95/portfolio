package com.freelancer.validations.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Collection;

import com.freelancer.validations.annotations.CollectionSize;

public class CollectionSizeValidator implements ConstraintValidator<CollectionSize, Collection<?>> {

    private int min;
    private int max;
    private String minMessage;
    private String maxMessage;

    @Override
    public void initialize(CollectionSize constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
        this.minMessage = constraintAnnotation.minMessage();
        this.maxMessage = constraintAnnotation.maxMessage();
    }

    @Override
    public boolean isValid(Collection<?> value, ConstraintValidatorContext context) {
        if (value == null)
            return false;

        int size = value.size();

        if (size < min) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(minMessage.replace("{min}", String.valueOf(min)))
                    .addConstraintViolation();
            return false;
        }

        if (size > max) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(maxMessage.replace("{max}", String.valueOf(max)))
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
