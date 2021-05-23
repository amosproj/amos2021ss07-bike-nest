package com.bikenest.servicebikenest.services;

import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.DB.Bikenest;
import com.bikenest.servicebikenest.DB.BikenestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BikenestService {
    @Autowired
    BikenestRepository bikenestRepository;

    public boolean existsBikenest(Integer bikenestId){
        return bikenestRepository.findById(bikenestId).isPresent();
    }

    public boolean reserveSpot(Integer bikenestId){
        Optional<Bikenest> bikenest = bikenestRepository.findById(bikenestId);

        if(!bikenest.isPresent())
            return false;

        Bikenest actualBikenest = bikenest.get();
        if (actualBikenest.getCurrentSpots() > 0){
            actualBikenest.setCurrentSpots(actualBikenest.getCurrentSpots() - 1);
            bikenestRepository.save(actualBikenest);
            return true;
        }else{
            return false;
        }
    }

    public boolean freeSpot(Integer bikenstId){
        Optional<Bikenest> bikenest = bikenestRepository.findById(bikenstId);

        if(!bikenest.isPresent())
            return false;

        Bikenest actualBikenest = bikenest.get();
        if (actualBikenest.getCurrentSpots() >= actualBikenest.getMaximumSpots()){
            actualBikenest.setCurrentSpots(actualBikenest.getCurrentSpots() + 1);
            bikenestRepository.save(actualBikenest);
            return true;
        }else{
            return false;
        }
    }

    public Iterable<Bikenest> getAllBikenests(){
        return bikenestRepository.findAll();
    }

    public void deleteAllBikenests(){
        bikenestRepository.deleteAll();
    }

    public void deleteBikenestById(Integer bikenestId){
        bikenestRepository.deleteById(bikenestId);
    }

    public Optional<Bikenest> addBikenest(AddBikenestRequest request){
        if(bikenestRepository.findByName(request.getName()).isPresent())
            return Optional.empty();

        Bikenest bikenest = new Bikenest();
        bikenest.setName(request.getName());
        bikenest.setMaximumSpots(request.getMaximumSpots());
        bikenest.setCurrentSpots(request.getMaximumSpots());
        bikenest.setGpsCoordinates(request.getGpsCoordinates());

        return Optional.of(bikenestRepository.save(bikenest));
    }
}
