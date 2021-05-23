package com.bikenest.servicebikenest.DB;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BikenestRepository extends CrudRepository<Bikenest, Integer> {
    Optional<Bikenest> findByID(Integer id);

	Boolean existsByID(Integer id);
}
