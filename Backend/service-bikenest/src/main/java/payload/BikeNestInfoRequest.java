package com.bikenest.servicebikenest.payload;

import javax.validation.constraints.NotBlank;

public class BikeNestInfoRequest {
	@NotBlank
	private Long bikenestID;
	
	public String getID() {
		return bikenestID;
	}

	public void setID(Long id) {
		this.bikenestID = id;
	}
}
