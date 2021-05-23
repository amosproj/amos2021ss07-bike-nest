package com.bikenest.servicebikenest.payload;


public class BikeNestInfoRequest {
	@NotBlank
	private Long bikenestID;
	
	public Long getID() {
		return bikenestID;
	}

	public void setID(Long id) {
		this.bikenestID = id;
	}
}
