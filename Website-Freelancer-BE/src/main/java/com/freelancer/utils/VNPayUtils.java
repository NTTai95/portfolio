package com.freelancer.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class VNPayUtils {
	public static String hmacSHA512(String key, String data) {
		try {
			SecretKeySpec secretKeySpec = new SecretKeySpec(
					key.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
			Mac mac = Mac.getInstance("HmacSHA512");
			mac.init(secretKeySpec);
			byte[] hashBytes = mac
					.doFinal(data.getBytes(StandardCharsets.UTF_8));

			// Chuyển đổi sang hex
			StringBuilder hexHash = new StringBuilder();
			for (byte b : hashBytes) {
				String hex = Integer.toHexString(0xff & b);
				if (hex.length() == 1) {
					hexHash.append('0');
				}
				hexHash.append(hex);
			}
			return hexHash.toString();
		} catch (Exception e) {
			throw new RuntimeException("Lỗi khi tạo HMAC-SHA512", e);
		}
	}
}
