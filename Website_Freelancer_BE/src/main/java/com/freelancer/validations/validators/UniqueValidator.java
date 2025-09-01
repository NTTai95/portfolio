package com.freelancer.validations.validators;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.HandlerMapping;

import com.freelancer.validations.annotations.Unique;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;

public class UniqueValidator implements ConstraintValidator<Unique, Object> {

    @Autowired
    private ApplicationContext appContext;

    private String methodName;
    private Class<?> domainType;
    private String field;
    private Class<? extends JpaRepository<?, ?>> repoClass;
    private JpaRepository<?, ?> repo;

    @Override
    public void initialize(Unique annotation) {
        this.repoClass = annotation.repository();
        this.methodName = annotation.method();
        this.field = annotation.field();
        this.repo = appContext.getBean(repoClass);
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (value == null || attr == null)
            return true;

        try {
            domainType = getDomainClassFromRepository(repoClass);
            HttpServletRequest request = attr.getRequest();
            String method = request.getMethod();

            if (method.equals("PUT")) {
                @SuppressWarnings("unchecked")
                Map<String, String> pathVariables = (Map<String, String>) request
                        .getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
                if (pathVariables == null)
                    return false;

                return checkUniqueUpdate(value, pathVariables);
            } else if (method.equals("POST")) {
                return checkUniqueCreate(value);
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private Class<?> getDomainClassFromRepository(Class<?> repoClass) {
        Type[] interfaces = repoClass.getGenericInterfaces();
        for (Type iface : interfaces) {
            if (iface instanceof ParameterizedType pt) {
                if (((Class<?>) pt.getRawType()).getSimpleName().equals("RepositoryBase")) {
                    return (Class<?>) pt.getActualTypeArguments()[0];
                }
            }
        }
        throw new IllegalArgumentException("Không thể xác định domain class");
    }

    private String[] getAllFieldsExcept(Class<?> clazz, String exclude) {
        return Arrays.stream(clazz.getDeclaredFields())
                .map(f -> f.getName())
                .filter(name -> !name.equals(exclude))
                .toArray(String[]::new);
    }

    private boolean checkUniqueCreate(Object value) throws Exception {
        if (methodName != null && !methodName.isEmpty()) {
            Method method = repo.getClass().getMethod(methodName, value.getClass());
            Boolean result = (Boolean) method.invoke(repo, value);

            return !result;
        }

        Object probe = domainType.getDeclaredConstructor().newInstance();
        PropertyUtils.setProperty(probe, field, value);

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths(getAllFieldsExcept(domainType, field));

        Example<?> example = Example.of(probe, matcher);

        Method existsMethod = repo.getClass().getMethod("exists", Example.class);
        boolean result = (boolean) existsMethod.invoke(repo, example);

        return !result;
    }

    private boolean checkUniqueUpdate(Object value, Map<String, String> pathVariables) throws Exception {
        Integer id = getId(pathVariables);
        if (id == null)
            return false;

        Object probe = domainType.getDeclaredConstructor().newInstance();
        PropertyUtils.setProperty(probe, field, value);

        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths(getAllFieldsExcept(domainType, field));

        Example<?> example = Example.of(probe, matcher);

        Method findAllMethod = repo.getClass().getMethod("findAll", Example.class);
        List<?> list = (List<?>) findAllMethod.invoke(repo, example);

        for (Object entity : list) {
            Object entityId = PropertyUtils.getProperty(entity, "id");
            if (entityId != null && !entityId.equals(id)) {
                return false;
            }
        }
        return true;
    }

    private Integer getId(Map<String, String> pathVariables) {
        try {
            String idStr = pathVariables.get("id");
            if (idStr == null)
                return null;
            return Integer.valueOf(idStr);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
