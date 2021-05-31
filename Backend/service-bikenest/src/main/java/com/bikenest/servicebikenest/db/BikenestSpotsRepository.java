package com.bikenest.servicebikenest.db;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BikenestSpotsRepository extends CrudRepository<BikenestSpots, Long> {

    List<BikenestSpots> findByBikenest(Bikenest bikenest);
}
