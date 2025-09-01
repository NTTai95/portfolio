package com.freelancer.validations.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;
import java.time.LocalDate;

import com.freelancer.validations.annotations.DateRange;

public class DateRangeValidator implements ConstraintValidator<DateRange, Object> {

    private String afterField;
    private String beforeField;

    @Override
    public void initialize(DateRange constraintAnnotation) {
        this.afterField = constraintAnnotation.after();
        this.beforeField = constraintAnnotation.before();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        try {
            Field afterFieldObj = value.getClass().getDeclaredField(afterField);
            Field beforeFieldObj = value.getClass().getDeclaredField(beforeField);

            afterFieldObj.setAccessible(true);
            beforeFieldObj.setAccessible(true);

            Object afterValue = afterFieldObj.get(value);
            Object beforeValue = beforeFieldObj.get(value);

            if (afterValue == null || beforeValue == null) {
                return true;
            }

            if (afterValue instanceof LocalDate && beforeValue instanceof LocalDate) {
                LocalDate afterDate = (LocalDate) afterValue;
                LocalDate beforeDate = (LocalDate) beforeValue;

                return afterDate.isBefore(beforeDate);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
