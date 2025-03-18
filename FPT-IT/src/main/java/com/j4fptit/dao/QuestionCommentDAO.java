package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.QuestionComment;

public class QuestionCommentDAO {
	
	private static int start = 1;
	private static int size = 10;
	
	public static void setStart(int start) {
		QuestionCommentDAO.start = start;
	}
	
	public static void setSize(int size) {
		QuestionCommentDAO.size = size;
	}
	
    public static List<QuestionComment> findAll() {
        return EntityDAO.findAll(QuestionComment.class, start, size, null);
    }

    public static QuestionComment findById(int id) {
        return EntityDAO.findById(QuestionComment.class, id);
    }

    public static boolean create(QuestionComment questionComment) {
        return EntityDAO.create(questionComment);
    }

    public static boolean update(QuestionComment questionComment) {
        return EntityDAO.update(questionComment);
    }

    public static boolean deleteById(int id) {
        return EntityDAO.deleteById(QuestionComment.class, id);
    }

    public static int getMaxId() {
        return EntityDAO.getMaxId(QuestionComment.class);
    }

    public static int getCountAll() {
        return EntityDAO.getCountAll(QuestionComment.class);
    }
}
