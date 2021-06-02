package com.bikenest.servicebooking.Services;

import org.springframework.stereotype.Service;

@Service
public class LockService {

    public boolean OpenLock(Integer bikenestId, Integer bikespotId){
        return true;
    }

    public boolean CloseLock(Integer bikenestId, Integer bikespotId){
        return true;
    }

    public boolean BikespotOccupied(Integer bikenestId, Integer bikespotId){
        return true;
    }
}
