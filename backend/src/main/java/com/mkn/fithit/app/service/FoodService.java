package com.mkn.fithit.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mkn.fithit.app.model.Food;
import com.mkn.fithit.app.repository.FoodRepository;

@Service
public class FoodService {

	@Autowired
	private FoodRepository foodRepository;
	@Transactional
	public List<Food> getList(){
		return this.foodRepository.getAll();	
	}
	@Transactional
	public Food getById(Long id) {
		return this.foodRepository.getById(id);
	}
	@Transactional
	public void save(Food food) {
		 this.foodRepository.save(food);
	}
	@Transactional
	public void update(Food food) {
		this.foodRepository.update(food);
	}
	@Transactional
	public void delete(Long id) {
		this.foodRepository.delete(id);
	}
}
