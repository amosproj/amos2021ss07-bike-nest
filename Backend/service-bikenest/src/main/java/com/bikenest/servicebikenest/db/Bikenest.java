package com.bikenest.servicebikenest.db;

import com.bikenest.common.helper.RandomStringHelper;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
public class Bikenest {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String name;
    private String gpsCoordinates;
    private String qrCode;
    private Integer maximumSpots;
    private Integer currentSpots;
    private boolean chargingAvailable;

    @OneToMany(mappedBy = "bikenest", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Bikespot> bikespots;

    public Bikenest(String name, String gpsCoordinates, Integer maximumSpots, boolean chargingAvailable){
        this.name = name;
        this.gpsCoordinates = gpsCoordinates;
        this.maximumSpots = maximumSpots;
        this.currentSpots = maximumSpots;
        this.chargingAvailable = chargingAvailable;
        this.qrCode = RandomStringHelper.nextString(12);
    }

    public Bikenest(){
        this.qrCode = RandomStringHelper.nextString(12);
    }

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

    public Set<Bikespot> getBikespots() {
        return bikespots;
    }

    public void setBikespots(Set<Bikespot> bikespots) {
        this.bikespots = bikespots;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }
}
