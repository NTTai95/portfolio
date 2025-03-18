package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.j4fptit.dao.AnswerDAO;
import com.j4fptit.dao.AnswerVoteDAO;
import com.j4fptit.dao.QuestionDAO;
import com.j4fptit.dao.QuestionVoteDAO;
import com.j4fptit.dao.SettingDAO;
import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.AnswerVote;
import com.j4fptit.model.QuestionVote;
import com.j4fptit.model.User;
import com.j4fptit.utils.JsonResponseHelper;

/**
 * Servlet implementation class VoteServlet
 */
@WebServlet("/vote/*")
public class VoteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public VoteServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String requestData = JsonResponseHelper.getRequestBody(request);
		JSONObject jsonObject = new JSONObject(requestData);

		int answerId = jsonObject.getInt("id");
		int userId = ((User) request.getSession().getAttribute("userLogin")).getId();
		JSONObject jsonOS = new JSONObject();

		String uri = request.getRequestURI();

		if (uri.contains("question")) {
			jsonOS.put("question", handleQuestionVote(uri, answerId, userId));
		} else if (uri.contains("answer")) {
			jsonOS.put("answer", handleAnswerVote(uri, answerId, userId));
		}

		JsonResponseHelper.sendJsonResponse(response, jsonObject);
	}

	private QuestionVote handleQuestionVote(String uri, int questionId, int userId) {
		QuestionVote questionVote = QuestionVoteDAO.findByQuestionIdAndUserId(questionId, userId);
		boolean isLikeAction = !uri.endsWith("dislike");

		if (questionVote != null) {
			processExistingQuestionVote(questionVote, isLikeAction);
			return questionVote;
		} else {
			return createNewQuestionVote(questionId, userId, isLikeAction);
		}
	}

	private AnswerVote handleAnswerVote(String uri, int answerId, int userId) {
		AnswerVote answerVote = AnswerVoteDAO.findByAnswerIdAndUserId(answerId, userId);
		boolean isLikeAction = !uri.endsWith("dislike");

		if (answerVote != null) {
			processExistingAnswerVote(answerVote, isLikeAction);
			return answerVote;
		} else {
			return createNewAnswerVote(answerId, userId, isLikeAction);
		}
	}

	private void processExistingQuestionVote(QuestionVote questionVote, boolean isLikeAction) {
		if (isLikeAction) {
			if (questionVote.getIsLiked()) {
				questionVote.delete();
				questionVote.getUser()
						.setReputation(questionVote.getUser().getReputation() - SettingDAO.getPointPlus());
				questionVote.getUser().update();
			} else {
				questionVote.setIsLiked(true);
				questionVote.update();
				questionVote.getUser().setReputation(questionVote.getUser().getReputation()
						+ (SettingDAO.getPointMinus() - SettingDAO.getPointPlus()));
				questionVote.getUser().update();
			}
		} else {
			if (!questionVote.getIsLiked()) {
				questionVote.delete();
				questionVote.getUser()
						.setReputation(questionVote.getUser().getReputation() - SettingDAO.getPointMinus());
				questionVote.getUser().update();
			} else {
				questionVote.setIsLiked(false);
				questionVote.update();
				questionVote.getUser().setReputation(questionVote.getUser().getReputation()
						+ (SettingDAO.getPointPlus() - SettingDAO.getPointMinus()));
				questionVote.getUser().update();
			}
		}
	}

	private void processExistingAnswerVote(AnswerVote answerVote, boolean isLikeAction) {
		if (isLikeAction) {
			if (answerVote.getIsLiked()) {
				answerVote.delete();
				answerVote.getUser().setReputation(answerVote.getUser().getReputation() - SettingDAO.getPointPlus());
				answerVote.getUser().update();
			} else {
				answerVote.setIsLiked(true);
				answerVote.update();
				answerVote.getUser().setReputation(answerVote.getUser().getReputation()
						+ (SettingDAO.getPointMinus() - SettingDAO.getPointPlus()));
				answerVote.getUser().update();
			}
		} else {
			if (!answerVote.getIsLiked()) {
				answerVote.delete();
				answerVote.getUser().setReputation(answerVote.getUser().getReputation() - SettingDAO.getPointMinus());
				answerVote.getUser().update();
			} else {
				answerVote.setIsLiked(false);
				answerVote.update();
				answerVote.getUser().setReputation(answerVote.getUser().getReputation()
						+ (SettingDAO.getPointPlus() - SettingDAO.getPointMinus()));
				answerVote.getUser().update();
			}
		}
	}

	private AnswerVote createNewAnswerVote(int answerId, int userId, boolean isLikeAction) {
		User user = UserDAO.findById(userId);
		AnswerVoteDAO.create(new AnswerVote(null, isLikeAction, user, AnswerDAO.findById(answerId)));
		user.setReputation(
				user.getReputation() + (isLikeAction ? SettingDAO.getPointPlus() : SettingDAO.getPointMinus()));
		user.update();
		return AnswerVoteDAO.findById(AnswerVoteDAO.getMaxId());
	}

	private QuestionVote createNewQuestionVote(int questionId, int userId, boolean isLikeAction) {
		User user = UserDAO.findById(userId);
		QuestionVoteDAO.create(new QuestionVote(null, isLikeAction, user, QuestionDAO.findById(questionId)));
		user.setReputation(
				user.getReputation() + (isLikeAction ? SettingDAO.getPointPlus() : SettingDAO.getPointMinus()));
		user.update();
		return QuestionVoteDAO.findById(QuestionVoteDAO.getMaxId());
	}

}
