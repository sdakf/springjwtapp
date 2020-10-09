package com.example.springjwt;

import com.example.springjwt.domain.User;
import com.example.springjwt.domain.Vehicle;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("!integrationTest")
public class DataInitializer extends AppDataInitializer {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(DataInitializer.class);

    @Override
    protected void initializeDataInDb() {
        if (vehicleRepository.count() == 0) {
            log.info("initializing vehicles data...");
            Arrays.asList("BMW", "AUDI").forEach(v -> this.vehicleRepository.saveAndFlush(Vehicle.builder().model(v).build()));
        }
        log.info("printing all vehicles...");
        vehicleRepository.findAll().forEach(v -> log.info(" Vehicle :" + v.toString()));
        if (userRepository.count() == 0) {
            userRepository.saveAndFlush(User.builder().username("apiUser").password(passwordEncoder.encode("apiUserPass")).roles(Lists.newArrayList("ROLE_USER")).build());
            userRepository.saveAndFlush(User.builder().username("apiAdmin").password(passwordEncoder.encode("apiAdminPass")).roles(Lists.newArrayList("ROLE_ADMIN")).build());
        }
    }
}
