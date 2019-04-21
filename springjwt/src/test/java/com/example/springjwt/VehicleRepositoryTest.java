package com.example.springjwt;

import com.example.springjwt.domain.Vehicle;
import com.example.springjwt.domain.VehicleRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class VehicleRepositoryTest {

    @Autowired
    private VehicleRepository vehicles;

    @Test
    public void mapping() {
        Vehicle saved = this.vehicles.save( Vehicle.builder().model("test").build());
        Vehicle v = this.vehicles.getOne(saved.getId());
        assertThat(v.getModel()).isEqualTo("test");
        assertThat(v.getId()).isNotNull();
        assertThat(v.getId()).isGreaterThan(0);
    }
}