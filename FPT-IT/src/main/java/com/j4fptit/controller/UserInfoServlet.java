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
 * Servlet implementation class UserInfoServlet
 */
@WebServlet("/users/info")
public class UserInfoServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UserInfoServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		int id = request.getParameter("id") == null ? -1 : Integer.valueOf(request.getParameter("id"));
		User user = UserDAO.findById(id);
		if (id != -1 && user != null) {
			jspPath = PageShow.USERS_INFO.getJspPath();
		}

		request.setAttribute("user", user);
		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
