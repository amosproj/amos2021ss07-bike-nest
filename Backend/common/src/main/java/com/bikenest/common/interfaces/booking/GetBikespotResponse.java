package com.bikenest.common.interfaces.booking;

public class GetBikespotResponse {
    private Boolean exists; // Does the request bikespot even exist?
    private Integer bikenestId;
    private Integer bikespotNumber;
    private Integer userId;
    private Boolean leftSide;
    private Boolean reserved;

    public GetBikespotResponse(){}

    public GetBikespotResponse(Boolean exists, Integer bikenestId, Integer bikespotNumber, Integer userId,
                               Boolean leftSide, Boolean reserved){
        this.exists = exists;
        this.bikenestId = bikenestId;
        this.bikespotNumber = bikespotNumber;
        this.userId = userId;
        this.leftSide = leftSide;
        this.reserved = reserved;
    }

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getBikespotNumber() {
        return bikespotNumber;
    }

    public void setBikespotNumber(Integer bikespotNumber) {
        this.bikespotNumber = bikespotNumber;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Boolean getLeftSide() {
        return leftSide;
    }

    public void setLeftSide(Boolean leftSide) {
        this.leftSide = leftSide;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public Boolean getExists() {
        return exists;
    }

    public void setExists(Boolean exists) {
        this.exists = exists;
    }
}
