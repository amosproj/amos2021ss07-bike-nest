package com.bikenest.common.interfaces.booking;


//see /booking/add Endpoint
public class CreateReservationRequest {
    private Integer bikenestId;
    private Integer reservationMinutes;

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getReservationMinutes() {
        return reservationMinutes;
    }

    public void setReservationMinutes(Integer reservationMinutes) {
        this.reservationMinutes = reservationMinutes;
    }
}
