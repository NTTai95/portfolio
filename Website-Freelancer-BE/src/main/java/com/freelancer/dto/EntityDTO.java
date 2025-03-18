package com.freelancer.dto;

import com.freelancer.model.EntityBase;

public interface EntityDTO<E extends EntityBase<?>> {
	E toEntity();
}
