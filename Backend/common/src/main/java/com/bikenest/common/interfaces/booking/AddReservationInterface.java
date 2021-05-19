package com.bikenest.common.interfaces.booking;

import java.time.LocalDateTime;

//see /booking/add Endpoint
public class AddReservationInterface {
    private Integer bikenestId;
    private LocalDateTime startDateTime; // String in JSON, Format: yyyy-MM-dd'T'HH:mm:ss example: 2021-10-23T09:45:00
    private LocalDateTime endDateTime; // see startDateTime

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }
}
