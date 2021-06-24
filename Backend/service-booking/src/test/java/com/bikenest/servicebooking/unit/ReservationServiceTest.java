package com.bikenest.servicebooking.unit;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.bikenest.ReserveSpotResponse;
import com.bikenest.common.interfaces.booking.CreateReservationRequest;
import com.bikenest.servicebooking.ServicebookingApplication;
import com.bikenest.servicebooking.DB.ReservationRepository;
import com.bikenest.servicebooking.Services.ReservationService;
import com.bikenest.servicebooking.DB.Reservation;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.assertj.core.api.Assertions;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ServicebookingApplication.class)
public class ReservationServiceTest {

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
        reservation0.setUserId(1);
        reservation0.setCancelled(true);
        Reservation reservation1 = new Reservation();
        reservation1.setUserId(1);
        reservation1.setCancelled(false);
        Reservation reservation2 = new Reservation();
        reservations.add(reservation0);
        reservations.add(reservation1);
        reservations.add(reservation2);

        ReserveSpotResponse responseSuccess = new ReserveSpotResponse(true, 1, 3);
        ReserveSpotResponse responseFailure = new ReserveSpotResponse(false, 1, 3);

        MockitoAnnotations.openMocks(this);
        when(reservationRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(reservationRepository.findAll()).thenReturn(reservations);
        when(reservationRepository.findById(1)).thenReturn(Optional.of(reservation0));
        when(reservationRepository.findById(2)).thenReturn(Optional.empty());
        when(reservationRepository.findById(3)).thenReturn(Optional.of(reservation1));

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
        Integer reservationMinutes = 30;
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
        Integer reservationMinutes = 30;
        CreateReservationRequest reservationRequest = new CreateReservationRequest();
        reservationRequest.setBikenestId(bikenestId);
        reservationRequest.setReservationMinutes(reservationMinutes);

        // Act
        // Assert
        Assertions.assertThatThrownBy(() -> reservationService.createReservation(userId, reservationRequest))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void cancelReservation_shouldThrow_whenReservationNotFound() throws BusinessLogicException {
        // Arrange
        Integer userId = 3;
        Integer reservationId = 2;

        // Act
        // Assert
        Assertions.assertThatThrownBy(() -> reservationService.cancelReservation(reservationId, userId))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void cancelReservation_shouldThrow_whenReservationIsCanceled() throws BusinessLogicException {
        // Arrange
        Integer userId = 1;
        Integer reservationId = 1;

        // Act
        // Assert
        Assertions.assertThatThrownBy(() -> reservationService.cancelReservation(reservationId, userId))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void cancelReservation_shouldCancelReservation() throws BusinessLogicException {
        // Arrange
        Integer userId = 1;
        Integer reservationId = 3;

        // Act
        Reservation reservation = reservationService.cancelReservation(reservationId, userId);

        // Assert
        Assert.assertTrue(reservation.isCancelled());
    }
}
