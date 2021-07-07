package com.bikenest.servicebooking.Services;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.feignclients.RaspiClient;
import com.bikenest.common.interfaces.booking.GetBikespotRequest;
import com.bikenest.common.interfaces.booking.GetBikespotResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//TODO: The service currently ignores the bikenest Id for all interactions with the raspberry
@Service
public class LockService {

    Logger logger = LoggerFactory.getLogger(LockService.class);

    @Autowired
    BikenestClient bikenestClient;
    @Autowired
    RaspiClient raspiClient;

    public void openLock(Integer userId, Integer bikenestId, Integer bikespotId) throws BusinessLogicException {
        GetBikespotResponse response = bikenestClient.getBikespot(new GetBikespotRequest(bikenestId, bikespotId));
        if(!response.getExists()){
            throw new BusinessLogicException("Der Bikespot scheint nicht zu existieren!");
        }

        if(response.getUserId() == null || !response.getUserId().equals(userId)){
            throw new BusinessLogicException("Dieser Bikespot gehört zu einem anderen User!");
        }
        if(!response.getReserved()){
            throw new BusinessLogicException("Der Bikespot ist nicht reserviert!");
        }
        if(!response.getLeftSide()){
            //Toggling will not be required anymore
            //raspiClient.toggleStationLock();
            if(raspiClient.openGate("left") == 0)
                throw new BusinessLogicException("Das Tor konnte nicht geschlossen werden.");

            logger.info("Opening the left Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }else{
            //Toggling will not be required anymore
            //raspiClient.toggleStationLock();
            if(raspiClient.openGate("right") == 0)
                throw new BusinessLogicException("Das Tor konnte nicht geschlossen werden.");

            logger.info("Opening the right Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }
    }

    public void closeLock(Integer userId, Integer bikenestId, Integer bikespotId) throws BusinessLogicException {
        GetBikespotResponse response = bikenestClient.getBikespot(new GetBikespotRequest(bikenestId, bikespotId));
        if(!response.getExists()){
            throw new BusinessLogicException("Der Bikespot scheint nicht zu existieren!");
        }

        if(response.getUserId() == null || !response.getUserId().equals(userId)){
            throw new BusinessLogicException("Dieser Bikespot gehört zu einem anderen User!");
        }
        if(!response.getReserved()){
            throw new BusinessLogicException("Der Bikespot ist nicht reserviert!");
        }
        if(!response.getLeftSide()){
            if(raspiClient.closeGate("left") == 0)
                throw new BusinessLogicException("Das Tor konnte nicht geschlossen werden.");
            //raspiClient.toggleStationLock();
            logger.info("Closing the left Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }else{
            if(raspiClient.closeGate("right") == 0)
                throw new BusinessLogicException("Das Tor konnte nicht geschlossen werden.");
            //raspiClient.toggleStationLock();
            logger.info("Closing the right Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }
    }

    public boolean bikespotOccupied(Integer bikenestId, Integer bikespotId){
        String status = raspiClient.getStatusBikespot(bikespotId);
        return status.equals("occupied");
    }

    public void startBlinking(Integer bikenestId, Integer bikespotId){
        //Blink green
        raspiClient.setSpotReserved(bikespotId, "010", true);
    }

    public void stopBlinking(Integer bikenestId, Integer bikespotId){
        raspiClient.setSpotReserved(bikespotId, "010", false);
    }


}
