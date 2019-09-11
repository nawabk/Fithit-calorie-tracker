package com.mkn.fithit.app.model;

import javax.persistence.*;

@Entity
public class Food  {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private Long gramsCalorie;
	
	private Long cupCalorie;
	
	private Long pieceCalorie;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getGramsCalorie() {
		return gramsCalorie;
	}

	public void setGramsCalorie(Long gramsCalorie) {
		this.gramsCalorie = gramsCalorie;
	}

	public Long getCupCalorie() {
		return cupCalorie;
	}

	public void setCupCalorie(Long cupCalorie) {
		this.cupCalorie = cupCalorie;
	}

	public Long getPieceCalorie() {
		return pieceCalorie;
	}

	public void setPieceCalorie(Long pieceCalorie) {
		this.pieceCalorie = pieceCalorie;
	}
	
	
}
