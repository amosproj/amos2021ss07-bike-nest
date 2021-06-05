package com.bikenest.servicebikenest.integration;

import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.controllers.BikenestController;
import com.bikenest.servicebikenest.db.Bikenest;
import com.bikenest.servicebikenest.db.BikenestRepository;
import com.bikenest.servicebikenest.db.BikespotRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.PostConstruct;
import java.util.LinkedHashMap;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class BikenestControllerTest {

    private String AdminJWT = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE1JTiIsIkZpcnN0TmFtZSI6IiIsIkxhc3ROYW1lIjoiIiwiVXNlcklkIjoiIiwiUm9sZSI6IkFkbWluIiwiaWF0IjoxNjIyODQwMDI5LCJleHAiOjI1MjI4NDEwMjl9.iiwHCsYx_72fKiSfczigwK8rqMeILZZN5gQyW3EdBcxmEJk4BhHZxaS3WToWvm8dLbmaiif1oifMH57kJ8R1hg";
    private String UserJWT = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiUm9sZSI6IlVzZXIiLCJGaXJzdE5hbWUiOiJNYXgiLCJMYXN0TmFtZSI6Ik11c3RlciIsIlVzZXJJZCI6MSwiaWF0IjoxNjIyODQwMDA1LCJleHAiOjI1MjI4NDEwMDV9.1gBmWE1Jb17tStm8s0mhIok1ugAqn9F3sgGJmxzNlO4INZs8HVUOgMRJ2VrvaPAhcwco1c4RUUGkK3Hqk1QCeg";

    @LocalServerPort
    int randomServerPort;

    int previousBikenests = 0;

    ClientHelper clientHelper = new ClientHelper();

    @Autowired
    BikenestController bikenestController;

    @Autowired
    BikenestRepository bikenestRepository;
    @Autowired
    BikespotRepository bikespotRepository;

    @PostConstruct
    public void initialize() {
        clientHelper.initialize(randomServerPort);
        this.previousBikenests = 23;
    }

    @Test
    void testAddBikenestUser() {
        AddBikenestRequest addBikenestRequest = new AddBikenestRequest("Bikenest", "49.1, 49.1", 10, false);

        ResponseEntity<Bikenest> result = clientHelper.addBikenest(addBikenestRequest, this.UserJWT);
        Assertions.assertEquals(500, result.getStatusCodeValue());
    }

    @Test
    void testAddBikenestAdmin() {
        AddBikenestRequest addBikenestRequest = new AddBikenestRequest("Bikenest", "49.1, 49.1", 10, false);

        ResponseEntity<Bikenest> result = clientHelper.addBikenest(addBikenestRequest, this.AdminJWT);
        Assertions.assertEquals(200, result.getStatusCodeValue());
        Assertions.assertEquals(10, result.getBody().getCurrentSpots());
        Assertions.assertEquals("Bikenest", result.getBody().getName());

        result = clientHelper.addBikenest(addBikenestRequest, this.AdminJWT);
        Assertions.assertEquals(422, result.getStatusCodeValue());
    }

    @Test
    void testGetAllBikenest() {
        AddBikenestRequest addBikenestRequest1 = new AddBikenestRequest("BikenestTest1", "49.1, 49.1", 10, false);
        AddBikenestRequest addBikenestRequest2 = new AddBikenestRequest("BikenestTest2", "49.1, 49.1", 10, false);

        clientHelper.addBikenest(addBikenestRequest1, this.AdminJWT);
        clientHelper.addBikenest(addBikenestRequest2, this.AdminJWT);

        ResponseEntity<List<LinkedHashMap>> allBikenests = clientHelper.getAllBikenests();

        Assertions.assertEquals(200, allBikenests.getStatusCodeValue());
        Assertions.assertEquals(previousBikenests + 2, allBikenests.getBody().size());
        allBikenests.getBody().forEach(b -> {
            if(b.get("name").toString().contains("BikenestTest")){
                Assertions.assertEquals(10, b.get("currentSpots"));
            }
        });

        clientHelper.deleteAllBikenests(this.AdminJWT);

        allBikenests = clientHelper.getAllBikenests();
        Assertions.assertEquals(0, allBikenests.getBody().size());
    }


}
