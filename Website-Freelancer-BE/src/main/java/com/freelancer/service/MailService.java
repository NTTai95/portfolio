package com.freelancer.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.freelancer.model.Mail;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;

@Service
@EnableScheduling
public class MailService {
	List<Mail> queue = new ArrayList<>();

	@Value("${spring.mail.username}")
	private String form;

	@Value("${spring.mail.password}")
	private String password;

	@Autowired
	JavaMailSender mailSender;

	public void send(Mail mail) {
		try {
			MimeMessage message = mailSender.createMimeMessage();

			MimeMessageHelper helpper = new MimeMessageHelper(message, true,
					"utf-8");
			helpper.setFrom(form);
			helpper.setTo(mail.getTo());
			helpper.setSubject(mail.getSubject());
			helpper.setText(mail.getContent(), true);

			if (mail.getAttachment() != null) {
				helpper.addAttachment(mail.getAttachment().getName(),
						mail.getAttachment());
			}

			mailSender.send(message);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void push(Mail mail) {
		queue.add(mail);
	}

	@Scheduled(fixedDelay = 1000)
	public void run() {
		while (!queue.isEmpty()) {
			this.send(queue.remove(0));
		}
	}

}
