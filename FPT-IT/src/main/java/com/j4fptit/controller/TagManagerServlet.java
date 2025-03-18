package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.TagDAO;
import com.j4fptit.model.Tag;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class TagManagerServlet
 */
@WebServlet("/tags/manager/*")
public class TagManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public TagManagerServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		int id = request.getParameter("id") == null ? -1 : Integer.parseInt(request.getParameter("id"));
		User user = request.getSession().getAttribute("userLogin") == null ? null
				: ((User) request.getSession().getAttribute("userLogin"));
		if (user != null) {
			jspPath = PageShow.TAGS_MANAGER.getJspPath();
		}
		if (id != -1) {
			Tag tag = TagDAO.findById(id);
			if (tag != null) {
				request.setAttribute("tag", tag);
			}else {
				jspPath = PageShow.Page404.getJspPath();
			}
		}

		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		int id = request.getParameter("id") == null ? -1 : Integer.parseInt(request.getParameter("id"));
		if (uri.contains("delete")) {
			if (id != -1) {
				TagDAO.findById(id).delete();
			}
		} else if (uri.contains("edit")) {
			if (id != -1) {
				Tag tag = TagDAO.findById(id);
				String tagName = request.getParameter("tagName") == null ? ""
						: new String(request.getParameter("tagName").getBytes("ISO-8859-1"), "UTF-8");
				if (tagName != "") {
					tag.setTagName(tagName);
				}

				String description = request.getParameter("description") == null ? ""
						: new String(request.getParameter("description").getBytes("ISO-8859-1"), "UTF-8");
				if (description != "") {
					tag.setDescription(description);
				}
				tag.update();
				request.getSession().setAttribute("search", tag.getTagName());
			}
		} else if (uri.contains("add")) {
			String tagName = request.getParameter("tagName") == null ? ""
					: new String(request.getParameter("tagName").getBytes("ISO-8859-1"), "UTF-8");
			String description = request.getParameter("description") == null ? ""
					: new String(request.getParameter("description").getBytes("ISO-8859-1"), "UTF-8");
			if (tagName != "" && description != "") {
				TagDAO.create(new Tag(null, tagName, description, null));
			}
		}

		response.sendRedirect("/JAVA4_NEW/tags");
	}

}
