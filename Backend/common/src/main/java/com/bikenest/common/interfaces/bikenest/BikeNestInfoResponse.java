package com.bikenest.common.interfaces.bikenest;

public class BikeNestInfoResponse {
    private String bikenestName;
    private String address;
    private int spotsLeft;
    private boolean chargingOptionAvailable;
  

    public BikeNestInfoResponse(String bikenestName, String address, int spotsLeft, boolean chargingOptionAvailable){
        this.bikenestName = bikenestName;
        this.address = address;
        this.spotsLeft = spotsLeft;
        this.chargingOptionAvailable = chargingOptionAvailable;
    }

    public boolean isChargingOptionAvailable() {
        return chargingOptionAvailable;
    }

    public void setChargingOptionAvailable(boolean chargingOptionAvailable) {
        this.chargingOptionAvailable = chargingOptionAvailable;
    }

    public String getBikenestName() {
        return bikenestName;
    }

    public void setBikenestName(String bikenestName) {
        this.bikenestName = bikenestName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getSpotsLeft() {
        return spotsLeft;
    }

    public void setSpotsLeft(int spotsLeft) {
        this.spotsLeft = spotsLeft;
    }
}
