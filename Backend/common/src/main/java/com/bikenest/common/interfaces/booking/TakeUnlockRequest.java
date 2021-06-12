package com.bikenest.common.interfaces.booking;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class TakeUnlockRequest {
    @NotNull
    private Integer bookingId;
    @NotBlank
    private String qrCode;

    public TakeUnlockRequest(){}

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
