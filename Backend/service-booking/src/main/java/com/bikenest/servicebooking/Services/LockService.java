package com.bikenest.servicebooking.Services;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.booking.GetBikespotRequest;
import com.bikenest.common.interfaces.booking.GetBikespotResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LockService {

    Logger logger = LoggerFactory.getLogger(LockService.class);

    @Autowired
    BikenestClient bikenestClient;

    public void OpenLock(Integer userId, Integer bikenestId, Integer bikespotId) throws BusinessLogicException {
        GetBikespotResponse response = bikenestClient.getBikespot(new GetBikespotRequest(bikenestId, bikespotId));
        if(!response.getUserId().equals(userId)){
            throw new BusinessLogicException("Dieser Bikespot gehört zu einem anderen User!");
        }
        if(!response.getReserved()){
            throw new BusinessLogicException("Der Bikespot ist nicht reserviert!");
        }
        if(!response.getLeftSide()){
            //TODO: Open the left gate
            logger.debug("Opening the left Gate for userId:" + userId + ", bikenestId:" + bikenestId + "bikespotId:" + bikespotId);
        }else{
            logger.debug("Opening the right Gate for userId:" + userId + ", bikenestId:" + bikenestId + "bikespotId:" + bikespotId);
        }
    }

    public void CloseLock(Integer userId, Integer bikenestId, Integer bikespotId) throws BusinessLogicException {
        GetBikespotResponse response = bikenestClient.getBikespot(new GetBikespotRequest(bikenestId, bikespotId));
        if(!response.getUserId().equals(userId)){
            throw new BusinessLogicException("Dieser Bikespot gehört zu einem anderen User!");
        }
        if(!response.getReserved()){
            throw new BusinessLogicException("Der Bikespot ist nicht reserviert!");
        }
        if(!response.getLeftSide()){
            //TODO: Close the left gate
            logger.debug("Closing the left Gate for userId:" + userId + ", bikenestId:" + bikenestId + "bikespotId:" + bikespotId);
        }else{
            logger.debug("Closing the right Gate for userId:" + userId + ", bikenestId:" + bikenestId + "bikespotId:" + bikespotId);
        }
    }

    public boolean BikespotOccupied(Integer bikenestId, Integer bikespotId){
        //TODO: Should the Raspberry Pi keep the Bikespot Table updated via regular calls (field occupied)?
        return true;
    }
}
