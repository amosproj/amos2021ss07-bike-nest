package com.bikenest.servicebooking.unit;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.bikenest.ReserveSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotResponse;
import com.bikenest.common.interfaces.booking.CreateReservationRequest;
import com.bikenest.servicebooking.ServicebookingApplication;
import com.bikenest.servicebooking.DB.ReservationRepository;
import com.bikenest.servicebooking.Services.ReservationService;
import com.bikenest.servicebooking.DB.Reservation;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.assertj.core.api.Assertions;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ServicebookingApplication.class)
public class ReservationServiceTest {

    // @Autowired
    // ReservationService reservationService;

    // @BeforeClass
    // public void SetEnvironment() {
    // System.setProperty("MYSQL_HOST", "localhost");
    // System.setProperty("MYSQL_PORT", "3306");
    // System.setProperty("MYSQL_DBNAME", "booking");
    // System.setProperty("MYSQL_USER", "bookingservice");
    // System.setProperty("MYSQL_PASSWORD", "test");
    // }

    // @Test
    // public void TestDatabase(){

    // assert(true);
    // }

    @InjectMocks
    ReservationService reservationService;

    @Mock
    ReservationRepository reservationRepository;
    @Mock
    BikenestClient bikenestClient;

    @BeforeEach
    void setUpMocks() {
        List<Reservation> reservations = new ArrayList<Reservation>();
        Reservation reservation0 = new Reservation();
        Reservation reservation1 = new Reservation();
        Reservation reservation2 = new Reservation();
        reservations.add(reservation0);
        reservations.add(reservation1);
        reservations.add(reservation2);

        ReserveSpotResponse responseSuccess = new ReserveSpotResponse(true, 1, 3);
        ReserveSpotResponse responseFailure = new ReserveSpotResponse(false, 1, 3);

        MockitoAnnotations.openMocks(this);
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(reservationRepository.findAll()).thenReturn(reservations);

        when(bikenestClient.existsBikenest(1)).thenReturn(true);
        when(bikenestClient.existsBikenest(2)).thenReturn(false);
        when(bikenestClient.existsBikenest(3)).thenReturn(true);
        when(bikenestClient.hasFreeSpots(1)).thenReturn(true);
        when(bikenestClient.hasFreeSpots(2)).thenReturn(false);
        when(bikenestClient.hasFreeSpots(3)).thenReturn(false);
        when(bikenestClient.reserveSpot(any())).thenReturn(responseSuccess);
        // when(bikenestClient.reserveSpot(new ReserveSpotRequest(1,
        // 3))).thenReturn(responseSuccess);
        // when(bikenestClient.reserveSpot(new ReserveSpotRequest(2,
        // 3))).thenReturn(responseFailure);
    }

    @Test
    void getAllReservations_shouldReturnAllReservations() {
        // Arrange
        // Act
        List<Reservation> result = reservationService.getAllReservations();
        // Assert
        Assert.assertArrayEquals(reservationRepository.findAll().toArray(), result.toArray());
    }

    @Test
    void createReservation_shouldCreateReservation() throws BusinessLogicException {
        // Arrange
        Integer userId = 3;
        Integer bikenestId = 1;
        Integer bikespotNumber = 3;
        Integer reservationMinutes = 30;
        boolean paid = false;
        LocalDateTime reservationStart = LocalDateTime.now();
        LocalDateTime reservationEnd = LocalDateTime.now().plusMinutes(reservationMinutes);
        CreateReservationRequest reservationRequest = new CreateReservationRequest();
        reservationRequest.setBikenestId(bikenestId);
        reservationRequest.setReservationMinutes(reservationMinutes);
        Reservation reservationResult = new Reservation(userId, bikenestId, bikespotNumber, reservationMinutes, paid,
                reservationStart, reservationEnd);

        // Act
        Reservation reservation = reservationService.createReservation(userId, reservationRequest);
        // Assert
        Assert.assertEquals(reservationResult.getBikenestId(), reservation.getBikenestId());
        Assert.assertEquals(reservationResult.getBikespotNumber(), reservation.getBikespotNumber());
        Assert.assertEquals(reservationResult.getUserId(), reservation.getUserId());
        Assert.assertEquals(reservationResult.getReservationMinutes(), reservation.getReservationMinutes());
        Assert.assertTrue("Dates aren't close enough to each other!", Duration
                .between(reservationResult.getReservationStart(), reservation.getReservationStart()).toMillis() < 1000);
        Assert.assertTrue("Dates aren't close enough to each other!", Duration
                .between(reservationResult.getReservationEnd(), reservation.getReservationEnd()).toMillis() < 1000);
    }

    @Test
    void createReservation_shouldThrow_whenBikenestDoesNotExist() throws BusinessLogicException {
        // Arrange
        Integer userId = 3;
        Integer bikenestId = 2;
        Integer bikespotNumber = 3;
        Integer reservationMinutes = 30;
        boolean paid = false;
        LocalDateTime reservationStart = LocalDateTime.now();
        LocalDateTime reservationEnd = LocalDateTime.now().plusMinutes(reservationMinutes);
        CreateReservationRequest reservationRequest = new CreateReservationRequest();
        reservationRequest.setBikenestId(bikenestId);
        reservationRequest.setReservationMinutes(reservationMinutes);

        // Act
        // Assert
        Assertions.assertThatThrownBy(() -> reservationService.createReservation(userId, reservationRequest))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void createReservation_shouldThrow_whenBikenestDoesNotHaveAFreeSpot() throws BusinessLogicException {
        // Arrange
        Integer userId = 3;
        Integer bikenestId = 3;
        Integer bikespotNumber = 3;
        Integer reservationMinutes = 30;
        boolean paid = false;
        LocalDateTime reservationStart = LocalDateTime.now();
        LocalDateTime reservationEnd = LocalDateTime.now().plusMinutes(reservationMinutes);
        CreateReservationRequest reservationRequest = new CreateReservationRequest();
        reservationRequest.setBikenestId(bikenestId);
        reservationRequest.setReservationMinutes(reservationMinutes);

        // Act
        // Assert
        Assertions.assertThatThrownBy(() -> reservationService.createReservation(userId, reservationRequest))
                .isInstanceOf(BusinessLogicException.class);
    }
}
