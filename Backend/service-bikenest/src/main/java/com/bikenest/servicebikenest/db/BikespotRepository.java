package com.bikenest.servicebikenest.db;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BikespotRepository extends CrudRepository<Bikespot, Long> {

    List<Bikespot> findByBikenest(Bikenest bikenest);
}
