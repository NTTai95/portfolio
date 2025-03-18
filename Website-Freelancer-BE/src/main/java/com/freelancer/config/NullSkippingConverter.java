package com.freelancer.config;

import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.metadata.Type;
import ma.glasnost.orika.MappingContext;

public class NullSkippingConverter<T> extends CustomConverter<T, T> {
	@Override
	public T convert(T source, Type<? extends T> destinationType,
			MappingContext context) {
		return (source == null) ? null : source;
	}
}
