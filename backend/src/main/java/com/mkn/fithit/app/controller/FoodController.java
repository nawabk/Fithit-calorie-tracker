package com.mkn.fithit.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mkn.fithit.app.model.Food;
import com.mkn.fithit.app.service.FoodService;

@RestController
@RequestMapping("/rest/foods")
@CrossOrigin(origins="http://localhost:3000")
public class FoodController {

	@Autowired
	private FoodService foodService;
	
	@GetMapping
	public ResponseEntity<List<Food>> getList(){
		List<Food> foods = this.foodService.getList();
		return ResponseEntity.ok().body(foods);
	}
	
	@GetMapping("/{foodId}")
	public ResponseEntity<Food> getById(@PathVariable("foodId")Long id){
		Food food = this.foodService.getById(id);
		return ResponseEntity.ok().body(food);
	}
	
	@PostMapping
	public ResponseEntity<Food> save(@RequestBody Food food){
		  this.foodService.save(food);
		  return ResponseEntity.status(HttpStatus.CREATED).body(food);
	}
	
	@PutMapping("/{foodId}")
	public ResponseEntity<Food> update(@RequestBody Food food,@PathVariable("foodId")Long id){
		food.setId(id);
		this.foodService.update(food);
		return ResponseEntity.status(HttpStatus.CREATED).body(food);
	}
	
	@DeleteMapping("/{foodId}")
	public ResponseEntity<Food> delete(@PathVariable("foodId")Long id){
		Food food= this.foodService.getById(id);
		this.foodService.delete(id);
		return ResponseEntity.ok().body(food);
				
	}
}
