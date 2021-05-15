package com.bikenest.servicebooking.Reservation;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class NewReservationPOJO {
    private Integer bikenestId;
    private LocalDateTime startDateTime;   //For what time was the Reservation planned
    private LocalDateTime endDateTime;     //For what time was it planned that the Reservation ends

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }
}
