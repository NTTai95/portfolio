package com.freelancer.config;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.freelancer.utils.VNPayUtils;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class VNPayConfig {

	@Value("${vnpay.tmnCode}")
	private String vnp_TmnCode;

	@Value("${vnpay.hashSecret}")
	private String vnp_HashSecret;

	@Value("${vnpay.payUrl}")
	private String vnp_PayUrl;

	@Value("${vnpay.returnUrl}")
	private String vnp_ReturnUrl;

	private final String vnp_Version = "2.1.0";
	private final String vnp_Command = "pay";
	private final String orderType = "other";

	public String getPaymentUrl(HttpServletRequest req, int amount,
			String vnp_OrderInfo) {
		String vnp_TxnRef = getExpireDate();
		String vnp_IpAddr = getIpAddress(req);

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", vnp_Version);
		vnp_Params.put("vnp_Command", vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
		vnp_Params.put("vnp_OrderType", orderType);
		vnp_Params.put("vnp_Locale", "vn");
		vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
		vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
		cld.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
		// Build data to hash and querystring
		List<String> fieldNames = new ArrayList<String>(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = (String) itr.next();
			String fieldValue = (String) vnp_Params.get(fieldName);
			if ((fieldValue != null) && (fieldValue.length() > 0)) {
				// Build hash data
				hashData.append(fieldName);
				hashData.append('=');
				try {
					hashData.append(URLEncoder.encode(fieldValue,
							StandardCharsets.US_ASCII.toString()));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				// Build query
				try {
					query.append(URLEncoder.encode(fieldName,
							StandardCharsets.US_ASCII.toString()));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				query.append('=');
				try {
					query.append(URLEncoder.encode(fieldValue,
							StandardCharsets.US_ASCII.toString()));
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				if (itr.hasNext()) {
					query.append('&');
					hashData.append('&');
				}
			}
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = VNPayUtils.hmacSHA512(vnp_HashSecret,
				hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = vnp_PayUrl + "?" + queryUrl;
		return paymentUrl;
	}

	public String getHashSecret() {
		return this.vnp_HashSecret;
	}

	protected String getExpireDate() {
		LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));

		LocalDateTime expireDate = now.plusHours(1);

		DateTimeFormatter formatter = DateTimeFormatter
				.ofPattern("yyyyMMddHHmmss");
		return expireDate.format(formatter);
	}

	protected String getIpAddress(HttpServletRequest req) {
		String ipAddress = req.getHeader("X-Forwarded-For");

		if (ipAddress == null || ipAddress.isEmpty()) {
			ipAddress = req.getRemoteAddr();
		}

		return ipAddress;
	}
}
