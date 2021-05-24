package com.bikenest.servicebikenest.DB;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//Auto generate a table from this class
@Entity
public class Bikenest {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer Id;

    private String Name;

    private String GPSCoordinates;

    private Integer SpotsLeft;

    public Integer getId(){
        return Id;
    }

    public void setId(Integer Id){
        this.Id = Id;
    }

    public Integer getSpotsLeft() {
        return SpotsLeft;
    }

    public void setSpotsLeft(Integer SpotsLeft) {
        this.SpotsLeft = SpotsLeft;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getGPSCoordinates(){ return GPSCoordinates; }

    public void setGPSCoordinates(String GPSCoordinates){ this.GPSCoordinates = GPSCoordinates; }
}
