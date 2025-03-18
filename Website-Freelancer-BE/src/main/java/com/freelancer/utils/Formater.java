package com.freelancer.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Formater {
	public static Date stringToDate(String string) {
		SimpleDateFormat sdf = new SimpleDateFormat(
				"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

		try {
			return sdf.parse(string);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static Date objectToDate(Object object) {
		SimpleDateFormat sdf = new SimpleDateFormat(
				"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

		try {
			return sdf.parse(object.toString());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	public static Boolean objectToBoolean(Object object) {
		return Boolean.parseBoolean(object.toString());
	}
}
