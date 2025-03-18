package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public LoginServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.LOGIN.getJspPath();
		request.getSession().removeAttribute("userLogin");
		String prevUrl = request.getParameter("prevUrl") == null ? null : request.getParameter("prevUrl");
		if (prevUrl != null) {
			request.getSession().setAttribute("prevUrl", prevUrl);
			response.sendRedirect("/JAVA4_NEW/login");
			return;
		}

		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String prevUrl = request.getSession().getAttribute("prevUrl") == null ? null
				: request.getSession().getAttribute("prevUrl").toString();
		request.getSession().removeAttribute("prevUrl");
		
		User user = UserDAO.findByEmail(email);

		if (user != null) {
			if (user.getPassword().equals(password)) {
				request.getSession().setAttribute("userLogin", user);
				if (prevUrl != null) {
					response.sendRedirect(prevUrl);
					return;
				}
				response.sendRedirect("/JAVA4_NEW/home");
				return;
			} else {
				request.setAttribute("error", "*Thông tin đăng nhập không hợp lệ!");
			}
		} else {
			request.setAttribute("error", "*Thông tin đăng nhập không hợp lệ!");
		}
		
		request.setAttribute("email", email);
		request.setAttribute("password", password);
		doGet(request, response);
	}
}
