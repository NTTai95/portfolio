package com.j4fptit.utils;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class JsonResponseHelper {
	public static String getRequestBody(HttpServletRequest request) throws IOException {
		StringBuilder requestData = new StringBuilder();
		try (BufferedReader reader = request.getReader()) {
			String line;
			while ((line = reader.readLine()) != null) {
				requestData.append(line);
			}
		}
		return requestData.toString();
	}

	public static void sendJsonResponse(HttpServletResponse response, JSONObject jsonResponse) throws IOException {
		response.setContentType("application/json");
		response.getWriter().write(jsonResponse.toString());
	}
}
