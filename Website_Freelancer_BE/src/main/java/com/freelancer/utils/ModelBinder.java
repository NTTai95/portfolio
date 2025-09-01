package com.freelancer.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.validations.annotations.IgnoreModelBinding;
import com.freelancer.validations.annotations.ModelBinding;

public class ModelBinder {

    public static Map<String, Object> bind(Class<?> requestClass, Integer id) {
        if (!requestClass.isAnnotationPresent(ModelBinding.class)) {
            throw new IllegalArgumentException("Class không có annotation @ModelBinding");
        }

        ModelBinding binding = requestClass.getAnnotation(ModelBinding.class);
        Class<?> repositoryClass = binding.repository();

        Object repository = ApplicationContextProvider.getBean(repositoryClass);

        try {
            Method findByIdMethod = Arrays.stream(repositoryClass.getMethods())
                    .filter(m -> m.getName().equals("findById") && m.getParameterCount() == 1)
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException(
                            "Không tìm thấy method findById trong repository: "
                                    + repositoryClass.getName()));
            Optional<?> modelOptional = (Optional<?>) findByIdMethod.invoke(repository, id);
            Object model = modelOptional.orElseThrow(
                    () -> new DataConflictException("Không tìm thấy model với id: " + id));

            Object requestInstance = requestClass.getDeclaredConstructor().newInstance();

            copyPropertiesAdvanced(model, requestInstance);

            return convertToMapWithId(requestInstance, id);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static void copyPropertiesAdvanced(Object source, Object target) throws Exception {
        Field[] targetFields = target.getClass().getDeclaredFields();

        for (Field targetField : targetFields) {
            if (targetField.isAnnotationPresent(IgnoreModelBinding.class)) {
                continue;
            }

            targetField.setAccessible(true);
            String targetFieldName = targetField.getName();

            String sourceFieldName;

            // Nếu là xxxIds → xxxs
            if (targetFieldName.endsWith("Ids")) {
                sourceFieldName = targetFieldName.substring(0, targetFieldName.length() - 3) + "s";
            }
            // Nếu là xxxId → xxx
            else if (targetFieldName.endsWith("Id")) {
                sourceFieldName = targetFieldName.substring(0, targetFieldName.length() - 2);
            } else {
                sourceFieldName = targetFieldName;
            }

            Field sourceField = getFieldByName(source.getClass(), sourceFieldName);
            if (sourceField == null)
                continue;

            sourceField.setAccessible(true);
            Object sourceValue = sourceField.get(source);
            if (sourceValue == null)
                continue;

            if (isListOfInteger(targetField) && isListOfEntity(sourceField)) {
                List<?> entities = (List<?>) sourceValue;
                List<Integer> ids = new ArrayList<>();

                for (Object entity : entities) {
                    Method getIdMethod = entity.getClass().getMethod("getId");
                    Integer entityId = (Integer) getIdMethod.invoke(entity);
                    ids.add(entityId);
                }

                targetField.set(target, ids);
            } else if (targetField.getType() == Integer.class
                    && !isPrimitiveOrWrapper(sourceField.getType())) {
                Method getIdMethod = sourceValue.getClass().getMethod("getId");
                Integer relatedId = (Integer) getIdMethod.invoke(sourceValue);
                targetField.set(target, relatedId);
            } else {
                targetField.set(target, sourceValue);
            }
        }
    }


    private static Field getFieldByName(Class<?> clazz, String name) {
        while (clazz != null && clazz != Object.class) {
            try {
                return clazz.getDeclaredField(name);
            } catch (NoSuchFieldException e) {
                clazz = clazz.getSuperclass();
            }
        }
        return null;
    }

    private static boolean isListOfInteger(Field field) {
        if (!List.class.isAssignableFrom(field.getType()))
            return false;
        Type genericType = field.getGenericType();
        if (genericType instanceof ParameterizedType) {
            Type arg = ((ParameterizedType) genericType).getActualTypeArguments()[0];
            return arg == Integer.class;
        }
        return false;
    }

    private static boolean isListOfEntity(Field field) {
        if (!List.class.isAssignableFrom(field.getType()))
            return false;
        Type genericType = field.getGenericType();
        if (genericType instanceof ParameterizedType) {
            Type arg = ((ParameterizedType) genericType).getActualTypeArguments()[0];
            return arg instanceof Class && !((Class<?>) arg).isPrimitive();
        }
        return false;
    }

    private static boolean isPrimitiveOrWrapper(Class<?> clazz) {
        return clazz.isPrimitive() || clazz == Integer.class || clazz == Long.class
                || clazz == Double.class || clazz == Float.class || clazz == Boolean.class
                || clazz == Byte.class || clazz == Short.class || clazz == Character.class
                || clazz == String.class;
    }

    private static Map<String, Object> convertToMapWithId(Object instance, Integer id)
            throws IllegalAccessException {
        Map<String, Object> result = new HashMap<>();
        for (Field field : instance.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            if (field.isAnnotationPresent(IgnoreModelBinding.class))
                continue;
            result.put(field.getName(), field.get(instance));
        }
        result.put("id", id);
        return result;
    }
}
