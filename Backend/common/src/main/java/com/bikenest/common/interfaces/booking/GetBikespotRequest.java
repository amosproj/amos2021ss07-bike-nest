package com.bikenest.common.interfaces.booking;

public class GetBikespotRequest {
    private Integer bikenestId;
    private Integer bikespotNumber;

    public GetBikespotRequest(){
    }

    public GetBikespotRequest(Integer bikenestId, Integer bikespotNumber){
        this.bikenestId = bikenestId;
        this.bikespotNumber = bikespotNumber;
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
}
