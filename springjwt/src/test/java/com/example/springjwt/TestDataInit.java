package com.example.springjwt;

import com.example.springjwt.domain.User;
import com.example.springjwt.domain.Vehicle;
import com.google.common.collect.Lists;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Profile("integrationTest")
public class TestDataInit extends AppDataInitializer {

    @Override
    protected void initializeDataInDb() {
        if (vehicleRepository.count() == 0) {
            System.out.println("initializing vehicles data...");
            Arrays.asList("moto", "car").forEach(v -> this.vehicleRepository.saveAndFlush(Vehicle.builder().model(v).build()));
        }
        System.out.println("printing all vehicles...");
        vehicleRepository.findAll().forEach(v -> System.out.println(" Vehicle :" + v.toString()));
        if (userRepository.count() == 0) {
            userRepository.saveAndFlush(User.builder().username("testApiUser").password(passwordEncoder.encode("apiUserPass")).roles(Lists.newArrayList("ROLE_USER")).build());
            userRepository.saveAndFlush(User.builder().username("testApiAdmin").password(passwordEncoder.encode("apiAdminPass")).roles(Lists.newArrayList("ROLE_ADMIN")).build());
        }
    }
}
