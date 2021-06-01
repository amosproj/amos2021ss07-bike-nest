package com.bikenest.servicebikenest.db;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BikenestRepository extends CrudRepository<Bikenest, Integer> {
    Optional<Bikenest> findByName(String name);
}
