package com.j4fptit.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.model.Answer;
import com.j4fptit.model.Question;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class AdminManagerServlet
 */
@WebServlet("/admin/*")
public class AdminManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AdminManagerServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		User userLogin = request.getSession().getAttribute("userLogin") == null ? null
				: (User) request.getSession().getAttribute("userLogin");

		if (userLogin != null && userLogin.getRole()) {
			jspPath = PageShow.ADMIN_SETTING.getJspPath();
		}

		request.setAttribute("jspPath", jspPath);
		request.setAttribute("blackList", QuestionDAO.findBlackListQuestion());
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		int id = request.getParameter("id") == null ? -1 : Integer.parseInt(request.getParameter("id"));

		if (uri.contains("questions/manager")) {
			if (uri.contains("delete")) {
				if (id != -1) {
					Question question = QuestionDAO.findById(id);
					question.setStatus(null);
					question.update();
					question.getUser().setReputation(question.getUser().getReputation() - question.getPoint());
					question.getUser().update();
					List<Answer> answers = question.getAnswers();
					for (Answer answer : answers) {
						answer.getUser().setReputation(answer.getUser().getReputation() - answer.getPoint());
						answer.getUser().update();
					}
					response.sendRedirect("/JAVA4_NEW/questions/manager");
					request.setAttribute("toTab", 1);
				}
			} else if (uri.contains("restore")) {
				Question question = QuestionDAO.findById(id);
				question.setStatus(true);
				question.update();
				question.getUser().setReputation(question.getUser().getReputation() + question.getPoint());
				question.getUser().update();
				List<Answer> answers = question.getAnswers();
				for (Answer answer : answers) {
					answer.getUser().setReputation(answer.getUser().getReputation() + answer.getPoint());
					answer.getUser().update();
				}
				response.sendRedirect("/JAVA4_NEW/questions/detail?id=" + id);
				return;
			}
		}

		doGet(request, response);
	}
}
