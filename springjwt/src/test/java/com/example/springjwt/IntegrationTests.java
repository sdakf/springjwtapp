package com.example.springjwt;


import com.example.springjwt.web.AuthenticationRequest;
import com.example.springjwt.web.VehicleForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
@Slf4j
public class IntegrationTests {

    @LocalServerPort
    private int port;

    @Autowired
    ObjectMapper objectMapper;

    private String token;

    @Before
    public void setup() {
        RestAssured.port = this.port;
        token = given()
                .contentType(ContentType.JSON)
                .body(AuthenticationRequest.builder().username("testApiAdmin").password("apiAdminPass").build())
                .when().post("/auth/signIn")
                .andReturn().jsonPath().getString("token");
        log.info("Got token:" + token);
    }

    @Test
    public void getAllVehicles() throws Exception {
        //@formatter:off
        given()
                .header("Authorization", "Bearer "+token)
                .accept(ContentType.JSON)

                .when()
                .get("/v1/vehicles")

                .then()
                .assertThat()
                .statusCode(HttpStatus.SC_OK);
        //@formatter:on
    }

    @Test
    public void testSave() throws Exception {
        //@formatter:off
        given()

                .contentType(ContentType.JSON)
                .body(VehicleForm.builder().name("test").build())

                .when()
                .post("/v1/vehicles")

                .then()
                .statusCode(403);

        //@formatter:on
    }

    @Test
    public void testSaveWithAuth() throws Exception {

        //@formatter:off
        given()
                .header("Authorization", "Bearer "+token)
                .contentType(ContentType.JSON)
                .body(VehicleForm.builder().name("test").build())

                .when()
                .post("/v1/vehicles")

                .then()
                .statusCode(201);

        //@formatter:on
    }

}