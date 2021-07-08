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
            //Open the Station Lock
            if(raspiClient.openStationLock("left").equals("0"))
                throw new BusinessLogicException("Das Torschloss konnte nicht geöffnet werden.");
            //open the sliding gate
            if(raspiClient.openGate("left").equals("0"))
                throw new BusinessLogicException("Das Tor konnte nicht geöffnet werden.");

            logger.info("Opening the left Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }else{
            if(raspiClient.openStationLock("right").equals("0"))
                throw new BusinessLogicException("Das Torschloss konnte nicht geöffnet werden.");
            if(raspiClient.openGate("right").equals("0"))
                throw new BusinessLogicException("Das Tor konnte nicht geöffnet werden.");

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
            if(raspiClient.closeGate("left").equals("0"))
                throw new BusinessLogicException("Das Tor konnte nicht geschlossen werden.");
            if(raspiClient.closeStationLock("left").equals("0"))
                throw new BusinessLogicException("Das Torschloss konnte nicht geschlossen werden.");

            logger.info("Closing the left Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }else{
            if(raspiClient.closeGate("right").equals("0"))
                throw new BusinessLogicException("Das Tor konnte nicht geschlossen werden.");
            if(raspiClient.closeStationLock("right").equals("0"))
                throw new BusinessLogicException("Das Torschloss konnte nicht geschlossen werden.");

            logger.info("Closing the right Gate for userId:" + userId + ", bikenestId:" + bikenestId + ", bikespotNumber:" + bikespotId);
        }
    }

    public boolean bikespotOccupied(Integer bikenestId, Integer bikespotId){
        return raspiClient.getStatusBikespot(bikespotId).equals("0");
    }

    public void startBlinking(Integer bikenestId, Integer bikespotId){
        //Blink green
        raspiClient.setSpotReserved(bikespotId, "010", true);
    }

    public void stopBlinking(Integer bikenestId, Integer bikespotId){
        raspiClient.setSpotReserved(bikespotId, "010", false);
    }


}
