package com.bikenest.common.interfaces.booking;

public class StartUnlockRequest {
    private Integer reservationId;
    private String qrCode;

    public StartUnlockRequest(){}

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
