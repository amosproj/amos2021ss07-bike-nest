package com.bikenest.common.interfaces.booking;

import javax.validation.constraints.NotNull;

public class LockRequest {
    @NotNull
    private Integer bookingId;

    public LockRequest(){}

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }
}
