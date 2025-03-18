package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.AnswerVote;

import jakarta.persistence.EntityManager;

public class AnswerVoteDAO {

	private static int start = 1;
	private static int size = 10;

	public static void setStart(int start) {
		AnswerVoteDAO.start = start;
	}

	public static void setSize(int size) {
		AnswerVoteDAO.size = size;
	}

	public static List<AnswerVote> findAll() {
		return EntityDAO.findAll(AnswerVote.class, start, size, null);
	}

	public static AnswerVote findById(int id) {
		return EntityDAO.findById(AnswerVote.class, id);
	}

	public static boolean create(AnswerVote answerVote) {
		return EntityDAO.create(answerVote);
	}

	public static boolean update(AnswerVote answerVote) {
		return EntityDAO.update(answerVote);
	}

	public static boolean deleteById(int id) {
		return EntityDAO.deleteById(AnswerVote.class, id);
	}

	public static int getMaxId() {
		return EntityDAO.getMaxId(AnswerVote.class);
	}

	public static int getCountAll() {
		return EntityDAO.getCountAll(AnswerVote.class);
	}

	public static AnswerVote findByAnswerIdAndUserId(int answerId, int userId) {
		EntityManager em = EntityDAO.getEntityManager();
		try {
			List<AnswerVote> results = em.createQuery(
	                "SELECT av FROM AnswerVote av WHERE av.answer.id = :answerId AND av.user.id = :userId",
	                AnswerVote.class)
	                .setParameter("answerId", answerId)
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