package com.freelancer.validations.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

import com.freelancer.validations.annotations.BeforeYearsFromNow;

public class BeforeYearsFromNowValidator implements ConstraintValidator<BeforeYearsFromNow, LocalDate> {

    private int years;

    @Override
    public void initialize(BeforeYearsFromNow constraintAnnotation) {
        this.years = constraintAnnotation.years();
    }

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (value == null)
            return true;

        LocalDate maxAllowedDate = LocalDate.now().minusYears(years);
        return value.isBefore(maxAllowedDate) || value.isEqual(maxAllowedDate);
    }
}
