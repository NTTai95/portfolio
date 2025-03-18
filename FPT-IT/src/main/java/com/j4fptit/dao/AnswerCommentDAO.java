package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.AnswerComment;

public class AnswerCommentDAO {
	
	private static int start = 1;
	private static int size = 10;
	
	public static void setStart(int start) {
		AnswerCommentDAO.start = start;
	}
	
	public static void setSize(int size) {
		AnswerCommentDAO.size = size;
	}
	
    public static List<AnswerComment> findAll() {
        return EntityDAO.findAll(AnswerComment.class, start, size, null);
    }

    public static AnswerComment findById(int id) {
        return EntityDAO.findById(AnswerComment.class, id);
    }

    public static boolean create(AnswerComment answerComment) {
        return EntityDAO.create(answerComment);
    }

    public static boolean update(AnswerComment answerComment) {
        return EntityDAO.update(answerComment);
    }

    public static boolean deleteById(int id) {
        return EntityDAO.deleteById(AnswerComment.class, id);
    }

    public static int getMaxId() {
        return EntityDAO.getMaxId(AnswerComment.class);
    }

    public static int getCountAll() {
        return EntityDAO.getCountAll(AnswerComment.class);
    }
}
