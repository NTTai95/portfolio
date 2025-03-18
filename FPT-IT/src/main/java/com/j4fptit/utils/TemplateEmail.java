package com.j4fptit.utils;

public class TemplateEmail {
	public static final String RESET_PASSWORD_TEMPLATE1 = """
									<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Reset Password</title>
			</head>
			<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; color: #333;">
			  <div style="max-width: 400px; margin: 20px auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
			    <h2 style="text-align: center; color: #007bff;">Xin chào!</h2>
			    <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng nhấn vào liên kết bên dưới để đặt lại mật khẩu:</p>
			    <div style="text-align: center; margin: 20px 0;">
			      <a href="%s" style="display: inline-block; text-decoration: none; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 4px; font-size: 16px; cursor: pointer;">Đặt lại mật khẩu</a>
			    </div>
			    <p>Lưu ý: Liên kết này sẽ hết hạn sau <strong>30 phút</strong>. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
			    <p style="margin-top: 20px; text-align: center; font-size: 0.9em; color: #555;">
			      Trân trọng,<br>Đội ngũ hỗ trợ
			    </p>
			  </div>
			</body>
			</html>


									""";

	public static final String RESET_PASSWORD_TEMPLATE2 = """
						<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Reset Password Request</title>
			</head>
			<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f0f0f0; color: #333;">
			  <div style="max-width: 500px; margin: 20px auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
			    <h2 style="text-align: center; color: #28a745;">Yêu cầu đặt lại mật khẩu</h2>
			    <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Để hoàn tất quá trình, vui lòng nhấn vào liên kết dưới đây:</p>
			    <div style="text-align: center; margin: 20px 0;">
			      <a href="%s" style="display: inline-block; text-decoration: none; background-color: #28a745; color: #ffffff; padding: 12px 24px; border-radius: 5px; font-size: 16px; cursor: pointer;">Đặt lại mật khẩu</a>
			    </div>
			    <p>Lưu ý: Liên kết này sẽ hết hạn sau 30 phút. Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
			    <p style="text-align: center; font-size: 0.9em; color: #777;">
			      Trân trọng,<br>Đội ngũ hỗ trợ
			    </p>
			  </div>
			</body>
			</html>

						""";
	public static final String RESET_PASSWORD_TEMPLATE3 = """
						<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Reset Password Request</title>
			</head>
			<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333;">
			  <div style="max-width: 450px; margin: 20px auto; background: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
			    <h2 style="text-align: center; color: #dc3545;">Quên mật khẩu?</h2>
			    <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Để thực hiện việc này, vui lòng nhấn vào liên kết bên dưới:</p>
			    <div style="text-align: center; margin: 20px 0;">
			      <a href="%s" style="display: inline-block; text-decoration: none; background-color: #dc3545; color: #ffffff; padding: 12px 24px; border-radius: 4px; font-size: 16px; cursor: pointer;">Đặt lại mật khẩu</a>
			    </div>
			    <p><strong>Lưu ý:</strong> Liên kết này sẽ hết hạn sau <strong>30 phút</strong>. Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
			    <p style="text-align: center; font-size: 0.9em; color: #555;">
			      Trân trọng,<br>Đội ngũ hỗ trợ
			    </p>
			  </div>
			</body>
			</html>

						""";

	public static final String RESET_PASSWORD_TEMPLATE4 = """
						<!DOCTYPE html>
			<html lang="en">
			<head>
			  <meta charset="UTF-8">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
			  <title>Reset Password</title>
			</head>
			<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #fafafa; color: #333;">
			  <div style="max-width: 480px; margin: 20px auto; background: #ffffff; border: 1px solid #ddd; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
			    <h3 style="text-align: center; color: #17a2b8;">Đặt lại mật khẩu của bạn</h3>
			    <p style="text-align: center;">Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu. Để tiếp tục, vui lòng nhấn vào nút dưới đây:</p>
			    <div style="text-align: center; margin: 20px 0;">
			      <a href="%s" style="text-decoration: none; background-color: #17a2b8; color: white; padding: 12px 28px; border-radius: 5px; font-size: 16px; cursor: pointer;">Đặt lại mật khẩu</a>
			    </div>
			    <p style="text-align: center;">Liên kết này sẽ hết hạn sau <strong>30 phút</strong>.</p>
			    <p style="text-align: center; font-size: 0.9em; color: #555;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
			  </div>
			</body>
			</html>

						""";
}
