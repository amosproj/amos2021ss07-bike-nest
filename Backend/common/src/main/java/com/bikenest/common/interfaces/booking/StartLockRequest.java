package com.bikenest.common.interfaces.booking;

public class StartLockRequest {
    private Integer bookingId;
    private String qrCode;

    public StartLockRequest(){}


    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }
}
