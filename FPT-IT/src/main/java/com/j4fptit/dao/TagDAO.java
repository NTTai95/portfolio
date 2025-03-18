package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.Tag;

import jakarta.persistence.EntityManager;

public class TagDAO {

	private static int start = 1;
	private static int size = 10;
	private static long count = TagDAO.getCountAll();
	private static String byTagName = "";

	public static void setStart(int start) {
		TagDAO.start = start;
	}

	public static void setSize(int size) {
		TagDAO.size = size;
	}

	private static void setCount(long count) {
		TagDAO.count = count;
	}

	public static void setByTagName(String byTagName) {
		TagDAO.byTagName = byTagName;
	}

	public static List<Tag> findAll() {
		String jpql = "SELECT t FROM Tag t WHERE t.tagName LIKE :tagName";
		List<Tag> list = EntityDAO.findAll(Tag.class, start, size, jpql,
				new ObjectWhere("tagName", "%" + byTagName + "%"));
		setCount(EntityDAO.getCount());
		return list;
	}

	public static Tag findById(int id) {
		return EntityDAO.findById(Tag.class, id);
	}

	public static boolean create(Tag tag) {
		return EntityDAO.create(tag);
	}

	public static boolean update(Tag tag) {
		return EntityDAO.update(tag);
	}

	public static boolean deleteById(int id) {
		return EntityDAO.deleteById(Tag.class, id);
	}

	public static int getMaxId() {
		return EntityDAO.getMaxId(Tag.class);
	}

	public static int getCountAll() {
		return EntityDAO.getCountAll(Tag.class);
	}

	public static int getTotalPages() {
		return (int) Math.ceil((float) TagDAO.count / (float) TagDAO.size);
	}

	public static List<Tag> getTop10TagByCountQuestion() {
		EntityManager em = EntityDAO.getEntityManager();
		try {
			return em.createQuery("SELECT t FROM Tag t JOIN t.questions q GROUP BY t ORDER BY COUNT(q) DESC", Tag.class)
					.setMaxResults(10).getResultList();
		} finally {
			em.close();
		}
	}
}
