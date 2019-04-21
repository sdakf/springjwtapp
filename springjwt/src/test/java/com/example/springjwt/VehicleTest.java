package com.example.springjwt;

import com.example.springjwt.domain.Vehicle;
import org.junit.Test;

import static org.junit.Assert.assertTrue;

public class VehicleTest {

    @Test
    public void testVehicle(){
        Vehicle v = Vehicle.builder().model("test").build();
        v.setId(1L);
        assertTrue("id is 1L", 1L == v.getId());
        assertTrue("model is test", "test".equals(v.getModel()));

        Vehicle v2 =  Vehicle.builder().model("test2").build();
        v2.setId(2L);
        assertTrue("id is 2L", 2L == v2.getId());
        assertTrue("model is test2", "test2".equals(v2.getModel()));
    }
}