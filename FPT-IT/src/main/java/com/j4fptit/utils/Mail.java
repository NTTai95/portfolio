package com.j4fptit.utils;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class Mail {
	public static void send(String email, String tieuDe, String noiDung) {
		// Thông tin tài khoản Gmail
		String user = "nguyentantaivithanh@gmail.com";
		String password = "jjlp ruyq iqyo ibkz"; // Thay bằng mật khẩu ứng dụng nếu dùng xác thực 2 yếu tố

		// Cấu hình server SMTP
		Properties properties = new Properties();
		properties.put("mail.smtp.host", "smtp.gmail.com");
		properties.put("mail.smtp.port", "587"); // Cổng 587 cho TLS
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.ssl.protocols", "TLSv1.2"); // Chắc chắn sử dụng TLS 1.2

		// Khởi tạo Session
		Session session = Session.getInstance(properties, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(user, password);
			}
		});

		// Cấu hình và gửi email
		try {
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(user)); // Địa chỉ gửi
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email)); // Địa chỉ nhận
			message.setSubject(tieuDe); // Tiêu đề email
			message.setContent(noiDung, "text/html; charset=utf-8"); // Nội dung email

			// Gửi email
			Transport.send(message);
			System.out.println("Email đã được gửi thành công đến: " + email);
		} catch (MessagingException e) {
			System.err.println("Gửi email thất bại: " + e.getMessage());
			e.printStackTrace();
		}
	}
}
