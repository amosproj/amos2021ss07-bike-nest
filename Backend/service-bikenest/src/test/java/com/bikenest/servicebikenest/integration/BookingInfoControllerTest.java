package com.bikenest.servicebikenest.integration;

import com.bikenest.servicebikenest.controllers.BikenestController;
import com.bikenest.servicebikenest.controllers.BookingInfoController;
import com.bikenest.servicebikenest.db.BikenestRepository;
import com.bikenest.servicebikenest.db.BikespotRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.PostConstruct;

@RunWith(SpringRunner.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookingInfoControllerTest {
    private String AdminJWT = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBRE1JTiIsIkZpcnN0TmFtZSI6IiIsIkxhc3ROYW1lIjoiIiwiVXNlcklkIjoiIiwiUm9sZSI6IkFkbWluIiwiaWF0IjoxNjIyODQwMDI5LCJleHAiOjI1MjI4NDEwMjl9.iiwHCsYx_72fKiSfczigwK8rqMeILZZN5gQyW3EdBcxmEJk4BhHZxaS3WToWvm8dLbmaiif1oifMH57kJ8R1hg";
    private String UserJWT = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiUm9sZSI6IlVzZXIiLCJGaXJzdE5hbWUiOiJNYXgiLCJMYXN0TmFtZSI6Ik11c3RlciIsIlVzZXJJZCI6MSwiaWF0IjoxNjIyODQwMDA1LCJleHAiOjI1MjI4NDEwMDV9.1gBmWE1Jb17tStm8s0mhIok1ugAqn9F3sgGJmxzNlO4INZs8HVUOgMRJ2VrvaPAhcwco1c4RUUGkK3Hqk1QCeg";

    @LocalServerPort
    int randomServerPort;
    ClientHelper clientHelper = new ClientHelper();

    @PostConstruct
    public void initialize() {
        clientHelper.initialize(randomServerPort);
    }



    @Test
    void dummyTest(){

    }
}
