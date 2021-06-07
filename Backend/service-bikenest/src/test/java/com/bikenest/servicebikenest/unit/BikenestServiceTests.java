package com.bikenest.servicebikenest.unit;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.ServicebikenestApplication;
import com.bikenest.servicebikenest.db.Bikenest;
import com.bikenest.servicebikenest.db.BikenestRepository;
import com.bikenest.servicebikenest.db.BikespotRepository;
import com.bikenest.servicebikenest.services.BikenestService;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.context.ContextConfiguration;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.notNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ContextConfiguration(classes = ServicebikenestApplication.class)
class BikenestServiceTests {

    @InjectMocks
    BikenestService bikenestService;

    @Mock
    BikenestRepository bikenestRepository;
    @Mock
    BikespotRepository bikespotRepository;

    private Bikenest freeSpots = MockHelper.constructBikenestFreeSpots("FreeSpots", 3);
    private Bikenest reservedSpots = MockHelper.constructBikenestReservedSpots("ReservedSpots", 4);
    private Bikenest notExistant = new Bikenest("NotExistant", "10.10,10.10", 10, false);
    private Bikenest invalidBikenest = new Bikenest("Invalid", "aad,3d", 10, false);
    private Bikenest fullBikenest = MockHelper.constructBikenestNoFreeSpots("NoSpotsFree", 10);

    @BeforeEach
    void setUpMocks() {
        MockitoAnnotations.openMocks(this);
        when(bikenestRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(bikespotRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(bikenestRepository.findByName(freeSpots.getName())).thenReturn(Optional.of(freeSpots));
        when(bikenestRepository.findById(freeSpots.getId())).thenReturn(Optional.of(freeSpots));
        when(bikenestRepository.findByName(fullBikenest.getName())).thenReturn(Optional.of(fullBikenest));
        when(bikenestRepository.findById(fullBikenest.getId())).thenReturn(Optional.of(fullBikenest));
        when(bikenestRepository.findByName(reservedSpots.getName())).thenReturn(Optional.of(reservedSpots));
        when(bikenestRepository.findById(reservedSpots.getId())).thenReturn(Optional.of(reservedSpots));
        when(bikenestRepository.findByName(notExistant.getName())).thenReturn(Optional.empty());
        when(bikenestRepository.findById(notExistant.getId())).thenReturn(Optional.empty());
        when(bikenestRepository.findByName(invalidBikenest.getName())).thenReturn(Optional.empty());
        when(bikenestRepository.findById(invalidBikenest.getId())).thenReturn(Optional.empty());
    }

    @Test
    void addingBikenests() throws BusinessLogicException {
        //Add valid Bikenest
        AddBikenestRequest addBikenestRequest = new AddBikenestRequest(notExistant.getName(), notExistant.getGpsCoordinates(),
                notExistant.getMaximumSpots(), notExistant.isChargingAvailable());
        Bikenest returned = bikenestService.addBikenest(addBikenestRequest);
        Assert.assertEquals(returned.getName(), notExistant.getName());
        Assert.assertEquals(returned.getCurrentSpots().intValue(), notExistant.getMaximumSpots().intValue());
        Assert.assertEquals(returned.getMaximumSpots().intValue(), notExistant.getMaximumSpots().intValue());
        Assert.assertEquals(returned.getGpsCoordinates(), notExistant.getGpsCoordinates());
        Assert.assertEquals(returned.getBikespots().size(), notExistant.getMaximumSpots().intValue());

        //Add invalid Bikenest (gps coordinates invalid)
        addBikenestRequest = new AddBikenestRequest(invalidBikenest.getName(), invalidBikenest.getGpsCoordinates(),
                invalidBikenest.getMaximumSpots(), invalidBikenest.isChargingAvailable());
        AddBikenestRequest finalAddBikenestRequest = addBikenestRequest;
        Assertions.assertThatThrownBy(() -> bikenestService.addBikenest(finalAddBikenestRequest))
                .isInstanceOf(BusinessLogicException.class);

        //Add existing bikenest
        addBikenestRequest = new AddBikenestRequest(freeSpots.getName(), freeSpots.getGpsCoordinates(), freeSpots.getMaximumSpots(), freeSpots.isChargingAvailable());
        AddBikenestRequest finalAddBikenestRequest1 = addBikenestRequest;
        Assertions.assertThatThrownBy(() -> bikenestService.addBikenest(finalAddBikenestRequest1))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void checkExistingBikenest() throws BusinessLogicException {
        Assert.assertTrue(bikenestService.existsBikenest(freeSpots.getId()));
        Assert.assertFalse(bikenestService.existsBikenest(notExistant.getId()));

        Assert.assertEquals(freeSpots.getMaximumSpots(), bikenestService.getBikenest(freeSpots.getId()).getCurrentSpots());
        Assert.assertEquals(reservedSpots.getCurrentSpots(), bikenestService.getBikenest(reservedSpots.getId()).getCurrentSpots());
    }

    @Test
    void reserveASpot() {
        //Reserve for empty bikenest
        Optional<Integer> spot = bikenestService.reserveSpot(freeSpots.getId(), MockHelper.getUserIdReservation());
        Assert.assertTrue(spot.isPresent());

        //Reserve for full bikenest
        spot = bikenestService.reserveSpot(fullBikenest.getId(), MockHelper.getUserIdReservation());
        Assert.assertTrue(spot.isEmpty());

        //Non existant bikenest
        spot = bikenestService.reserveSpot(notExistant.getId(), MockHelper.getUserIdReservation());
        Assert.assertTrue(spot.isEmpty());
    }

    @Test
    void freeASpot() {
        //Non existant bikenest
        Assert.assertFalse(bikenestService.freeSpot(notExistant.getId(), MockHelper.getUserIdReservation(), 1));

        //Empty bikenest
        Assert.assertFalse(bikenestService.freeSpot(freeSpots.getId(), MockHelper.getUserIdReservation(), 1));

        //Valid case, user owns that reservation
        Assert.assertTrue(bikenestService.freeSpot(reservedSpots.getId(), MockHelper.getUserIdReservation(), 1));

        //User does not own the reservation
        Assert.assertFalse(bikenestService.freeSpot(reservedSpots.getId(), MockHelper.getUserIdNoReservation(), 1));

        //Spot does not exists
        Assert.assertFalse(bikenestService.freeSpot(freeSpots.getId(), MockHelper.getUserIdReservation(), freeSpots.getMaximumSpots()+1));
    }

    @Test
    void getFreeSpots() {
        Assert.assertEquals(freeSpots.getCurrentSpots().intValue(),
                bikenestService.getFreeSpots(freeSpots.getId()).get().intValue());
        Assert.assertTrue(bikenestService.getFreeSpots(notExistant.getId()).isEmpty());
        Assert.assertEquals(reservedSpots.getCurrentSpots().intValue(),
                bikenestService.getFreeSpots(reservedSpots.getId()).get().intValue());
    }
}
