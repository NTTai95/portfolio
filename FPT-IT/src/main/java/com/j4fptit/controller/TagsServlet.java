package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.TagDAO;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class TagsServlet
 */
@WebServlet("/tags")
public class TagsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public TagsServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.TAGS.getJspPath();
		request.setCharacterEncoding("UTF-8");

		int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
		int perPage = request.getParameter("perPage") == null ? 10 : Integer.valueOf(request.getParameter("perPage"));
		String search = request.getParameter("search") == null ? "" : request.getParameter("search");

		search = request.getSession().getAttribute("search") == null ? search
				: request.getSession().getAttribute("search").toString();
		request.getSession().removeAttribute("search");

		TagDAO.setByTagName(search);
		TagDAO.setStart(page);
		TagDAO.setSize(perPage);

		request.setAttribute("Tags", TagDAO.findAll());

		request.setAttribute("jspPath", jspPath);

		request.setAttribute("totalPages", TagDAO.getTotalPages());
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
