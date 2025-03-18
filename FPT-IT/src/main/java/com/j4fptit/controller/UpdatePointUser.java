package com.j4fptit.controller;


import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.Answer;
import com.j4fptit.model.Question;
import com.j4fptit.model.User;

public class UpdatePointUser {

	public static void main(String[] args) {
		UserDAO.setSize(1000);
		for (User user : UserDAO.findAll()) {
			int point = 0;
			for (Question question : user.getQuestions()) {
				point += question.getPoint();
			}

			for (Answer answer : user.getAnswers()) {
				point += answer.getPoint();
			}
			user.setReputation(point);
			user.update();
		}
		System.out.println("----Done");
	}
}
