package com.bikenest.servicebooking.Services;

import com.bikenest.servicebooking.Common.RestResponsePOJO;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import com.bikenest.servicebooking.Reservation.NewReservationPOJO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    public Iterable<Reservation> GetAllReservations(){
        return reservationRepository.findAll();
    }

    public Optional<Reservation> CreateReservation(Integer userId, NewReservationPOJO newReservationPOJO) throws Exception {
        if(newReservationPOJO.getBikenestId() == null || newReservationPOJO.getStartDateTime() == null ||
                newReservationPOJO.getEndDateTime() == null)
            throw new Exception("Invalid request.");


        Reservation reservation = new Reservation();
        reservation.setBikenestId(newReservationPOJO.getBikenestId());
        reservation.setStartDateTime(newReservationPOJO.getStartDateTime());
        reservation.setEndDateTime(newReservationPOJO.getEndDateTime());
        reservation.setUserId(userId);
        reservation.setActualStartDateTime(null);
        reservation.setActualEndDateTime(null);

        return Optional.of(reservationRepository.save(reservation));
    }

    public Optional<Reservation> StartReservation(Integer id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        //Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            return Optional.empty();
        }

        Reservation actualReservation = reservation.get();

        //Error if the ActualStartDateTime has already been set
        if(actualReservation.getActualStartDateTime() != null){
            return Optional.empty();
        }
        reservation.get().setActualStartDateTime(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return Optional.of(reservation.get());
    }

    public Optional<Reservation> EndReservation(Integer id){
        Optional<Reservation> reservation = reservationRepository.findById(id);
        //Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            return Optional.empty();
        }

        Reservation actualReservation = reservation.get();

        //Error if the ActualStartDateTime has already been set
        if(actualReservation.getActualEndDateTime() != null){
            return Optional.empty();
        }
        reservation.get().setActualEndDateTime(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        reservationRepository.save(reservation.get());
        return Optional.of(reservation.get());
    }
}
