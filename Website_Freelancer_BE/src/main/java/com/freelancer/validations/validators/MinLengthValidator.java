package com.freelancer.validations.validators;

import com.freelancer.validations.annotations.MinLength;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MinLengthValidator implements ConstraintValidator<MinLength, String> {
    private int min;

    @Override
    public void initialize(MinLength annotation) {
        this.min = annotation.value();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null)
            return true;
        return value.length() >= min;
    }
}
