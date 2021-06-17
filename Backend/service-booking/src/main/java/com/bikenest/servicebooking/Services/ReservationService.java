package com.bikenest.servicebooking.Services;

import com.bikenest.common.exceptions.BusinessLogicException;
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
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private Integer RESERVATION_MINUTES = 30;

    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    BikenestClient bikenestClient;

    public List<Reservation> getAllReservations(){
        return reservationRepository.findAll();
    }

    public List<Reservation> getAllReservationByUserId(Integer userId){
        return reservationRepository.findAllByUserId(userId);
    }

    public Reservation createReservation(Integer userId, CreateReservationRequest reservationRequest) throws BusinessLogicException {
        if (!bikenestClient.existsBikenest(reservationRequest.getBikenestId())){
            throw new BusinessLogicException("Das gewählte Bikenest existiert nicht!");
        }
        if (!bikenestClient.hasFreeSpots(reservationRequest.getBikenestId())){
            throw new BusinessLogicException("Im gewählten Bikenest ist kein Platz mehr frei!");
        }

        ReserveSpotResponse response = bikenestClient.reserveSpot(new ReserveSpotRequest(reservationRequest.getBikenestId(), userId));
        if(!response.isSuccess()){
            throw new BusinessLogicException("Es konnte kein Platz reserviert werden!");
        }


        Reservation reservation = new Reservation(userId, response.getBikenestId(), response.getSpotNumber(),
                reservationRequest.getReservationMinutes(), false, LocalDateTime.now(ZoneId.of("Europe/Berlin")),
                LocalDateTime.now(ZoneId.of("Europe/Berlin")).plusMinutes(RESERVATION_MINUTES));


        return reservationRepository.save(reservation);
    }

    public Reservation cancelReservation(int reservationId, int userId) throws BusinessLogicException {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        // Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            throw new BusinessLogicException("Ihre Reservierung existiert nicht!");
        }
        Reservation actualReservation = reservation.get();
        if(actualReservation.getUserId() != userId){
            throw new BusinessLogicException("Diese Reservierung gehört zu einem anderen Benutzer!");
        }
        if(actualReservation.isCancelled()){
            throw new BusinessLogicException("Ihre Reservierung ist bereits storniert worden!");
        }
        actualReservation.setCancelled(true);
        return reservationRepository.save(actualReservation);
    }
}
