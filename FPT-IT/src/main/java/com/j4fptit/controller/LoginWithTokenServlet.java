package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.TokenDAO;
import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.Token;
import com.j4fptit.model.User;


/**
 * Servlet implementation class LoginWithTokenServlet
 */
@WebServlet("/loginwithtoken")
public class LoginWithTokenServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public LoginWithTokenServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String email = request.getParameter("email");
		String tokenString = request.getParameter("token");
		User user = UserDAO.findByEmail(email);
		Token token = TokenDAO.findByToken(tokenString);
		if (token != null && user != null) {
			if (token.getEmail().equals(email) && token.getExpiryTime() > System.currentTimeMillis()) {
				request.getSession().setAttribute("userLogin", user);
				request.getSession().setAttribute("fillPassword", true);
				request.getSession().setAttribute("toTab", "changePassword");
				response.sendRedirect("/JAVA4_NEW/users/manager");
				TokenDAO.deleteById(token.getId());
				return;
			}
		}
		response.sendRedirect("/JAVA4_NEW/home");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
