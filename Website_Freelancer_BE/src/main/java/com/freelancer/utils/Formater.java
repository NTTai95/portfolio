package com.freelancer.utils;

import java.text.Normalizer;

public class Formater {
	public static String nameToCode(String name) {
		if (name == null)
			return null;

		// Bước 1: Bỏ dấu tiếng Việt
		String normalized = Normalizer.normalize(name, Normalizer.Form.NFD);
		String noDiacritics = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

		// Bước 2: Thay khoảng trắng bằng _
		String underscored = noDiacritics.replaceAll("\\s+", "_");

		// Bước 3: In hoa toàn bộ
		return underscored.toUpperCase();
	}

	public static boolean isNullOrBlank(String s) {
		return s == null || s.isBlank();
	}
}

