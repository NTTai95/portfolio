package com.j4fptit.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;
import com.j4fptit.utils.RandomAvatar;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public RegisterServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.REGISTER.getJspPath();

		request.setAttribute("jspPath", jspPath);

		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String displayName = request.getParameter("displayName");
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		User user = UserDAO.findByEmail(email);
		if (user != null) {
			request.setAttribute("errorEmail", "*đã được sử dụng!");
		} else {
			String appPath = request.getServletContext().getRealPath("");
			String fileName = RandomAvatar.createRandomAvatar("avatarUser"+(UserDAO.getMaxId()+1)+".png", appPath);
			UserDAO.create(new User(null, email, displayName, password, fileName, "", 0, false, new Date(),
					null, null, null, null, null, null));
			request.getSession().setAttribute("userLogin", UserDAO.findById(UserDAO.getMaxId()));
			response.sendRedirect("/JAVA4_NEW/users/manager");
			return;
		}
		request.setAttribute("displayName", displayName);
		request.setAttribute("email", email);
		request.setAttribute("password", password);
		
		doGet(request, response);
	}

}
