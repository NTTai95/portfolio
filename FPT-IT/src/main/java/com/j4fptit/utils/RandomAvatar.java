package com.j4fptit.utils;

import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

import java.util.Random;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;

public class RandomAvatar {
	private static final String UPLOAD_DIR = "view\\image";

	public static String createRandomAvatar(String fileName, String appPath) {
		String currentDir = createDirectory(appPath);
		File file = new File(currentDir + "\\" + fileName);

		BufferedImage avatar = ramdomImage();

		try {
			ImageIO.write(avatar, "png", file);
			System.out.println("Avatar saved at: " + file.getAbsolutePath());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileName;
	}

	public static BufferedImage ramdomImage() {
		int size = 150;
		BufferedImage avatar = new BufferedImage(size, size, BufferedImage.TYPE_INT_RGB);
		Graphics2D graphics = avatar.createGraphics();

		Random random = new Random();

		graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		graphics.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);

		Color startColor = new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
		Color endColor = new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256));
		graphics.setPaint(new java.awt.GradientPaint(0, 0, startColor, size, size, endColor));
		graphics.fillRect(0, 0, size, size);

		int circleDiameter = random.nextInt(40) + 30;
		int x = random.nextInt(size - circleDiameter);
		int y = random.nextInt(size - circleDiameter);
		graphics.setColor(new Color(random.nextInt(256), random.nextInt(256), random.nextInt(256)));
		graphics.fillOval(x, y, circleDiameter, circleDiameter);

		String initials = generateRandomInitials();
		Font font = new Font("Arial", Font.BOLD, 24);
		graphics.setFont(font);
		graphics.setColor(Color.WHITE);
		graphics.drawString(initials, size / 4, size / 2);

		graphics.dispose();
		return avatar;
	}

	private static String generateRandomInitials() {
		Random random = new Random();
		char first = (char) ('A' + random.nextInt(26));
		char second = (char) ('A' + random.nextInt(26));
		return String.valueOf(first) + second;
	}

	public static String createDirectory(String appPath) {
		String uploadPath = appPath + File.separator + UPLOAD_DIR;
		File uploadDir = new File(uploadPath);

		if (!uploadDir.exists()) {
			if (uploadDir.mkdir()) {
				System.out.println("Directory created at: " + uploadPath);
			} else {
				System.out.println("Failed to create directory.");
				return null;
			}
		} else {
			System.out.println("Directory already exists at: " + uploadPath);
		}
		return uploadPath;
	}
}
