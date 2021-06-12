package com.bikenest.common.interfaces.booking;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class DeliverUnlockRequest {
    @NotNull
    private Integer reservationId;
    @NotBlank
    private String qrCode;

    public DeliverUnlockRequest(){}

    public Integer getReservationId() {
        return reservationId;
    }

    public void setReservationId(Integer reservationId) {
        this.reservationId = reservationId;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }
}
