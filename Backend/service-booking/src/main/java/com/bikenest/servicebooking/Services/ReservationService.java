package com.bikenest.servicebooking.Services;

import com.bikenest.common.feignclients.BikenestClient;
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
        if(!bikenestClient.reserveSpot(newReservation.getBikenestId())){
            return Optional.empty();
        }

        Reservation reservation = new Reservation(userId, newReservation.getBikenestId(),
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

        reservation.get().setActualStart(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
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

        if(!bikenestClient.freeSpot(actualReservation.getBikenestId())){
            return Optional.empty();
        }
        reservation.get().setActualEnd(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return Optional.of(reservation.get());
    }

    public boolean isReservationOwner(Integer reservationId, Integer userId){
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);

        return reservation.isPresent() && reservation.get().getUserId() == userId;
    }
}
