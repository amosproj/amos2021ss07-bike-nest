package com.bikenest.servicebooking.DB;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer bikenestId;
    private Integer bikespotId;
    private Integer reservationMinutes; // For how long is this reservation?
    private boolean paid; // Is this booking payed?
    private boolean cancelled;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date reservationStart;   // Begin of reservation time frame (set to the time the server got the request)
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date reservationEnd;   // End of reservation time frame
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date actualStart;     // When did the user deliver his bike?
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date actualEnd;   // When did the user take his bike?

    public Reservation(Integer userId, Integer bikenestId, Integer bikespotId, Integer reservationMinutes, boolean paid,
                       LocalDateTime reservationStart, LocalDateTime reservationEnd) {
        this.userId = userId;
        this.bikenestId = bikenestId;
        this.bikespotId = bikespotId;
        this.reservationMinutes = reservationMinutes;
        this.paid = paid;
        setReservationStart(reservationStart);
        setReservationEnd(reservationEnd);
        this.actualStart = null;
        this.actualEnd = null;
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


    private LocalDateTime DateToLocalDateTime(Date date){
        if(date == null)
            return null;
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    private Date LocalDateTimeToDate(LocalDateTime ldt){
        if(ldt == null)
            return null;
        ZonedDateTime zdt = ldt.atZone(ZoneId.systemDefault());
        Instant in = zdt.toInstant();
        return Date.from(zdt.toInstant());
    }

    public Integer getReservationMinutes() {
        return reservationMinutes;
    }

    public void setReservationMinutes(Integer reservationMinutes) {
        this.reservationMinutes = reservationMinutes;
    }

    public LocalDateTime getReservationStart() {
        return DateToLocalDateTime(reservationStart);
    }

    public void setReservationStart(LocalDateTime reservationStart) {
        this.reservationStart = LocalDateTimeToDate(reservationStart);
    }

    public LocalDateTime getReservationEnd() {
        return DateToLocalDateTime(reservationEnd);
    }

    public void setReservationEnd(LocalDateTime reservationEnd) {
        this.reservationEnd = LocalDateTimeToDate(reservationEnd);
    }

    public LocalDateTime getActualStart() {
        return DateToLocalDateTime(actualStart);
    }

    public void setActualStart(LocalDateTime actualStart) {
        this.actualStart = LocalDateTimeToDate(actualStart);
    }

    public LocalDateTime getActualEnd() {
        return DateToLocalDateTime(actualEnd);
    }

    public void setActualEnd(LocalDateTime actualEnd) {
        this.actualEnd = LocalDateTimeToDate(actualEnd);
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public boolean isCancelled() {
        return cancelled;
    }

    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }

    public Integer getBikespotId() {
        return bikespotId;
    }

    public void setBikespotId(Integer bikespotId) {
        this.bikespotId = bikespotId;
    }
}
