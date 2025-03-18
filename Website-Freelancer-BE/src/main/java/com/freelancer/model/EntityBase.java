package com.freelancer.model;

import com.freelancer.dto.EntityDTO;

public interface EntityBase<D extends EntityDTO<?>> {
	D toDto();
}
