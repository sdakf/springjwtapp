package com.example.springjwt;

import com.example.springjwt.domain.Vehicle;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
public class VehicleJpaTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    public void mapping() {
        Vehicle v = this.testEntityManager.persistFlushFind(Vehicle.builder().model("test").build());
        assertThat(v.getModel()).isEqualTo("test");
        assertThat(v.getId()).isNotNull();
        assertThat(v.getId()).isGreaterThan(0);
        //assertThat(v.getCreatedDate()).isNotNull();
    }
}