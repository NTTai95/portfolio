package com.freelancer.utils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.validator.constraints.Length;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.freelancer.validations.annotations.BeforeYearsFromNow;
import com.freelancer.validations.annotations.Image;
import com.freelancer.validations.annotations.In;
import com.freelancer.validations.annotations.Match;
import com.freelancer.validations.annotations.MaxLength;
import com.freelancer.validations.annotations.MinLength;
import com.freelancer.validations.annotations.Unique;
import jakarta.validation.constraints.AssertFalse;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class MetaValidation {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FieldValidation {
        private String field;
        private List<RuleValidation> rules = new ArrayList<>();
    }

    public record RuleValidation(String type, Object value, String message) {
    }

    public static List<FieldValidation> convert(Class<?> clazz) {
        List<FieldValidation> result = new ArrayList<>();

        for (Field field : clazz.getDeclaredFields()) {
            List<RuleValidation> rules = new ArrayList<>();

            for (Annotation annotation : field.getAnnotations()) {
                Class<? extends Annotation> type = annotation.annotationType();
                String ruleType = null;
                Object value = null;
                String message = null;

                if (type == NotNull.class || type == NotBlank.class || type == NotEmpty.class
                        || type == AssertTrue.class || type == AssertFalse.class
                        || type == Null.class) {
                    ruleType = "required";
                    message = getMessage(annotation);
                    value = true;
                } else if (type == Min.class) {
                    ruleType = "min";
                    value = ((Min) annotation).value();
                    message = ((Min) annotation).message();
                } else if (type == Max.class) {
                    ruleType = "max";
                    value = ((Max) annotation).value();
                    message = ((Max) annotation).message();
                } else if (type == DecimalMin.class) {
                    ruleType = "min";
                    value = ((DecimalMin) annotation).value();
                    message = ((DecimalMin) annotation).message();
                } else if (type == DecimalMax.class) {
                    ruleType = "max";
                    value = ((DecimalMax) annotation).value();
                    message = ((DecimalMax) annotation).message();
                } else if (type == Positive.class || type == PositiveOrZero.class) {
                    ruleType = "min";
                    value = 0;
                    message = getMessage(annotation);
                } else if (type == Digits.class) {
                    ruleType = "pattern";
                    Digits digits = (Digits) annotation;
                    value = "\\d{1," + digits.integer() + "}(.\\d{1," + digits.fraction() + "})?";
                    message = digits.message();
                } else if (type == Pattern.class) {
                    ruleType = "pattern";
                    Pattern p = (Pattern) annotation;
                    value = p.regexp();
                    message = p.message();
                } else if (type == Email.class) {
                    ruleType = "pattern";
                    value = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
                    message = ((Email) annotation).message();
                } else if (type == Size.class) {
                    Size size = (Size) annotation;
                    if (size.min() > 0) {
                        rules.add(new RuleValidation("minLength", size.min(), size.message()));
                    }
                    if (size.max() < Integer.MAX_VALUE) {
                        rules.add(new RuleValidation("maxLength", size.max(), size.message()));
                    }
                    continue; // Skip adding again below
                } else if (type == Past.class) {
                    ruleType = "past";
                    value = true;
                    message = ((Past) annotation).message();
                } else if (type == PastOrPresent.class) {
                    ruleType = "pastOrPresent";
                    value = true;
                    message = ((PastOrPresent) annotation).message();
                } else if (type == Future.class) {
                    ruleType = "future";
                    value = true;
                    message = ((Future) annotation).message();
                } else if (type == FutureOrPresent.class) {
                    ruleType = "futureOrPresent";
                    value = true;
                    message = ((FutureOrPresent) annotation).message();
                } else if (type == Unique.class) {
                    Unique u = (Unique) annotation;
                    ruleType = "unique";
                    value = u.value();
                    message = u.message();
                } else if (type == Match.class) {
                    Match m = (Match) annotation;
                    ruleType = "match";
                    value = m.value();
                    message = m.message();
                } else if (type == MinLength.class) {
                    ruleType = "minLength";
                    value = ((MinLength) annotation).value();
                    message = ((MinLength) annotation).message();
                } else if (type == MaxLength.class) {
                    ruleType = "maxLength";
                    value = ((MaxLength) annotation).value();
                    message = ((MaxLength) annotation).message();
                } else if (type == Length.class) {
                    ruleType = "length";
                    value = ((Length) annotation).min() + " " + ((Length) annotation).max();
                    message = ((Length) annotation).message();
                } else if (type == In.class) {
                    ruleType = "in";
                    value = ((In) annotation).value();
                    message = ((In) annotation).message();
                } else if (type == Image.class) {
                    ruleType = "image";
                    value = true;
                    message = ((Image) annotation).message();
                } else if (type == JsonFormat.class) {
                    ruleType = "jsonFormat";
                    value = ((JsonFormat) annotation).pattern();
                    message = "Không đúng định dạng -> " + ((JsonFormat) annotation).pattern();
                } else if (type == Positive.class) {
                    ruleType = "min";
                    value = 1;
                    message = getMessage(annotation);
                } else if (type == PositiveOrZero.class) {
                    ruleType = "min";
                    value = 0;
                    message = getMessage(annotation);
                } else if (type == BeforeYearsFromNow.class) {
                    ruleType = "beforeYearsFromNow";
                    value = ((BeforeYearsFromNow) annotation).years();
                    message = ((BeforeYearsFromNow) annotation).message();
                }

                if (ruleType != null) {
                    rules.add(new RuleValidation(ruleType, value, message));
                }
            }

            if (!rules.isEmpty()) {
                result.add(new FieldValidation(field.getName(), rules));
            }
        }

        return result;
    }

    private static String getMessage(Annotation annotation) {
        try {
            return (String) annotation.annotationType().getMethod("message").invoke(annotation);
        } catch (Exception e) {
            return "";
        }
    }
}
