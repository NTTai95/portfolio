package com.freelancer.utils;

import java.util.UUID;

public class GenerateToken {
	/**
	 * Tạo token ngẫu nhiên để lưu vào database.
	 * 
	 * @return Token dưới dạng chuỗi String.
	 */
	public static String generate() {
		return UUID.randomUUID().toString();
	}
}
