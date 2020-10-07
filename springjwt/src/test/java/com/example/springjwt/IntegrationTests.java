package com.example.springjwt;


import com.example.springjwt.web.AuthenticationRequest;
import com.example.springjwt.web.VehicleForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ValidatableResponse;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class IntegrationTests {

    private static final Logger log = org.slf4j.LoggerFactory.getLogger(IntegrationTests.class);

    @LocalServerPort
    private int port;

    @Autowired
    ObjectMapper objectMapper;

    private String tokenAdmin;
    private String tokenUser;

    @Before
    public void setup() {
        RestAssured.port = this.port;
        tokenAdmin = given()
                .contentType(ContentType.JSON)
                .body(AuthenticationRequest.builder().username("testApiAdmin").password("apiAdminPass").build())
                .when().post("/auth/signIn")
                .andReturn()
                .jsonPath()
                .getString("token");
        tokenUser = given()
                .contentType(ContentType.JSON)
                .body(AuthenticationRequest.builder().username("testApiUser").password("apiUserPass").build())
                .when().post("/auth/signIn")
                .andReturn()
                .jsonPath()
                .getString("token");
        log.info("Got token:" + tokenAdmin);
    }

    @Test
    public void getAllVehicles() throws Exception {
        //@formatter:off
        given()
                .header("Authorization", "Bearer " + tokenAdmin)
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
    public void testSaveAsUser() throws Exception {
        //@formatter:off
        ValidatableResponse validatableResponse = given()
                .header("Authorization", "Bearer " + tokenUser)

                .contentType(ContentType.JSON)
                .body(VehicleForm.builder().name("test").build())

                .when()
                .post("/v1/vehicles")
                .andReturn()
                .then()

                .statusCode(403);
        String s = validatableResponse.toString();

        //@formatter:on
    }

    @Test
    public void testSaveWithAuth() throws Exception {

        //@formatter:off
        ValidatableResponse validatableResponse = given()
                .header("Authorization", "Bearer " + tokenAdmin)
                .contentType(ContentType.JSON)
                .body(VehicleForm.builder().name("test").build())

                .when()
                .post("/v1/vehicles")

                .then()

                .statusCode(201);
        System.out.println(validatableResponse);

        //@formatter:on
    }

}
