package com.bikenest.servicebooking.Reservation;

import javax.persistence.Basic;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.time.ZonedDateTime;

public class NewReservation {
    private Integer bikenestId;
    private ZonedDateTime startDateTime;   //For what time was the Reservation planned
    private ZonedDateTime endDateTime;     //For what time was it planned that the Reservation ends

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setStartDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public ZonedDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setEndDateTime(ZonedDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public ZonedDateTime getEndDateTime() {
        return endDateTime;
    }
}
