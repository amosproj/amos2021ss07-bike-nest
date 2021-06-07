package com.bikenest.servicebikenest.unit;

import com.bikenest.servicebikenest.db.Bikenest;
import com.bikenest.servicebikenest.db.Bikespot;

import java.util.HashSet;
import java.util.Set;

public class MockHelper {

    /**
     * Returns the userId that is used for Reservations.
     * @return
     */
    public static int getUserIdReservation(){
        return 1;
    }
    public static int getUserIdNoReservation(){
        return 2;
    }

    public static Bikenest constructBikenestNoFreeSpots(String name, int maxSpots){
        Bikenest bikenest = new Bikenest(name, "49.12,49.12", maxSpots, false);
        bikenest.setId(1);
        Set<Bikespot> bikespots = new HashSet<>();
        for(int i = 1; i <= maxSpots; i++){
            bikespots.add(new Bikespot(bikenest, i, getUserIdReservation(), true, false));
        }
        bikenest.setBikespots(bikespots);
        return bikenest;
    }

    public static Bikenest constructBikenestFreeSpots(String name, int maxSpots){
        Bikenest bikenest = new Bikenest(name, "49.12,49.12", maxSpots, false);
        bikenest.setId(2);
        Set<Bikespot> bikespots = new HashSet<>();
        for(int i = 1; i <= maxSpots; i++){
            bikespots.add(new Bikespot(bikenest, i, null, false, false));
        }
        bikenest.setBikespots(bikespots);
        return bikenest;
    }

    public static Bikenest constructBikenestReservedSpots(String name, int maxSpots){
        Bikenest bikenest = new Bikenest(name, "49.12,49.12", maxSpots, false);
        bikenest.setId(3);
        bikenest.setCurrentSpots(maxSpots/2);
        Set<Bikespot> bikespots = new HashSet<>();
        for(int i = 1; i <= maxSpots; i++){
            if(i <= maxSpots/2){
                bikespots.add(new Bikespot(bikenest, i, getUserIdReservation(), true, true));
            }else{
                bikespots.add(new Bikespot(bikenest, i, null, false, false));
            }

        }
        bikenest.setBikespots(bikespots);
        return bikenest;
    }

}
