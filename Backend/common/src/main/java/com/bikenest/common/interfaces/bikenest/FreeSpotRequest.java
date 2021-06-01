package com.bikenest.common.interfaces.bikenest;

public class FreeSpotRequest {
    private Integer bikenestId;
    private Integer spotId;
    private Integer userId;

    public FreeSpotRequest(Integer bikenestId, Integer spotId, Integer userId){
        this.bikenestId = bikenestId;
        this.spotId = spotId;
        this.userId = userId;
    }
    public FreeSpotRequest(){}

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getSpotId() {
        return spotId;
    }

    public void setSpotId(Integer spotId) {
        this.spotId = spotId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
