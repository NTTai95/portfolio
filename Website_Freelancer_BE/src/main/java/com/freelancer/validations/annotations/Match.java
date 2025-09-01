package com.freelancer.validations.annotations;

import java.lang.annotation.*;

import com.freelancer.validations.validators.MatchValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target(ElementType.FIELD)
@Constraint(validatedBy = MatchValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Match {
    String value();

    String message() default "Giá trị không khớp";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
