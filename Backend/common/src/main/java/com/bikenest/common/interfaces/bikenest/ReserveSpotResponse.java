package com.bikenest.common.interfaces.bikenest;

public class ReserveSpotResponse {
    private boolean success;
    private Integer bikenestId;
    private Integer spotNumber;

    public ReserveSpotResponse(boolean success, Integer bikenestId, Integer spotNumber){
        this.success = success;
        this.bikenestId = bikenestId;
        this.spotNumber = spotNumber;
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

    public Integer getSpotNumber() {
        return spotNumber;
    }

    public void setSpotNumber(Integer spotNumber) {
        this.spotNumber = spotNumber;
    }
}
