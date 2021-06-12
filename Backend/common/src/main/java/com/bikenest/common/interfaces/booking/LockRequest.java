package com.bikenest.common.interfaces.booking;

public class LockRequest {
    private Integer bookingId;

    public LockRequest(){}

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }
}
