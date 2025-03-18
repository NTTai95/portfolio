package com.freelancer.utils;

import org.springframework.data.domain.Sort;

public class Sorter {
	public static Sort ASC(String field) {
	    return Sort.by(Sort.Order.asc(field));
	}
	
	public static Sort DESC(String field) {
	    return Sort.by(Sort.Order.desc(field));
	}
	
	 public static Sort multiple(Sort... sorts) {
	        Sort.Order[] orders = new Sort.Order[sorts.length];
	        for (int i = 0; i < sorts.length; i++) {
	            orders[i] = sorts[i].get().toArray(Sort.Order[]::new)[0];
	        }
	        return Sort.by(orders);
	    }
}
