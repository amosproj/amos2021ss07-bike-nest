package com.bikenest.common.interfaces.booking;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

//see /booking/add Endpoint
public class CreateReservationRequest {
    @NotBlank
    private Integer bikenestId;
    @NotBlank
    private LocalDateTime startDateTime; // String in JSON, Format: yyyy-MM-dd'T'HH:mm:ss example: 2021-10-23T09:45:00
    @NotBlank
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
