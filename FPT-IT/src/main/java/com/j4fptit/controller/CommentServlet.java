package com.j4fptit.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.AnswerCommentDAO;
import com.j4fptit.dao.AnswerDAO;
import com.j4fptit.dao.QuestionCommentDAO;
import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.model.AnswerComment;
import com.j4fptit.model.QuestionComment;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class CommentServlet
 */
@WebServlet({ "/questions/comment/add", "/questions/comment/edit", "/questions/comment/delete", "/answers/comment/add",
		"/answers/comment/edit", "/answers/comment/delete" })
public class CommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		
		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		int id = request.getParameter("id") == null ? 0 : Integer.valueOf(request.getParameter("id"));
		int idComment = 0;
		User user = request.getSession().getAttribute("userLogin") == null ? null
				: (User) request.getSession().getAttribute("userLogin");
		String content = new String(
				(request.getParameter("content") == null ? "" : request.getParameter("content")).getBytes("ISO-8859-1"),
				"UTF-8");

		if (uri.contains("/questions/comment")) {
			if (uri.contains("add")) {
				QuestionComment qc = new QuestionComment(0, content, new Date(), true, user, QuestionDAO.findById(id));
				QuestionCommentDAO.create(qc);
				idComment = QuestionCommentDAO.getMaxId();
			} else if (uri.contains("edit")) {
				QuestionComment qc = QuestionCommentDAO.findById(id);
				qc.setContent(content);
				qc.update();
				idComment = qc.getId();
			} else if (uri.contains("delete")) {
				QuestionComment qc = QuestionCommentDAO.findById(id);
				qc.delete();
				String query = request.getParameter("query") == null ? "" : "?" + request.getParameter("query");
				response.sendRedirect("/JAVA4_NEW/questions/detail" + query);
				return;
			}
		} else if (uri.contains("/answers/comment")) {
			if (uri.contains("add")) {
				AnswerComment ac = new AnswerComment(0, content, new Date(), true, user, AnswerDAO.findById(id));
				AnswerCommentDAO.create(ac);
				idComment = AnswerCommentDAO.getMaxId();
			} else if (uri.contains("edit")) {
				AnswerComment ac = AnswerCommentDAO.findById(id);
				ac.setContent(content);
				ac.update();
				idComment = ac.getId();
			} else if (uri.contains("delete")) {
				AnswerComment ac = AnswerCommentDAO.findById(id);
				ac.delete();
				String query = request.getParameter("query") == null ? "" : "?" + request.getParameter("query");
				response.sendRedirect("/JAVA4_NEW/questions/detail" + query);
				return;
			}
		}

		String query = request.getParameter("query") == null ? "" : "?" + request.getParameter("query");
		System.out.println("query: " + query);
		request.getSession().setAttribute("focusEl", "questionComment" + idComment);
		response.sendRedirect("/JAVA4_NEW/questions/detail" + query);
	}

}
