package com.example.springjwt.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//@RepositoryRestResource
//@CrossOrigin(origins = "http://localhost:4200")
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
