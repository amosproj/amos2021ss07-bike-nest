package com.bikenest.common.interfaces.booking;


import javax.validation.constraints.NotNull;

//see /booking/add Endpoint
public class CreateReservationRequest {
    @NotNull
    private Integer bikenestId;
    @NotNull
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
