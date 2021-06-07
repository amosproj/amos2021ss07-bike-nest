package com.bikenest.common.interfaces.bikenest;

public class FreeSpotRequest {
    private Integer bikenestId;
    private Integer spotNumber;
    private Integer userId;

    public FreeSpotRequest(Integer bikenestId, Integer spotNumber, Integer userId){
        this.bikenestId = bikenestId;
        this.spotNumber = spotNumber;
        this.userId = userId;
    }
    public FreeSpotRequest(){}

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getSpotNumber() {
        return spotNumber;
    }

    public void setSpotNumber(Integer spotNumber) {
        this.spotNumber = spotNumber;
    }
}
