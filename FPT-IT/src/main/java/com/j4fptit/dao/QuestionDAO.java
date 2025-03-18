package com.j4fptit.dao;

import java.util.ArrayList;
import java.util.List;

import com.j4fptit.model.Question;

import jakarta.persistence.EntityManager;

public class QuestionDAO {

	private static int start = 1;
	private static int size = 5;
	private static long count = QuestionDAO.getCountAll();
	private static String byTitle = "";
	private static String byTagName = "";

	public static void setStart(int start) {
		QuestionDAO.start = start;
	}

	public static void setSize(int size) {
		QuestionDAO.size = size;
	}

	public static void setCount(long count) {
		QuestionDAO.count = count;
	}

	public static void setByTitle(String byTitle) {
		QuestionDAO.byTitle = byTitle;
	}

	public static void setByTagName(String byTagName) {
		QuestionDAO.byTagName = byTagName;
	}

	public static List<Question> findAll() {
		List<ObjectWhere> listOW = new ArrayList<>();
		String jpql = "SELECT q FROM Question q JOIN q.tags t WHERE (q.title LIKE :title OR q.content LIKE :content) AND q.status";
		if (!byTagName.equals("")) {
			int count = 1;
			jpql += " AND (";
			for (String s : byTagName.split(",")) {
				jpql += "t.tagName LIKE :tagName" + count + " OR ";
				listOW.add(new ObjectWhere("tagName" + count, s));
				count++;
			}
			jpql = jpql.substring(0, jpql.length() - 4);
			jpql += ")";
		}

		listOW.add(new ObjectWhere("title", "%" + byTitle + "%"));
		listOW.add(new ObjectWhere("content", "%" + byTitle + "%"));

		List<Question> list = EntityDAO.findAll(Question.class, start, size, jpql, listOW.toArray(new ObjectWhere[0]));
		setCount(EntityDAO.getCount());
		return list;
	}

	public static List<Question> findTop10QuestionsByPostDate() {
		EntityManager em = EntityDAO.getEntityManager();
		try {
			return em.createQuery("SELECT q FROM Question q WHERE q.status ORDER BY q.postDate DESC", Question.class)
					.setMaxResults(10).getResultList();
		} finally {
			em.close();
		}
	}

	public static List<Question> findBlackListQuestion() {
		EntityManager em = EntityDAO.getEntityManager();
		try {
			return em.createQuery("SELECT q FROM Question q WHERE q.status IS NULL", Question.class).getResultList();
		} finally {
			em.close();
		}
	}

	public static Question findById(int id) {
		return EntityDAO.findById(Question.class, id);
	}

	public static boolean create(Question question) {
		return EntityDAO.create(question);
	}

	public static boolean update(Question question) {
		return EntityDAO.update(question);
	}

	public static boolean deleteById(int id) {
		return EntityDAO.deleteById(Question.class, id);
	}

	public static int getMaxId() {
		return EntityDAO.getMaxId(Question.class);
	}

	public static int getCountAll() {
		return EntityDAO.getCountAll(Question.class);
	}

	public static int getTotalPages() {
		return (int) Math.ceil((double) QuestionDAO.count / QuestionDAO.size);
	}
}
