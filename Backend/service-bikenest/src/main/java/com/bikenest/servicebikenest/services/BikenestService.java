package com.bikenest.servicebikenest.services;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.db.Bikenest;
import com.bikenest.servicebikenest.db.BikenestRepository;
import com.bikenest.servicebikenest.db.Bikespot;
import com.bikenest.servicebikenest.db.BikespotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@DependsOn({"bikenestRepository", "bikespotRepository"})
public class BikenestService {
    BikenestRepository bikenestRepository;
    BikespotRepository bikespotRepository;

    Logger logger = LoggerFactory.getLogger(BikenestService.class);

    @Autowired
    public BikenestService(BikenestRepository bikenestRepository, BikespotRepository bikespotRepository){
        this.bikenestRepository = bikenestRepository;
        this.bikespotRepository = bikespotRepository;
    }


    public boolean existsBikenest(Integer bikenestId){
        return bikenestRepository.findById(bikenestId).isPresent();
    }

    /**
     * Tries to reserve a spot for the given Bikenest and in succesful case, the
     * concrete spot id is returned.
     * @param bikenestId Id of the Bikenest where a spot should be reserved
     * @return An optional Integer that gives the reserved spot number (if there were no errors)
     */
    public Optional<Integer> reserveSpot(Integer bikenestId, Integer userId){
        Optional<Bikenest> bikenest = bikenestRepository.findById(bikenestId);

        if(!bikenest.isPresent())
            return Optional.empty();

        // Takes a spot that isn't currently reserved (if there are any...)
        Optional<Bikespot> bikespot = bikenest.get().getBikespots().stream().filter(spot -> !spot.getReserved()).findFirst();

        if(!bikespot.isPresent())
            return Optional.empty();

        // Update Information for this Bikespot (set reserved and the user id)
        Bikespot actualBikespot = bikespot.get();
        actualBikespot.setReserved(true);
        actualBikespot.setUserId(userId);
        bikespotRepository.save(actualBikespot);

        Bikenest actualBikenest = bikenest.get();
        actualBikenest.setCurrentSpots(actualBikenest.getCurrentSpots() - 1);
        bikenestRepository.save(actualBikenest);
        return Optional.of(actualBikespot.getSpotNumber());
    }

    /**
     * Tries to free the spot with the given spotId for the given Bikenest.
     * It is checked, if the spot is existant and if it is reserved by the given user.
     * @param bikenestId
     * @param userId
     * @param spotId
     * @return
     */
    public boolean freeSpot(Integer bikenestId, Integer userId, Integer spotId){
        Optional<Bikenest> bikenest = bikenestRepository.findById(bikenestId);

        if(!bikenest.isPresent())
            return false;

        // Find the reserved spot and also check if that spot is owned by userId and is reserved
        Optional<Bikespot> bikespot = bikenest.get().getBikespots().stream()
                .filter(spot -> spot.getSpotNumber().equals(spotId) && spot.getUserId().equals(userId) && spot.getReserved())
                .findFirst();

        if(!bikespot.isPresent())
            return false;

        Bikespot acutalBikespot = bikespot.get();
        acutalBikespot.setReserved(false);
        acutalBikespot.setUserId(null);
        bikespotRepository.save(acutalBikespot);

        Bikenest actualBikenest = bikenest.get();
        actualBikenest.setCurrentSpots(actualBikenest.getCurrentSpots() + 1);
        bikenestRepository.save(actualBikenest);

        return true;
    }

    public List<Bikenest> getAllBikenests(){
        List<Bikenest> result = new ArrayList<>();
        bikenestRepository.findAll().forEach(result::add);
        return result;
    }

    public void deleteAllBikenests(){
        bikenestRepository.deleteAll();
    }

    public void deleteBikenestById(Integer bikenestId){
        bikenestRepository.deleteById(bikenestId);
    }


    /**
     * Creates a Bikenest and automatically also creates the Bikespots for this Bikenest.
     * TODO: Set if the Bikespot is on the left or right side of the cage. Right now it is just divded evenly.
     * @param request
     * @return
     */
    public Bikenest addBikenest(AddBikenestRequest request) throws BusinessLogicException {
        if(bikenestRepository.findByName(request.getName()).isPresent())
            throw new BusinessLogicException("Ein Bikenest mit diesem Namen existiert bereits!");

        Bikenest bikenest = new Bikenest(request.getName(), request.getGpsCoordinates(), request.getMaximumSpots(),
                request.isChargingAvailable());

        // Create the Bikespots (TODO: Do you also have to save each bikespot?)
        Set<Bikespot> spots = new HashSet<>();
        for(int i = 1; i <= request.getMaximumSpots(); i++){
            Bikespot bikespot = new Bikespot();
            bikespot.setLeftSide(i < (request.getMaximumSpots()/2));
            bikespot.setReserved(false);
            bikespot.setUserId(null);
            bikespot.setSpotNumber(i);
            bikespot.setBikenest(bikenest);
            spots.add(bikespot);
        }
        bikenest.setBikespots(spots);

        return bikenestRepository.save(bikenest);
    }

    public Optional<Integer> getFreeSpots(Integer bikenestId){
        Optional<Bikenest> bikenest = bikenestRepository.findById(bikenestId);

        if(!bikenest.isPresent()){
            return Optional.empty();
        }


        Bikenest actualBikenest = bikenest.get();
        // This additional check should not be required
        Long freeSpots = actualBikenest.getBikespots().stream().filter(spot -> !spot.getReserved()).count();
        if(freeSpots.intValue() != actualBikenest.getCurrentSpots()){
            this.logger.error("The number of free Bikespots according to Bikespot Table is different to" +
                    " the number of free spots according to the Bikenest!");
            return Optional.empty();
        }

        return Optional.of(actualBikenest.getCurrentSpots());
    }

    public Bikenest getBikenestInfo(Integer bikenestId) throws BusinessLogicException {
        Optional<Bikenest> bikenest = bikenestRepository.findById(bikenestId);

        if(bikenest.isEmpty())
            throw new BusinessLogicException("Ein Bikenest mit dieser ID existiert nicht!");

        return bikenest.get();
    }
}
