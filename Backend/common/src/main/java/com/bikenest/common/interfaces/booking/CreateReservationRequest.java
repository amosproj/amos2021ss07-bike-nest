package com.bikenest.common.interfaces.booking;

import javax.validation.constraints.NotBlank;

//see /booking/add Endpoint
public class CreateReservationRequest {
    @NotBlank
    private Integer bikenestId;

    @NotBlank
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
