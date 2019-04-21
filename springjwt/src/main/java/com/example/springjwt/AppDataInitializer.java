package com.example.springjwt;

import com.example.springjwt.domain.UserRepository;
import com.example.springjwt.domain.VehicleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
public abstract class AppDataInitializer implements InitializingBean {

    @Value("${initializeDataInDb}")
    protected boolean initializeDataInDb;

    @Autowired
    protected VehicleRepository vehicleRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected PasswordEncoder passwordEncoder;

    public void afterPropertiesSet() {
        if (initializeDataInDb) {
            initializeDataInDb();
        }else {
            log.info("Not initializing data...");
        }
    }

    protected abstract void initializeDataInDb();
}
