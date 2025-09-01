package com.freelancer.validations.validators;

import com.freelancer.validations.annotations.MaxLength;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MaxLengthValidator implements ConstraintValidator<MaxLength, String> {
    private int max;

    @Override
    public void initialize(MaxLength annotation) {
        this.max = annotation.value();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null)
            return true;
        return value.length() <= max;
    }
}
