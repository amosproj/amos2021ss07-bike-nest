package com.bikenest.servicebooking.DB;

import com.bikenest.common.helper.DateTimeHelper;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer bikenestId;
    private Integer bikespotNumber; //The number of the bikespot that will be shown to the user. NOT THE ID OF A BIKESPOT!
    private Integer reservationMinutes; // For how long is this reservation?
    private boolean used;   //Did the user already deliver his bike?
    private boolean cancelled;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date reservationStart;   // Begin of reservation time frame (set to the time the server got the request)
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date reservationEnd;   // End of reservation time frame

    public Reservation(Integer userId, Integer bikenestId, Integer bikespotNumber, Integer reservationMinutes, boolean paid,
                       LocalDateTime reservationStart, LocalDateTime reservationEnd) {
        this.userId = userId;
        this.bikenestId = bikenestId;
        this.bikespotNumber = bikespotNumber;
        this.reservationMinutes = reservationMinutes;
        setReservationStart(reservationStart);
        setReservationEnd(reservationEnd);
        this.cancelled = false;
    }

    public Reservation(){}


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBikenestId() {
        return bikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        this.bikenestId = bikenestId;
    }

    public Integer getReservationMinutes() {
        return reservationMinutes;
    }

    public void setReservationMinutes(Integer reservationMinutes) {
        this.reservationMinutes = reservationMinutes;
    }

    public LocalDateTime getReservationStart() {
        return DateTimeHelper.dateToLocalDateTime(reservationStart);
    }

    public void setReservationStart(LocalDateTime reservationStart) {
        this.reservationStart = DateTimeHelper.localDateTimeToDate(reservationStart);
    }

    public LocalDateTime getReservationEnd() {
        return DateTimeHelper.dateToLocalDateTime(reservationEnd);
    }

    public void setReservationEnd(LocalDateTime reservationEnd) {
        this.reservationEnd = DateTimeHelper.localDateTimeToDate(reservationEnd);
    }

    public boolean isCancelled() {
        return cancelled;
    }

    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }

    public Integer getBikespotNumber() {
        return bikespotNumber;
    }

    public void setBikespotNumber(Integer bikespotNumber) {
        this.bikespotNumber = bikespotNumber;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }
}
