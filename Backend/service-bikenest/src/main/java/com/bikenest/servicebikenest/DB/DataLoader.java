package com.bikenest.servicebikenest.DB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private BikenestRepository bikenestRepository;

    @Autowired
    public DataLoader(BikenestRepository bikenestRepository) {
        this.bikenestRepository = bikenestRepository;
        this.LoadData();
    }

    public void LoadData() {
        if(bikenestRepository.count() == 0){
            Bikenest b1 = new Bikenest();
            b1.setName("Bikenest-1");
            b1.setGPSCoordinates("49.427378,11.254185");
            b1.setSpotsLeft(20);
            bikenestRepository.save(b1);

            Bikenest b2 = new Bikenest();
            b2.setName("Bikenest-2");
            b2.setGPSCoordinates("49.4250423,11.254185");
            b2.setSpotsLeft(5);
            bikenestRepository.save(b2);
        }
    }
}
