package com.bikenest.common.interfaces.bikenest;

import javax.validation.constraints.NotBlank;

public class AddBikenestRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String gpsCoordinates;
    @NotBlank
    private Integer maximumSpots;

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
}
