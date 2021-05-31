package com.bikenest.servicebikenest.db;

import javax.persistence.*;

@Entity
@Table(name = "bikenestspots")
public class BikenestSpots {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private Integer spot_number;
    private Integer user_id;
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

    public Integer getSpot_number() {
        return spot_number;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public Boolean getReserved() {
        return reserved;
    }

    public Bikenest getBikenest() {
        return bikenest;
    }
}
