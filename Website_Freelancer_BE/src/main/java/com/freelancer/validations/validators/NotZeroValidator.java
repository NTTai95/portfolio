package com.freelancer.validations.validators;

import com.freelancer.validations.annotations.NotZero;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NotZeroValidator implements ConstraintValidator<NotZero, Number> {

    @Override
    public boolean isValid(Number value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // để @NotNull xử lý riêng
        }
        return value.doubleValue() != 0;
    }
}
