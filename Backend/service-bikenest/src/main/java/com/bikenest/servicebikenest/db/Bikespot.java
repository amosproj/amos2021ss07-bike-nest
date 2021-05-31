package com.bikenest.servicebikenest.db;

import javax.persistence.*;

@Entity
@Table(name = "bikenestspots")
public class Bikespot {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private Integer spotNumber;
    private Integer userId;
    private Boolean reserved;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bikenest_id", nullable = false)
    private Bikenest bikenest;

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

    public Bikenest getBikenest() {
        return bikenest;
    }

    public void setBikenest(Bikenest bikenest) {
        this.bikenest = bikenest;
    }
}
