package com.bikenest.servicebikenest.unit;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.bikenest.AddBikenestRequest;
import com.bikenest.servicebikenest.ServicebikenestApplication;
import com.bikenest.servicebikenest.db.Bikenest;
import com.bikenest.servicebikenest.db.BikenestRepository;
import com.bikenest.servicebikenest.db.Bikespot;
import com.bikenest.servicebikenest.db.BikespotRepository;
import com.bikenest.servicebikenest.services.BikenestService;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ContextConfiguration(classes = ServicebikenestApplication.class)
class BikenestServiceTests {

    @InjectMocks
    BikenestService bikenestService;

    @Mock
    BikenestRepository bikenestRepository;

    @BeforeEach
    void setUpMocks(){
        MockitoAnnotations.openMocks(this);
        when(bikenestRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        when(bikenestRepository.findByName("NotExistant")).thenReturn(Optional.empty());
        when(bikenestRepository.findById(1)).thenReturn(Optional.empty());

        Bikenest bikenestOne = new Bikenest("2SpotFree", "49.34,49.34", 2, false);
        bikenestOne.setId(2);
        Set<Bikespot> bikespotSetOne = new HashSet<>();
        bikespotSetOne.add(new Bikespot(bikenestOne, 1, null, false, false));
        bikespotSetOne.add(new Bikespot(bikenestOne, 2, null, false, true));
        bikenestOne.setBikespots(bikespotSetOne);

        Bikenest bikenestTwo = new Bikenest("1SpotFreeInvalid", "49.34,49.34", 2, false);
        bikenestTwo.setId(3);
        Set<Bikespot> bikespotSetTwo = new HashSet<>();
        bikespotSetTwo.add(new Bikespot(bikenestTwo, 1, 1, true, false));
        bikespotSetTwo.add(new Bikespot(bikenestTwo, 2, null, false, true));
        bikenestTwo.setBikespots(bikespotSetTwo);

        Bikenest bikenestThree = new Bikenest("1SpotFreeCorrect", "49.34,49.34", 2, false);
        bikenestThree.setId(4);
        bikenestThree.setCurrentSpots(1);
        bikenestThree.setBikespots(bikespotSetTwo);

        when(bikenestRepository.findByName("1SpotFreeInvalid")).thenReturn(Optional.of(bikenestOne));
        when(bikenestRepository.findById(2)).thenReturn(Optional.of(bikenestOne));
        when(bikenestRepository.findByName("2SpotFree")).thenReturn(Optional.of(bikenestTwo));
        when(bikenestRepository.findById(3)).thenReturn(Optional.of(bikenestTwo));
        when(bikenestRepository.findByName("1SpotFreeCorrect")).thenReturn(Optional.of(bikenestThree));
        when(bikenestRepository.findById(4)).thenReturn(Optional.of(bikenestThree));
    }

    @Test
    void addFreshBikenest() throws BusinessLogicException {
        //Add valid Bikenest
        AddBikenestRequest addBikenestRequest = new AddBikenestRequest(
                "NotExistant", "49.34,40.32", 10, true);

        Bikenest returned = bikenestService.addBikenest(addBikenestRequest);
        Assert.assertEquals(returned.getName(), "NotExistant");
        Assert.assertEquals(returned.getCurrentSpots().intValue(), 10);
        Assert.assertEquals(returned.getMaximumSpots().intValue(), 10);
        Assert.assertEquals(returned.getGpsCoordinates(), "49.34,40.32");
        Assert.assertEquals(returned.getBikespots().size(), 10);

        //Add invalid Bikenest (gps coordinates invalid)
        addBikenestRequest = new AddBikenestRequest();
        addBikenestRequest.setName("Bikenest");
        addBikenestRequest.setChargingAvailable(true);
        addBikenestRequest.setGpsCoordinates("awd,40.3234");
        addBikenestRequest.setMaximumSpots(10);

        AddBikenestRequest finalAddBikenestRequest = addBikenestRequest;
        Assertions.assertThatThrownBy(() -> bikenestService.addBikenest(finalAddBikenestRequest))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void addExistingBikenest(){
        Bikenest bikenest = new Bikenest();
        bikenest.setName("Bikenest");
        when(bikenestRepository.findByName("Bikenest")).thenReturn(Optional.of(bikenest));

        AddBikenestRequest addBikenestRequest = new AddBikenestRequest("Bikenest", "49.34,58.23", 10, false);
        Assertions.assertThatThrownBy(() -> bikenestService.addBikenest(addBikenestRequest))
                .isInstanceOf(BusinessLogicException.class);
    }

    @Test
    void getFreeSpots(){
        Assert.assertEquals(bikenestService.getFreeSpots(2).get().intValue(),2);
        Assert.assertTrue(bikenestService.getFreeSpots(3).isEmpty());
        Assert.assertEquals(bikenestService.getFreeSpots(4).get().intValue(),1);
    }
}
