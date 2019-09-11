package com.mkn.fithit.app.repository;



import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mkn.fithit.app.model.Food;

@Repository
public class FoodRepository  {

	@Autowired
	private EntityManager entityManager;
	
	public List<Food> getAll() {
		 Session session = entityManager.unwrap(Session.class);
		 Query<Food> theQuery = session.createQuery("from Food",Food.class);
		 List<Food> foods = theQuery.getResultList();
		 return foods;
	}
	
	public Food getById(Long id) {
		Session session = entityManager.unwrap(Session.class);
		Food food = session.get(Food.class, id);
		return food;
	}
	
	public void save(Food food) {
		Session session = this.entityManager.unwrap(Session.class);
		session.persist(food);
	}
	
	public void update(Food food) {
		Session session = this.entityManager.unwrap(Session.class);
		session.merge(food);
	}
	
	public void delete(Long id) {
		Session session = this.entityManager.unwrap(Session.class);
		Food food = session.get(Food.class, id);
		session.remove(food);
	}
}
