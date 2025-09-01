package com.freelancer.validations.validators;

import java.util.Arrays;
import java.util.List;
import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.GenericTypeResolver;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.jpa.repository.JpaRepository;
import com.freelancer.mysql.repository.RepositoryBase;
import com.freelancer.validations.annotations.Exists;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ExistsValidator implements ConstraintValidator<Exists, Object> {

    @Autowired
    private ApplicationContext applicationContext;

    private String field;
    private RepositoryBase<Object, ?> repository;
    private Class<?> domainType;

    @Override
    public void initialize(Exists annotation) {
        this.field = annotation.field();
        Class<? extends JpaRepository<?, ?>> repoClass = annotation.repository();

        @SuppressWarnings("unchecked")
        RepositoryBase<Object, ?> repo =
                (RepositoryBase<Object, ?>) applicationContext.getBean(repoClass);
        this.repository = repo;

        Class<?>[] typeArgs =
                GenericTypeResolver.resolveTypeArguments(repoClass, JpaRepository.class);
        if (typeArgs == null || typeArgs.length == 0) {
            throw new IllegalStateException(
                    "Không thể xác định entity class từ repository: " + repoClass.getName());
        }
        this.domainType = typeArgs[0];
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null)
            return true;

        if (value instanceof List<?> setValue) {
            return checkMany(setValue, context);
        }

        return checkOnly(value, context);
    }

    private boolean checkOnly(Object value, ConstraintValidatorContext context) {
        try {
            Object probe = domainType.getDeclaredConstructor().newInstance();
            PropertyUtils.setProperty(probe, field, value);

            ExampleMatcher matcher = ExampleMatcher.matching()
                    .withIgnorePaths(getAllFieldsExcept(domainType, field));
            Example<Object> example = Example.of(probe, matcher);
            return repository.exists(example);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private boolean checkMany(Object value, ConstraintValidatorContext context) {
        List<?> ids = (List<?>) value;
        if (ids.isEmpty())
            return true;

        @SuppressWarnings("unchecked")
        List<Object> castedIds = (List<Object>) ids;

        @SuppressWarnings("unchecked")
        RepositoryBase<Object, Object> baseRepo = (RepositoryBase<Object, Object>) repository;

        long count = baseRepo.countByIdIn(castedIds);
        return count == castedIds.size();
    }

    private String[] getAllFieldsExcept(Class<?> clazz, String exclude) {
        return Arrays.stream(clazz.getDeclaredFields()).map(f -> f.getName())
                .filter(name -> !name.equals(exclude)).toArray(String[]::new);
    }
}
