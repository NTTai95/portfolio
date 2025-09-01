package com.freelancer.validations.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.lang.reflect.Field;

import com.freelancer.validations.annotations.Match;

public class MatchValidator implements ConstraintValidator<Match, Object> {
    private String matchFieldName;

    @Override
    public void initialize(Match annotation) {
        this.matchFieldName = annotation.value();
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        try {
            Field[] fields = obj.getClass().getDeclaredFields();
            Field mainField = null;
            Field matchField = null;

            for (Field field : fields) {
                if (field.isAnnotationPresent(Match.class)) {
                    mainField = field;
                }
                if (field.getName().equals(matchFieldName)) {
                    matchField = field;
                }
            }

            if (mainField == null || matchField == null)
                return false;

            mainField.setAccessible(true);
            matchField.setAccessible(true);

            Object value1 = mainField.get(obj);
            Object value2 = matchField.get(obj);

            return value1 == null ? value2 == null : value1.equals(value2);
        } catch (Exception e) {
            return false;
        }
    }
}
