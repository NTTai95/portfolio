package com.freelancer.validations.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import com.freelancer.mysql.repository.RepositoryBase;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ModelBinding {
    Class<? extends RepositoryBase<?, ?>> repository();
}

