package com.example.springjwt.web;

import com.example.springjwt.domain.Vehicle;
import com.example.springjwt.domain.VehicleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;

import java.util.Optional;

import static org.springframework.http.ResponseEntity.*;

@RestController
@RequestMapping("/v1/vehicles")
public class VehicleController {

    private VehicleRepository vehicleRepository;

    public VehicleController(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }


    @GetMapping
    public ResponseEntity all() {
        return ok(vehicleRepository.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody VehicleForm form, HttpServletRequest request) {
        Vehicle saved = vehicleRepository.save(Vehicle.builder().model(form.getName()).build());
        return created(
                ServletUriComponentsBuilder
                        .fromContextPath(request)
                        .path("/v1/vehicleRepository/{id}")
                        .buildAndExpand(saved.getId())
                        .toUri())
                .build();
    }

    @GetMapping("/{id}")
    public ResponseEntity get(@PathVariable("id") Long id) {
        Optional<Vehicle> byId = vehicleRepository.findById(id);
        return ok(byId.orElseThrow(VehicleNotFoundException::new));
    }


    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") Long id, @RequestBody VehicleForm form) {
        Vehicle existed = vehicleRepository.findById(id).orElseThrow(VehicleNotFoundException::new);
        existed.setModel(form.getName());

        vehicleRepository.save(existed);
        return noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        Vehicle existed = vehicleRepository.findById(id).orElseThrow(VehicleNotFoundException::new);
        vehicleRepository.delete(existed);
        return noContent().build();
    }
}