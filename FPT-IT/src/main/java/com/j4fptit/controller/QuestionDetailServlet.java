package com.j4fptit.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.AnswerDAO;
import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.model.Answer;
import com.j4fptit.model.Question;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class QuestionDetailServlet
 */
@WebServlet("/questions/detail/*")
public class QuestionDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public QuestionDetailServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		int id = request.getParameter("id") == null ? -1 : Integer.valueOf(request.getParameter("id"));

		Question question = QuestionDAO.findById(id);

		if (question != null) {
			jspPath = PageShow.QUESTIONS_DETAIL.getJspPath();
			question.setNumberView(question.getNumberView() + 1);
			question.update();
		}

		request.setAttribute("question", question);
		request.removeAttribute("focusEl");
		String focusEL = request.getSession().getAttribute("focusEl") == null ? null
				: (String) request.getSession().getAttribute("focusEl");
		if (focusEL != null) {
			request.setAttribute("focusEl", focusEL);
			request.getSession().removeAttribute("focusEl");
		}

		request.setAttribute("listAnswer", question != null ? question.getAnswers() : null);
		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		int idAnswer = 0;
		int id = request.getParameter("id") == null ? 0 : Integer.valueOf(request.getParameter("id"));
		String content = new String(
				(request.getParameter("content") == null ? "" : request.getParameter("content")).getBytes("ISO-8859-1"),
				"UTF-8");
		User user = request.getSession().getAttribute("userLogin") == null ? null
				: (User) request.getSession().getAttribute("userLogin");
		if (uri.contains("add")) {
			Answer answer = new Answer(null, content, new Date(), false, true, user, QuestionDAO.findById(id), null,
					null);
			AnswerDAO.create(answer);
			idAnswer = AnswerDAO.getMaxId();
		} else if (uri.contains("edit")) {
			Answer answer = AnswerDAO.findById(id);
			answer.setContent(content);
			answer.update();
			idAnswer = answer.getId();
		} else if (uri.contains("delete")) {

			Answer answer = AnswerDAO.findById(id);
			answer.delete();
			answer.getUser().setReputation(answer.getUser().getReputation() - answer.getPoint());
			answer.getUser().update();

			String query = request.getParameter("query") == null ? "" : "?" + request.getParameter("query");
			response.sendRedirect("/JAVA4_NEW/questions/detail" + query);
			return;
		}

		String query = request.getParameter("query") == null ? "" : "?" + request.getParameter("query");
		request.getSession().setAttribute("focusEl", "questionAnswer" + idAnswer);
		response.sendRedirect("/JAVA4_NEW/questions/detail" + query);
	}

}
