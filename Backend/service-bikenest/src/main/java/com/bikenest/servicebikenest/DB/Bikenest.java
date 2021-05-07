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

    private Integer SpotsLeft;

    public Integer GetId(){
        return Id;
    }

    public void SetId(Integer Id){
        this.Id = Id;
    }

    public Integer GetSpotsLeft() {
        return SpotsLeft;
    }

    public void SetSpotsLeft(Integer SpotsLeft) {
        this.SpotsLeft = SpotsLeft;
    }

    public String GetName() {
        return Name;
    }

    public void SetName(String Name) {
        this.Name = Name;
    }
}
