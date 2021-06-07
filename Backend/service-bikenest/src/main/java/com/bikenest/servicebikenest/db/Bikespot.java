package com.bikenest.servicebikenest.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@JsonIgnoreProperties({ "bikenest"})
public class Bikespot {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private Integer spotNumber;
    private Integer userId;
    private Boolean reserved;
    private Boolean leftSide; // is the Bikespot on the left side of the cage?

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="bikenest_id")
    private Bikenest bikenest;

    public Bikespot(Bikenest bikenest, Integer spotNumber, Integer userId, Boolean reserved, Boolean leftSide){
        this.spotNumber = spotNumber;
        this.userId = userId;
        this.reserved = reserved;
        this.leftSide = leftSide;
        this.bikenest = bikenest;
    }

    public Bikespot(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSpotNumber() {
        return spotNumber;
    }

    public void setSpotNumber(Integer spotNumber) {
        this.spotNumber = spotNumber;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public void setReserved(Boolean reserved) {
        this.reserved = reserved;
    }

    public Boolean getLeftSide() {
        return leftSide;
    }

    public void setLeftSide(Boolean leftSide) {
        this.leftSide = leftSide;
    }

    public Bikenest getBikenest() {
        return bikenest;
    }

    public void setBikenest(Bikenest bikenest) {
        this.bikenest = bikenest;
    }
}
