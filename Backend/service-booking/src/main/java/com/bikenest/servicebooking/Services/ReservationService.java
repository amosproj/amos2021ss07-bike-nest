package com.bikenest.servicebooking.Services;

import com.bikenest.common.interfaces.booking.AddReservationInterface;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Optional<Reservation> CreateReservation(Integer userId, AddReservationInterface newReservation) throws Exception {
        if(newReservation.getBikenestId() == null || newReservation.getStartDateTime() == null ||
                newReservation.getEndDateTime() == null)
            throw new Exception("Invalid request.");


        Reservation reservation = Reservation.FromNewReservation(userId, newReservation);

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
