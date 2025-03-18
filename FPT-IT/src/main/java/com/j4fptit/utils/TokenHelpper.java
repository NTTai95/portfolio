package com.j4fptit.utils;

import java.security.SecureRandom;
import java.util.Base64;

import com.j4fptit.dao.TokenDAO;
import com.j4fptit.model.Token;

public class TokenHelpper {
	public static String createPasswordResetLink(String email) {
		String token = generateToken();
		long expiryTime = System.currentTimeMillis() + (3600000 / 2);

		TokenDAO.create(new Token(null, email, token, expiryTime));

		return "http://localhost:8080/JAVA4_NEW/loginwithtoken?email=" + email + "&token=" + token;
	}

	private static String generateToken() {
		SecureRandom random = new SecureRandom();
		byte[] bytes = new byte[32];
		random.nextBytes(bytes);
		return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
	}
}
