package com.freelancer.config;

import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.lang.reflect.Field;
import java.util.Collection;

@Configuration
public class OrikaConfig {

	@Bean
	MapperFactory mapperFactory() {
		DefaultMapperFactory.Builder builder = new DefaultMapperFactory.Builder();
		builder.mapNulls(false); // Bỏ qua giá trị null
		MapperFactory factory = builder.build();
		return factory;
	}

	@Bean
	MapperFacade mapperFacade(MapperFactory mapperFactory) {
		return mapperFactory.getMapperFacade();
	}

	/**
	 * Merge entity2 vào entity1, bỏ qua các giá trị null từ entity2.
	 */
	public <T> void mergeEntities(T entity1, T entity2) {
		if (entity1 == null || entity2 == null)
			return;
		try {
			for (Field field : entity2.getClass().getDeclaredFields()) {
				field.setAccessible(true);
				Object value = field.get(entity2);

				if (value != null && !(value instanceof Collection
						&& ((Collection<?>) value).isEmpty())) {
					field.set(entity1, value);
				}
			}
		} catch (IllegalAccessException e) {
			throw new RuntimeException("Error merging entities", e);
		}
	}

}
