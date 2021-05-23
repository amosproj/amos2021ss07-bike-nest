package com.bikenest.servicebikenest.DB;

import org.springframework.data.repository.CrudRepository;

public interface BikenestRepository extends CrudRepository<Bikenest, Integer> {
    Optional<Bikenest> findByID(Long id);

	Boolean existsByID(Long id);
}
