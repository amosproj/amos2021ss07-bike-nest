package com.bikenest.servicebooking.Services;

import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.interfaces.bikenest.FreeSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotResponse;
import com.bikenest.common.interfaces.booking.CreateReservationRequest;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class ReservationService {

    private Integer RESERVATION_MINUTES = 30;

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    BikenestClient bikenestClient;

    public Iterable<Reservation> getAllReservations(){
        return reservationRepository.findAll();
    }

    public Iterable<Reservation> getAllReservationByUserId(Integer userId){
        return reservationRepository.findAllByUserId(userId);
    }

    public Optional<Reservation> createReservation(Integer userId, CreateReservationRequest newReservation) {
        if (!bikenestClient.existsBikenest(newReservation.getBikenestId())){
            return Optional.empty();
        }
        if (!bikenestClient.hasFreeSpots(newReservation.getBikenestId())){
            return Optional.empty();
        }

        ReserveSpotResponse response = bikenestClient.reserveSpot(new ReserveSpotRequest(newReservation.getBikenestId(), userId));
        if(!response.isSuccess()){
            return Optional.empty();
        }


        Reservation reservation = new Reservation(userId, response.getBikenestId(), response.getSpotId(),
                newReservation.getReservationMinutes(), false, LocalDateTime.now(ZoneId.of("Europe/Berlin")),
                LocalDateTime.now(ZoneId.of("Europe/Berlin")).plusMinutes(RESERVATION_MINUTES));


        return Optional.of(reservationRepository.save(reservation));
    }

    public Optional<Reservation> startReservation(Integer id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        // Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            return Optional.empty();
        }

        Reservation actualReservation = reservation.get();

        //Error if the ActualStart has already been set
        if(actualReservation.getActualStart() != null){
            return Optional.empty();
        }

        actualReservation.setActualStart(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return Optional.of(reservation.get());
    }

    public Optional<Reservation> endReservation(Integer id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        // Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            return Optional.empty();
        }

        Reservation actualReservation = reservation.get();

        //Error if the ActualStartDateTime has already been set
        if(actualReservation.getActualEnd() != null){
            return Optional.empty();
        }

        if(!bikenestClient.freeSpot(new FreeSpotRequest(actualReservation.getBikenestId(), actualReservation.getBikespotId(),
                actualReservation.getUserId()))){
            return Optional.empty();
        }
        actualReservation.setActualEnd(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return Optional.of(reservation.get());
    }

    public Optional<Reservation> cancelReservation(Integer id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        // Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            return Optional.empty();
        }

        Reservation actualReservation = reservation.get();
        if(actualReservation.isCancelled()){
            return Optional.empty();
        }
        actualReservation.setCancelled(true);
        reservationRepository.save(actualReservation);
        return Optional.of(actualReservation);
    }

    public Optional<Reservation> isReservationOwner(Integer reservationId, Integer userId){
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (reservation.isPresent() && reservation.get().getUserId() == userId)
            return reservation;
        return Optional.empty();
    }
}
