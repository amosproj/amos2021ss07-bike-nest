package com.bikenest.common.interfaces.booking;

public class GetBikespotRequest {
    private Integer bikenestId;
    private Integer bikespotId;

    public GetBikespotRequest(){
    }

    public GetBikespotRequest(Integer bikenestId, Integer bikespotId){
        this.bikenestId = bikenestId;
        this.bikespotId = bikespotId;
    }

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getBikespotId() {
        return bikespotId;
    }

    public void setBikespotId(Integer bikespotId) {
        this.bikespotId = bikespotId;
    }
}
