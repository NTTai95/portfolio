package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.UserDAO;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class Users
 */
@WebServlet("/users")
public class UsersServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UsersServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.USERS.getJspPath();

		int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
		int perPage = request.getParameter("perPage") == null ? 10 : Integer.valueOf(request.getParameter("perPage"));
		String search = request.getParameter("search") == null ? "" : request.getParameter("search");
		
		UserDAO.setByDisplayName(search);
		UserDAO.setStart(page);
		UserDAO.setSize(perPage);

		request.setAttribute("listUser", UserDAO.findAll());

		request.setAttribute("jspPath", jspPath);

		request.setAttribute("totalPages", UserDAO.getTotalPages());
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
