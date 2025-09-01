package com.freelancer.validations.validators;

import java.time.LocalDateTime;

import com.freelancer.validations.annotations.BeforeDaysFromNow;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BeforeDaysFromNowValidator implements ConstraintValidator<BeforeDaysFromNow, LocalDateTime> {
    private int days;

    @Override
    public void initialize(BeforeDaysFromNow constraintAnnotation) {
        this.days = constraintAnnotation.days();
    }

    @Override
    public boolean isValid(LocalDateTime value, ConstraintValidatorContext context) {
        if (value == null)
            return true;

        LocalDateTime maxAllowedDate = LocalDateTime.now().minusDays(days);
        return value.isBefore(maxAllowedDate) || value.isEqual(maxAllowedDate);
    }

}
