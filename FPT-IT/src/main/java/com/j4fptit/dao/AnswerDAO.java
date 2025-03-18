package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.Answer;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

public class AnswerDAO {
	
	private static int start = 1;
	private static int size = 10;
	
	public static void setStart(int start) {
		AnswerDAO.start = start;
	}
	
	public static void setSize(int size) {
		AnswerDAO.size = size;
	}
	
    public static List<Answer> findAll() {
        return EntityDAO.findAll(Answer.class, start, size, null);
    }

    public static Answer findById(int id) {
        return EntityDAO.findById(Answer.class, id);
    }

    public static boolean create(Answer answer) {
        return EntityDAO.create(answer);
    }

    public static boolean update(Answer answer) {
        return EntityDAO.update(answer);
    }

    public static boolean deleteById(int id) {
        return EntityDAO.deleteById(Answer.class, id);
    }

    public static int getMaxId() {
        return EntityDAO.getMaxId(Answer.class);
    }

    public static int getCountAll() {
        return EntityDAO.getCountAll(Answer.class);
    }
    
    public static long getCountIsVerifiedAll() {
    	EntityManager em = EntityDAO.getEntityManager();
    	Query query = em.createQuery("SELECT COUNT(a) FROM Answer a WHERE a.isVerified = true", Long.class);
    	return (long) query.getSingleResult();
    }
}
