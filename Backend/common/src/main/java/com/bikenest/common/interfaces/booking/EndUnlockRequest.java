package com.bikenest.common.interfaces.booking;

public class EndUnlockRequest {
    private Integer reservationId;
    private String qrCode;

    public EndUnlockRequest(){}

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
