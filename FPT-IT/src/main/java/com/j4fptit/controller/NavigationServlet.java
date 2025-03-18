package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.utils.PageShow;

@WebServlet()

public class NavigationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public NavigationServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		String jspPath = PageShow.Page404.getJspPath();

		for (PageShow pageShow : PageShow.values()) {
			if (uri.equals(pageShow.getUri())) {
				jspPath = pageShow.getJspPath();
				break;
			}
		}

		request.setAttribute("jspPath", jspPath);

		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

}
