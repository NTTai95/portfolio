package com.freelancer.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.freelancer.dto.requests.RequestPage.PageBase;
import com.freelancer.validations.annotations.FilterField;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class MetaFilter {
    @Getter
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ItemFilter {
        private String value;
        private String label;
        private Long count;
    }

    public static <T extends PageBase> Map<String, List<ItemFilter>> convert(Class<?> clazz) {
        Map<String, List<ItemFilter>> filterMap = new HashMap<>();

        for (Field field : clazz.getDeclaredFields()) {
            FilterField annotation = field.getAnnotation(FilterField.class);
            if (annotation == null)
                continue;

            List<ItemFilter> itemFilters = fetchItemFiltersForField(field, annotation);
            filterMap.put(field.getName(), itemFilters);
        }

        return filterMap;
    }

    private static List<ItemFilter> fetchItemFiltersForField(Field field, FilterField annotation) {
        List<ItemFilter> itemFilters = new ArrayList<>();

        try {
            Object repoBean = ApplicationContextProvider.getBean(annotation.repository());
            Method method = resolveMethod(field, annotation);
            Object[] params = buildParams(field);

            List<Object[]> resultSet = invokeMethod(repoBean, method, params);

            if (field.getType().isEnum()) {
                resultSet = processEnumResult(resultSet, field.getType());
            }

            for (Object[] row : resultSet) {
                itemFilters.add(mapRowToItemFilter(row));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return itemFilters;
    }

    private static Method resolveMethod(Field field, FilterField annotation)
            throws NoSuchMethodException {
        Class<?> repoClass = annotation.repository();
        String methodName = annotation.method();

        if (field.getType().isEnum()) {
            return repoClass.getMethod(methodName, field.getType().arrayType());
        } else {
            return repoClass.getMethod(methodName);
        }
    }

    private static Object[] buildParams(Field field) {
        if (field.getType().isEnum()) {
            Object[] enumConstants = field.getType().getEnumConstants();
            return new Object[] {enumConstants};
        }
        return new Object[] {};
    }

    private static List<Object[]> invokeMethod(Object repoBean, Method method, Object[] params)
            throws InvocationTargetException, IllegalAccessException {
        @SuppressWarnings("unchecked")
        List<Object[]> result = (List<Object[]>) method.invoke(repoBean, params);
        return result;
    }

    private static ItemFilter mapRowToItemFilter(Object[] row) {
        String value = row[0] != null ? row[0].toString() : null;
        Long count = row[1] != null ? (Long) row[1] : null;
        String label = (row.length > 2) ? row[2].toString() : null;

        return new ItemFilter(value, label, count);
    }

    private static List<Object[]> processEnumResult(List<Object[]> resultSet, Class<?> enumClass) {
        List<Object[]> fullResultSet = new ArrayList<>(resultSet);

        Object[] allEnums = enumClass.getEnumConstants();
        List<String> existingKeys = new ArrayList<>();
        for (Object[] row : resultSet) {
            existingKeys.add(row[0].toString());
        }

        for (Object enumConstant : allEnums) {
            if (!existingKeys.contains(enumConstant.toString())) {
                fullResultSet.add(new Object[] {enumConstant.toString(), 0L});
            }
        }

        return fullResultSet;
    }
}
