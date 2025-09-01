package com.freelancer.utils;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import com.freelancer.dto.requests.RequestPage.PageBase;

public class MetaSort {

    public static List<String> convert(Class<? extends PageBase> clazz) {
        try {
            Field sortField = clazz.getDeclaredField("sortField");

            Class<?> enumClass = sortField.getType();
            if (!enumClass.isEnum())
                return Collections.emptyList();

            Object[] enumConstants = enumClass.getEnumConstants();

            return Arrays.stream(enumConstants).map(e -> ((Enum<?>) e).name())
                    .collect(Collectors.toList());
        } catch (NoSuchFieldException | SecurityException e) {
            e.printStackTrace();
        }
        return Collections.emptyList();
    }
}
