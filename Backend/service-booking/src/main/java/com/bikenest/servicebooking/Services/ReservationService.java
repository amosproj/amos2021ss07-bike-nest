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

    public Reservation createReservation(Integer userId, CreateReservationRequest newReservation) throws BusinessLogicException {
        if (!bikenestClient.existsBikenest(newReservation.getBikenestId())){
            throw new BusinessLogicException("Das gewählte Bikenest existiert nicht!");
        }
        if (!bikenestClient.hasFreeSpots(newReservation.getBikenestId())){
            throw new BusinessLogicException("Im gewählten Bikenest ist kein Platz mehr frei!");
        }

        ReserveSpotResponse response = bikenestClient.reserveSpot(new ReserveSpotRequest(newReservation.getBikenestId(), userId));
        if(!response.isSuccess()){
            throw new BusinessLogicException("Es konnte kein Platz reserviert werden!");
        }


        Reservation reservation = new Reservation(userId, response.getBikenestId(), response.getSpotId(),
                newReservation.getReservationMinutes(), false, LocalDateTime.now(ZoneId.of("Europe/Berlin")),
                LocalDateTime.now(ZoneId.of("Europe/Berlin")).plusMinutes(RESERVATION_MINUTES));


        return reservationRepository.save(reservation);
    }

    public Reservation startReservation(Integer id) throws BusinessLogicException {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        // Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            throw new BusinessLogicException("Ihre Reservierung existiert nicht!");
        }

        Reservation actualReservation = reservation.get();

        //Error if the ActualStart has already been set
        if(actualReservation.getActualStart() != null){
            throw new BusinessLogicException("Sie haben ihr Fahrrad schon im Bikenest abgestellt!");
        }

        actualReservation.setActualStart(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        return reservationRepository.save(reservation.get());
    }

    public Reservation endReservation(Integer id) throws BusinessLogicException {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        // Error if the Reservation with given id does not exist
        if(!reservation.isPresent()){
            throw new BusinessLogicException("Ihre Reservierung existiert nicht!");
        }

        Reservation actualReservation = reservation.get();

        //Error if the ActualStartDateTime has already been set
        if(actualReservation.getActualEnd() != null){
            throw new BusinessLogicException("Sie haben ihr Fahrrad schon aus dem Bikenest abgeholt!");
        }

        if(!bikenestClient.freeSpot(new FreeSpotRequest(actualReservation.getBikenestId(), actualReservation.getBikespotId(),
                actualReservation.getUserId()))){
            throw new BusinessLogicException("Der Platz konnte nicht im Server freigegeben werden!");
        }
        actualReservation.setActualEnd(LocalDateTime.now(ZoneId.of("Europe/Berlin")));
        return reservationRepository.save(reservation.get());
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

    /**
     * This method only returns a Reservation, if the given user owns that Reservation. In all other cases
     * a BusinessLogicException is thrown.
     * @param reservationId
     * @param userId
     * @return Reservation of the given user with the given reservationId.
     */
    public Reservation getReservationVerified(Integer reservationId, Integer userId) throws BusinessLogicException {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if(reservation.isEmpty()){
            throw new BusinessLogicException("Diese Reservierung existiert nicht!");
        }
        if(!reservation.get().getUserId().equals(userId)){
            throw new BusinessLogicException("Diese Reservierung gehört zu einem anderen Benutzer!");
        }
        return reservation.get();
    }
}
