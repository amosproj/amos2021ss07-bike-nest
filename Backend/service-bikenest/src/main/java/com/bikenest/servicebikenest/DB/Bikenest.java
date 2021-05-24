package com.bikenest.servicebikenest.DB;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bikenest {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String name;
    private String gpsCoordinates;
    private Integer maximumSpots;
    private Integer currentSpots;
    private boolean chargingAvailable;

    public Bikenest(String name, String gpsCoordinates, Integer maximumSpots, boolean chargingAvailable){
        this.name = name;
        this.gpsCoordinates = gpsCoordinates;
        this.maximumSpots = maximumSpots;
        this.currentSpots = maximumSpots;
        this.chargingAvailable = chargingAvailable;
    }

    public Bikenest(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public Integer getCurrentSpots() {
        return currentSpots;
    }

    public void setCurrentSpots(Integer currentSpots) {
        this.currentSpots = currentSpots;
    }

    public boolean isChargingAvailable() {
        return chargingAvailable;
    }

    public void setChargingAvailable(boolean chargingAvailable) {
        this.chargingAvailable = chargingAvailable;
    }
}
