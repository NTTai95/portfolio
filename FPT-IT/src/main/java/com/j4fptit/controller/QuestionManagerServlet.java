package com.j4fptit.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.dao.TagDAO;
import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.Question;
import com.j4fptit.model.Tag;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class QuestionManagerServlet
 */
@MultipartConfig
@WebServlet("/questions/manager/*")
public class QuestionManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public QuestionManagerServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		;
		int id = request.getParameter("id") == null ? -1 : Integer.parseInt(request.getParameter("id"));
		User user = request.getSession().getAttribute("userLogin") == null ? null
				: ((User) request.getSession().getAttribute("userLogin"));
		if(user != null) {
			jspPath = PageShow.QUESTIONS_MANAGER.getJspPath();
			user = UserDAO.findById(user.getId());
			request.getSession().setAttribute("userLogin", user);
		}

		if (id != -1 && user != null) {
			jspPath = PageShow.Page404.getJspPath();
			for (Question question : user.getQuestions()) {
				if (question.getId() == id) {
					jspPath = PageShow.QUESTIONS_MANAGER.getJspPath();
					request.setAttribute("question", question);
					break;
				}
			}
		}

		TagDAO.setSize(1000);
		request.setAttribute("tags", TagDAO.findAll());
		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String uri = request.getRequestURI();
		int id = request.getParameter("id") == null ? -1 : Integer.parseInt(request.getParameter("id"));
		String title = new String(
				(request.getParameter("title") == null ? "" : request.getParameter("title")).getBytes("ISO-8859-1"),
				"UTF-8");
		String content = new String(
				(request.getParameter("content") == null ? "" : request.getParameter("content")).getBytes("ISO-8859-1"),
				"UTF-8");

		User user = request.getSession().getAttribute("userLogin") == null ? null
				: ((User) request.getSession().getAttribute("userLogin"));
		String[] tagsString = request.getParameter("tags") == null ? new String[0]
				: request.getParameter("tags").split(",");

		List<Tag> tags = new ArrayList<>();

		for (int tagId : Arrays.stream(tagsString).mapToInt(Integer::parseInt).toArray()) {
			tags.add(TagDAO.findById(tagId));
		}

		if (uri.contains("add")) {
			QuestionDAO.create(
					new Question(null, title, content, new Date(), (long) 0, true, user, null, null, null, tags));
			response.sendRedirect("/JAVA4_NEW/questions/detail?id=" + QuestionDAO.getMaxId());
		} else if (uri.contains("edit")) {
			Question question = QuestionDAO.findById(id);
			question.setTitle(title);
			question.setContent(content);
			question.setTags(tags);
			question.update();
			response.sendRedirect("/JAVA4_NEW/questions/detail?id=" + question.getId());
		} else if (uri.contains("delete")) {
			Question question = QuestionDAO.findById(id);
			question.setStatus(false);
			question.update();
			question.getUser().setReputation(question.getUser().getReputation() - question.getPoint());
			question.getUser().update();
			question.getAnswers().forEach(
					answer -> answer.getUser().setReputation(answer.getUser().getReputation() - answer.getPoint()));
			question.getAnswers().forEach(answer -> answer.getUser().update());
			request.getSession().setAttribute("toTab", "question");
			response.sendRedirect("/JAVA4_NEW/users/manager");
		} else if (uri.contains("restore")) {
			Question question = QuestionDAO.findById(id);
			question.setStatus(true);
			question.getUser().setReputation(question.getUser().getReputation() + question.getPoint());
			question.getUser().update();
			question.update();
			question.getAnswers().forEach(
					answer -> answer.getUser().setReputation(answer.getUser().getReputation() + answer.getPoint()));
			question.getAnswers().forEach(answer -> answer.getUser().update());
			response.sendRedirect("/JAVA4_NEW/questions/detail?id=" + question.getId());
		}
	}
}
