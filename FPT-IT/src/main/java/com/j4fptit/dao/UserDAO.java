package com.j4fptit.dao;

import java.util.List;

import com.j4fptit.model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

public class UserDAO {

	private static int start = 1;
	private static int size = 15;
	private static long count = UserDAO.getCountAll();
	private static String byDisplayName = "";

	public static void setStart(int start) {
		UserDAO.start = start;
	}

	public static void setSize(int size) {
		UserDAO.size = size;
	}

	private static void setCount(long count) {
		UserDAO.count = count;
	}

	public static void setByDisplayName(String byDisplayName) {
		UserDAO.byDisplayName = byDisplayName;
	}

	public static List<User> findAll() {
		String jpql = "SELECT u FROM User u WHERE u.displayName LIKE :display";
		List<User> list = EntityDAO.findAll(User.class, start, size, jpql,
				new ObjectWhere("display", "%" + byDisplayName + "%"));
		setCount(EntityDAO.getCount());
		return list;
	}

	public static User findByEmail(String email) {
		String jpql = "SELECT u FROM User u WHERE u.email = :email";
		EntityManager em = EntityDAO.getEntityManager();
		try {
			TypedQuery<User> query = em.createQuery(jpql, User.class);
			query.setParameter("email", email);
			return query.getSingleResult();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
		return null;
	}

	public static User findById(int id) {
		return EntityDAO.findById(User.class, id);
	}

	public static boolean create(User user) {
		return EntityDAO.create(user);
	}

	public static boolean update(User user) {
		return EntityDAO.update(user);
	}

	public static boolean deleteById(int id) {
		return EntityDAO.deleteById(User.class, id);
	}

	public static int getMaxId() {
		return EntityDAO.getMaxId(User.class);
	}

	public static int getCountAll() {
		return EntityDAO.getCountAll(User.class);
	}

	public static int getTotalPages() {
		return (int) Math.ceil((double) UserDAO.count / UserDAO.size);
	}

	public static List<User> findTop5UserByPoint() {
		EntityManager em = EntityDAO.getEntityManager();
		try {
			return em.createQuery("SELECT u FROM User u ORDER BY u.reputation DESC", User.class).setMaxResults(5)
					.getResultList();
		} finally {
			em.close();
		}
	}

	public static void reset() {
		UserDAO.start = 1;
		UserDAO.size = 10;
	}
}
