package com.bikenest.common.interfaces.bikenest;

public class ReserveSpotRequest {
    private Integer bikenestId;
    private Integer userId;

    public ReserveSpotRequest(Integer bikenestId, Integer userId){
        this.bikenestId = bikenestId;
        this.userId = userId;
    }

    public ReserveSpotRequest(){}

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
}
