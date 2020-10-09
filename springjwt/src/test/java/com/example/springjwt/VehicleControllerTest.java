package com.example.springjwt;

import com.example.springjwt.domain.Vehicle;
import com.example.springjwt.domain.VehicleRepository;
import com.example.springjwt.web.VehicleController;
import com.example.springjwt.web.VehicleForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = VehicleController.class, secure = false)
@RunWith(SpringRunner.class)
public class VehicleControllerTest {

    @MockBean
    VehicleRepository vehiclesRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @Before
    public void setUp() {
        given(this.vehiclesRepository.findById(1L))
                .willReturn(Optional.of(Vehicle.builder().model("test").build()));

        given(this.vehiclesRepository.findById(2L))
                .willReturn(Optional.empty());

        given(this.vehiclesRepository.save(any(Vehicle.class)))
                .willReturn(Vehicle.builder().model("test").build());

        doNothing().when(this.vehiclesRepository).delete(any(Vehicle.class));
    }

    @Test
    public void testGetById() throws Exception {

        this.mockMvc
                .perform(
                        get("/v1/vehicles/{id}", 1L)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.model").value("test"));

        verify(this.vehiclesRepository, times(1)).findById(any(Long.class));
        verifyNoMoreInteractions(this.vehiclesRepository);
    }

    @Test
    public void testGetByIdNotFound() throws Exception {

        this.mockMvc
                .perform(
                        get("/v1/vehicles/{id}", 2L)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNotFound());

        verify(this.vehiclesRepository, times(1)).findById(any(Long.class));
        verifyNoMoreInteractions(this.vehiclesRepository);
    }

    @Test
    public void testSave() throws Exception {

        this.mockMvc
                .perform(
                        post("/v1/vehicles")
                                .content(this.objectMapper.writeValueAsBytes(VehicleForm.builder().name("test").build()))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isCreated());

        verify(this.vehiclesRepository, times(1)).save(any(Vehicle.class));
        verifyNoMoreInteractions(this.vehiclesRepository);
    }

    @Test
    public void testUpdate() throws Exception {

        this.mockMvc
                .perform(
                        put("/v1/vehicles/1")
                                .content(this.objectMapper.writeValueAsBytes(VehicleForm.builder().name("test").build()))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent());

        verify(this.vehiclesRepository, times(1)).findById(any(Long.class));
        verify(this.vehiclesRepository, times(1)).save(any(Vehicle.class));
        verifyNoMoreInteractions(this.vehiclesRepository);
    }

    @Test
    public void testDelete() throws Exception {

        this.mockMvc
                .perform(
                        delete("/v1/vehicles/1")
                )
                .andExpect(status().isNoContent());

        verify(this.vehiclesRepository, times(1)).findById(any(Long.class));
        verify(this.vehiclesRepository, times(1)).delete(any(Vehicle.class));
        verifyNoMoreInteractions(this.vehiclesRepository);
    }

}
