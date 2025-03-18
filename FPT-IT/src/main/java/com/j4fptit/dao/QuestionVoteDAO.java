package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.QuestionVote;

import jakarta.persistence.EntityManager;

public class QuestionVoteDAO {
	
	private static int start = 1;
	private static int size = 10;
	
	public static void setStart(int start) {
		QuestionVoteDAO.start = start;
	}
	
	public static void setSize(int size) {
		QuestionVoteDAO.size = size;
	}
	
    public static List<QuestionVote> findAll() {
        return EntityDAO.findAll(QuestionVote.class, start, size,null);
    }

    public static QuestionVote findById(int id) {
        return EntityDAO.findById(QuestionVote.class, id);
    }

    public static boolean create(QuestionVote questionVote) {
        return EntityDAO.create(questionVote);
    }

    public static boolean update(QuestionVote questionVote) {
        return EntityDAO.update(questionVote);
    }

    public static boolean deleteById(int id) {
        return EntityDAO.deleteById(QuestionVote.class, id);
    }

    public static int getMaxId() {
        return EntityDAO.getMaxId(QuestionVote.class);
    }

    public static int getCountAll() {
        return EntityDAO.getCountAll(QuestionVote.class);
    }
    
    public static QuestionVote findByQuestionIdAndUserId(int questionId, int userId) {
		EntityManager em = EntityDAO.getEntityManager();
		try {
			List<QuestionVote> results = em.createQuery(
	                "SELECT qv FROM QuestionVote qv WHERE qv.question.id = :questionId AND qv.user.id = :userId",
	                QuestionVote.class)
	                .setParameter("questionId", questionId)
	                .setParameter("userId", userId)
	                .getResultList();
	        return results.isEmpty() ? null : results.get(0);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			em.close();
		}
	}
}
