package com.bikenest.common.interfaces.bikenest;

public class ReserveSpotResponse {
    private boolean success;
    private Integer bikenestId;
    private Integer spotId;

    public ReserveSpotResponse(boolean success, Integer bikenestId, Integer spotId){
        this.success = success;
        this.bikenestId = bikenestId;
        this.spotId = spotId;
    }

    public ReserveSpotResponse(){}

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

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
}
