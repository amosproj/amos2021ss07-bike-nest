package com.bikenest.servicebooking.unit;

import com.bikenest.servicebooking.Services.ReservationService;
import org.junit.BeforeClass;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * For this test a mysql docker container should be running that exposes the port 3306.
 * Also you have to set the db name to booking and create a user with name bookingservice and password test.
 * //TODO: DOES NOT WORK YET
 * Docker Command:
 * docker run --name testdb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=test -e MYSQL_USER=bookingservice -e MYSQL_PASSWORD=test -e MYSQL_DATABASE=booking -d mysql:latest
 */
//@SpringBootTest
public class ReservationServiceTest {

    @Autowired
    ReservationService reservationService;

    @BeforeClass
    public void SetEnvironment() {
        System.setProperty("MYSQL_HOST", "localhost");
        System.setProperty("MYSQL_PORT", "3306");
        System.setProperty("MYSQL_DBNAME", "booking");
        System.setProperty("MYSQL_USER", "bookingservice");
        System.setProperty("MYSQL_PASSWORD", "test");
    }

    @Test
    public void TestDatabase(){

        assert(true);
    }
}
