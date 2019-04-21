package com.example.springjwt;

import com.example.springjwt.domain.User;
import com.example.springjwt.domain.Vehicle;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Slf4j
public class DataInitializer extends AppDataInitializer {

    @Override
    protected void initializeDataInDb() {
        if (vehicleRepository.count() == 0) {
            log.info("initializing vehicles data...");
            Arrays.asList("BMW", "AUDI").forEach(v -> this.vehicleRepository.saveAndFlush(Vehicle.builder().model(v).build()));
        }
        log.info("printing all vehicles...");
        vehicleRepository.findAll().forEach(v -> log.info(" Vehicle :" + v.toString()));
        if (userRepository.count() == 0) {
            userRepository.saveAndFlush(User.builder().username("apiUser").password(passwordEncoder.encode("apiUserPass")).roles(Lists.newArrayList("USER")).build());
            userRepository.saveAndFlush(User.builder().username("apiAdmin").password(passwordEncoder.encode("apiAdminPass")).roles(Lists.newArrayList("ADMIN")).build());
        }
    }
}