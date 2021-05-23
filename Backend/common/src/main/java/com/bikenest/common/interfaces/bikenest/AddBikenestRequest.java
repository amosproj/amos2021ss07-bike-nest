package com.bikenest.common.interfaces.bikenest;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;

public class AddBikenestRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String gpsCoordinates;
    @DecimalMin("1.0")
    @Digits(integer=8,fraction = 0)
    private Integer maximumSpots;
    private boolean chargingAvailable;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGpsCoordinates() {
        return gpsCoordinates;
    }

    public void setGpsCoordinates(String gpsCoordinates) {
        this.gpsCoordinates = gpsCoordinates;
    }

    public Integer getMaximumSpots() {
        return maximumSpots;
    }

    public void setMaximumSpots(Integer maximumSpots) {
        this.maximumSpots = maximumSpots;
    }

    public boolean isChargingAvailable() {
        return chargingAvailable;
    }

    public void setChargingAvailable(boolean chargingAvailable) {
        this.chargingAvailable = chargingAvailable;
    }
}
