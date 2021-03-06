package com.bikenest.common.interfaces.bikenest;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AddBikenestRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String gpsCoordinates;
    @NotNull
    private Integer maximumSpots;
    @NotNull
    private Boolean chargingAvailable;

    public AddBikenestRequest(String name, String gpsCoordinates, Integer maximumSpots, boolean chargingAvailable){
        this.name = name;
        this.gpsCoordinates = gpsCoordinates;
        this.maximumSpots = maximumSpots;
        this.chargingAvailable = chargingAvailable;
    }

    public AddBikenestRequest(){}

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
