package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class QuestionsServlet
 */
@WebServlet("/questions")
public class QuestionsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public QuestionsServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String jspPath = PageShow.QUESTIONS.getJspPath(); 
		
		int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
		int perPage = request.getParameter("perPage") == null ? 10 : Integer.valueOf(request.getParameter("perPage"));
		String search = request.getParameter("searchQuestion") == null ? "" : request.getParameter("searchQuestion");
		String tag = request.getParameter("tag") == null ? "": request.getParameter("tag");

		QuestionDAO.setByTagName(tag);
		QuestionDAO.setByTitle(search);
		QuestionDAO.setStart(page);
		QuestionDAO.setSize(perPage);
		
		request.setAttribute("listQuestion", QuestionDAO.findAll());
		request.setAttribute("jspPath", jspPath);
		request.setAttribute("totalPages", QuestionDAO.getTotalPages());
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println(request.getParameter("content"));
	}

}
