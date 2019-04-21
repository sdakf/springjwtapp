package com.example.springjwt.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "/restapi/vehicles")
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
