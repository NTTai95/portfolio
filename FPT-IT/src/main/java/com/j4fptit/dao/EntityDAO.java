package com.j4fptit.dao;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;

//Lớp DAO dùng chung cho các lớp DAO khác
public class EntityDAO {
	private static final EntityManagerFactory entityManagerFactory = Persistence
			.createEntityManagerFactory("J4_FPT_IT");

	private static long count = 0;

	private static void setCount(long count) {
		EntityDAO.count = count;
	}

	public static long getCount() {
		return EntityDAO.count;
	}

	public static EntityManager getEntityManager() {
		return entityManagerFactory.createEntityManager();
	}

	public static <T> List<T> findAll(Class<T> entityClass, int start, int size, String jpql2,
			ObjectWhere... objectWheres) {
		EntityManager em = entityManagerFactory.createEntityManager();
		String jpql = "";
		if (jpql2 == null) {
			jpql = "SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1";
		} else {
			jpql = jpql2;
		}

		try {
			TypedQuery<T> query = em.createQuery(jpql, entityClass);
			if (objectWheres.length > 0) {
				for (ObjectWhere ow : objectWheres) {
					query.setParameter(ow.getKey(),
							ow.getValue().contains(",") ? Arrays.asList(ow.getValue().split(",")) : ow.getValue());
					System.out.println(ow.getKey() + ": " + ow.getValue());
				}
			}
			query.setFirstResult((start - 1) * size);
			query.setMaxResults(size);

			Query queryCount = em.createQuery(jpql.replace("SELECT ", "SELECT COUNT(").replace("FROM", ") FROM"));
			for (ObjectWhere ow : objectWheres) {
				queryCount.setParameter(ow.getKey(),
						ow.getValue().contains(",") ? Arrays.asList(ow.getValue().split(",")) : ow.getValue());
			}
			EntityDAO.setCount((long) queryCount.getSingleResult());

			return query.getResultList();
		} finally {
			em.close();
			System.out.flush();
			System.out.println(jpql.replace("SELECT ", "SELECT COUNT(").replace("FROM", ") FROM"));
		}
	}

	public static <T> T findById(Class<T> entityClass, int id) {
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			return em.find(entityClass, id);
		} finally {
			em.close();
		}
	}

	public static <T> boolean create(T entity) {
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			em.getTransaction().begin();
			if (!em.contains(entity)) {
				entity = em.merge(entity);
			}
			em.persist(entity);
			em.getTransaction().commit();
			return true;
		} catch (Exception e) {
			if (em.getTransaction().isActive())
				em.getTransaction().rollback();
			e.printStackTrace();
			return false;
		} finally {
			em.close();
		}
	}

	public static <T> boolean update(T entity) {
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			em.getTransaction().begin();
			em.merge(entity);
			em.getTransaction().commit();
			return true;
		} catch (Exception e) {
			if (em.getTransaction().isActive())
				em.getTransaction().rollback();
			e.printStackTrace();
			return false;
		} finally {
			em.close();
		}
	}

	public static <T> boolean deleteById(Class<T> entityClass, int id) {
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			T entity = em.find(entityClass, id);
			if (entity != null) {
				em.getTransaction().begin();
				em.remove(entity);
				em.getTransaction().commit();
				return true;
			}
			return false;
		} catch (Exception e) {
			if (em.getTransaction().isActive())
				em.getTransaction().rollback();
			e.printStackTrace();
			return false;
		} finally {
			em.close();
		}
	}

	public static <T> int getMaxId(Class<T> entityClass) {
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			Integer maxId = em.createQuery("SELECT MAX(e.id) FROM " + entityClass.getSimpleName() + " e", Integer.class)
					.getSingleResult();
			return maxId != null ? maxId : 0;
		} finally {
			em.close();
		}
	}

	public static <T> int getCountAll(Class<T> entityClass) {
		EntityManager em = entityManagerFactory.createEntityManager();
		try {
			Long count = em.createQuery("SELECT COUNT(e) FROM " + entityClass.getSimpleName() + " e", Long.class)
					.getSingleResult();
			return count.intValue();
		} finally {
			em.close();
		}
	}
}
