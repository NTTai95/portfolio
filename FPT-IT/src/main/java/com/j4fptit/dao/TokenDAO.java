package com.j4fptit.dao;

import com.j4fptit.model.Token;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;

public class TokenDAO {

	public static Token findByToken(String token) {
		EntityManager entityManager = EntityDAO.getEntityManager();
		try {
			String jpql = "SELECT t FROM Token t WHERE t.token LIKE :token";
			TypedQuery<Token> query = entityManager.createQuery(jpql, Token.class);
			query.setParameter("token", token);
			return query.getSingleResult();
		} catch (Exception e) {
			return null;
		} finally {

			entityManager.close();
		}
	}

	public static boolean deleteById(int id) {
		EntityManager entityManager = EntityDAO.getEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		try {
			transaction.begin();
			Token token = entityManager.find(Token.class, id);
			if (token != null) {
				entityManager.remove(token);
				transaction.commit();
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			if (transaction.isActive()) {
				transaction.rollback();
			}
			e.printStackTrace();
			return false;
		} finally {
			entityManager.close();
		}
	}

	public static boolean create(Token token) {
		EntityManager entityManager = EntityDAO.getEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();
		try {
			transaction.begin();
			entityManager.merge(token);
			transaction.commit();
			return true;
		} catch (Exception e) {
			if (transaction.isActive()) {
				transaction.rollback();
			}
			e.printStackTrace();
			return false;
		} finally {
			entityManager.close();
		}
	}
	
	public static boolean deleteByEmail(String email) {
		EntityManager entityManager = EntityDAO.getEntityManager();
		EntityTransaction transaction = entityManager.getTransaction();

		try {
			transaction.begin();
			Query query = entityManager.createQuery("DELETE FROM Token t WHERE t.email = :email");
			query.setParameter("email", email);

			int result = query.executeUpdate();

			if (result > 0) {
				transaction.commit();
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			if (transaction.isActive()) {
				transaction.rollback();
			}
			e.printStackTrace();
			return false;
		} finally {
			entityManager.close();
		}
	}
}
