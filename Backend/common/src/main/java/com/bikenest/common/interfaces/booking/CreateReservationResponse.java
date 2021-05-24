package com.bikenest.common.interfaces.booking;

public class CreateReservationResponse {
    private boolean success;
    private String error;
    private Object reservation;

    public CreateReservationResponse(boolean success, String error, Object reservation){
        this.success = success;
        this.error = error;
        this.reservation = reservation;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Object getReservation() {
        return reservation;
    }

    public void setReservation(Object reservation) {
        this.reservation = reservation;
    }
}
