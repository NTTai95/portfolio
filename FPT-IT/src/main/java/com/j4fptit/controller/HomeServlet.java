package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.AnswerDAO;
import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.dao.TagDAO;
import com.j4fptit.dao.UserDAO;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class HomeServlet
 */
@WebServlet("/home")
public class HomeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public HomeServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String jspPath = PageShow.HOME.getJspPath();
		
		request.setAttribute("top10Question", QuestionDAO.findTop10QuestionsByPostDate());
		request.setAttribute("top5User", UserDAO. findTop5UserByPoint());
		request.setAttribute("countUserAll", UserDAO.getCountAll());
		request.setAttribute("countQuestionAll", QuestionDAO.getCountAll());
		request.setAttribute("countAnswerAll", AnswerDAO.getCountAll());
		request.setAttribute("countAnswerIsVerifiedAll", AnswerDAO.getCountIsVerifiedAll());
		request.setAttribute("top10Tag", TagDAO.getTop10TagByCountQuestion());
		request.setAttribute("jspPath", jspPath);
		
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
