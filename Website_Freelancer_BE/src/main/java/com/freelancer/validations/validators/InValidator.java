package com.freelancer.validations.validators;

import java.util.ArrayList;
import java.util.List;
import com.freelancer.validations.annotations.In;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class InValidator implements ConstraintValidator<In, String> {

    private List<String> validValues;

    @Override
    public void initialize(In constraintAnnotation) {
        String[] values = constraintAnnotation.value();
        validValues = new ArrayList<>();
        for (String v : values) {
            validValues.add(v);
        }
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null)
            return true;
        return validValues.contains(value);
    }
}
