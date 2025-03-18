package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.TokenDAO;
import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.User;
import com.j4fptit.utils.Mail;
import com.j4fptit.utils.PageShow;
import com.j4fptit.utils.TemplateEmail;
import com.j4fptit.utils.TokenHelpper;

/**
 * Servlet implementation class ForgetPasswordServlet
 */
@WebServlet("/forgetPassword")
public class ForgetPasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ForgetPasswordServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.FORGET_PASSWORD.getJspPath();

		String error = request.getSession().getAttribute("error") == null ? ""
				: request.getSession().getAttribute("error").toString();
		if (!error.equals("")) {
			request.setAttribute("error", error);
			request.getSession().removeAttribute("error");
		}

		String sendSuccess = request.getSession().getAttribute("sendSuccess") == null ? ""
				: request.getSession().getAttribute("sendSuccess").toString();
		if (!sendSuccess.equals("")) {
			request.setAttribute("sendSuccess", sendSuccess);
			request.getSession().removeAttribute("sendSuccess");
		}

		String email = request.getSession().getAttribute("email") == null ? ""
				: request.getSession().getAttribute("email").toString();
		if (!email.equals("")) {
			request.setAttribute("email", email);
			request.getSession().removeAttribute("email");
		}

		request.setAttribute("jspPath", jspPath);

		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String email = request.getParameter("email") == null ? "" : request.getParameter("email");

		request.getSession().setAttribute("email", email);

		if (email.equals("")) {
			request.getSession().setAttribute("error", "Vui lòng nhập email!");
			response.sendRedirect("/JAVA4_NEW/forgetPassword");
			return;
		}

		if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
			request.getSession().setAttribute("error", "Email không hợp lệ!");
			response.sendRedirect("/JAVA4_NEW/forgetPassword");
			return;
		}

		User user = UserDAO.findByEmail(email);
		if (user != null) {
			TokenDAO.deleteByEmail(email);
			Mail.send(email, "Lấy Lại mật khẩu!",
					TemplateEmail.RESET_PASSWORD_TEMPLATE1.formatted(TokenHelpper.createPasswordResetLink(email)));
			request.getSession().setAttribute("sendSuccess", true);
			response.sendRedirect("/JAVA4_NEW/forgetPassword");
			return;
		}
		
		request.getSession().setAttribute("error", "Email không tồn tại!");
		response.sendRedirect("/JAVA4_NEW/forgetPassword");
		return;
	}

}
