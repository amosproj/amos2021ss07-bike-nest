package com.bikenest.servicebooking.Services;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.feignclients.BikenestClient;
import com.bikenest.common.helper.DateTimeHelper;
import com.bikenest.common.interfaces.bikenest.FreeSpotRequest;
import com.bikenest.common.interfaces.booking.QRCodeRequest;
import com.bikenest.servicebooking.DB.Booking;
import com.bikenest.servicebooking.DB.BookingRepository;
import com.bikenest.servicebooking.DB.Reservation;
import com.bikenest.servicebooking.DB.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    BikenestClient bikenestClient;

    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }

    public List<Booking> getAllByUserId(int userId){
        return bookingRepository.findAllByUserId(userId);
    }

    public Booking createBooking(int userId, int reservationId, String qrCode) throws BusinessLogicException {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        if(optionalReservation.isEmpty()){
            throw new BusinessLogicException("Diese Reservierung existiert nicht!");
        }
        if(!optionalReservation.get().getUserId().equals(userId)){
            throw new BusinessLogicException("Diese Reservierung gehört zu einem anderen Benutzer!");
        }

        Reservation reservation = optionalReservation.get();

        //Check if the reservation is for the Bikenest with the given QrCode
        if(!checkBikenestId(reservation.getBikenestId(), qrCode)){
            throw new BusinessLogicException("Sie besitzen keine Reservierung für dieses Bikenest!");
        }

        if(reservation.getReservationEnd().compareTo(DateTimeHelper.getCurrentBerlinTime()) < 0){
            throw new BusinessLogicException("Diese Reservierung ist nicht mehr gültig.");
        }

        if(reservation.getReservationStart().compareTo(DateTimeHelper.getCurrentBerlinTime()) > 0){
            throw new BusinessLogicException("Diese Reservierung ist noch nicht gültig.");
        }

        if(reservation.isCancelled()){
            throw new BusinessLogicException("Diese Reservierung wurde bereits storniert.");
        }

        reservation.setUsed(true);
        reservationRepository.save(reservation);

        Booking newBooking = new Booking(userId, reservation.getBikenestId(), reservation.getBikespotNumber(),
                reservation.getReservationMinutes(),false);
        return bookingRepository.save(newBooking);
    }

    public Booking deliveredBike(int userId, int bookingId) throws BusinessLogicException {
        Booking booking = getVerifiedBooking(userId, bookingId);

        if(booking.getTookBike() != null){
            throw new BusinessLogicException("Diese Buchung ist schon abgeschlossen!");
        }

        if(booking.getDeliveredBike() != null){
            throw new BusinessLogicException("Das Fahrrad wurde für diese Buchung schon abgestellt.");
        }

        booking.setDeliveredBike(DateTimeHelper.getCurrentBerlinTime());
        return bookingRepository.save(booking);
    }

    public Booking tookBike(int userId, int bookingId) throws BusinessLogicException {
        Booking booking = getVerifiedBooking(userId, bookingId);

        if(booking.getTookBike() != null){
            throw new BusinessLogicException("Diese Buchung ist schon abgeschlossen!");
        }

        booking.setTookBike(DateTimeHelper.getCurrentBerlinTime());
        return bookingRepository.save(booking);
    }

    public Booking getVerifiedBooking(int userId, int bookingId) throws BusinessLogicException {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if(booking.isEmpty()){
            throw new BusinessLogicException("Diese Buchung existiert nicht!");
        }
        if(booking.get().getUserId() != userId){
            throw new BusinessLogicException("Diese Buchung gehört zu einem anderen User!");
        }
        return booking.get();
    }

    public boolean freeReservedSpot(int bikenestId, int bikespotNumber, int userId){
        return bikenestClient.freeSpot(new FreeSpotRequest(bikenestId, bikespotNumber, userId));
    }

    public boolean checkBikenestId(int bikenestId, String qrCode){
        Integer id = null;
        try{
            id = bikenestClient.getBikenestIdByQr(new QRCodeRequest(qrCode));
        }catch (Exception ex){}
        if(id == null || !id.equals(bikenestId)){
            return false;
        }
        return true;
    }
}
