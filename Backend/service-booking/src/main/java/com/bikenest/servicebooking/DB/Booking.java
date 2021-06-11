package com.bikenest.servicebooking.DB;

import com.bikenest.common.helper.DateTimeHelper;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer bikenestId;
    private Integer bikespotNumber; //The number of the bikespot that will be shown to the user. NOT THE ID OF A BIKESPOT!
    private Integer reservationMinutes;
    private boolean paid;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveredBike;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date tookBike;

    public Booking(){
    }

    public Booking(Integer userId, Integer bikenestId, Integer bikespotNumber, Integer reservationMinutes,
                   boolean paid){
        this.userId = userId;
        this.bikenestId = bikenestId;
        this.bikespotNumber = bikespotNumber;
        this.reservationMinutes = reservationMinutes;
        this.paid = paid;
        this.deliveredBike = null;
        this.tookBike = null;
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

    public Integer getBikespotNumber() {
        return bikespotNumber;
    }

    public void setBikespotNumber(Integer bikespotNumber) {
        this.bikespotNumber = bikespotNumber;
    }

    public Integer getReservationMinutes() {
        return reservationMinutes;
    }

    public void setReservationMinutes(Integer reservationMinutes) {
        this.reservationMinutes = reservationMinutes;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public LocalDateTime getDeliveredBike() {
        return DateTimeHelper.dateToLocalDateTime(this.deliveredBike);
    }

    public void setDeliveredBike(LocalDateTime deliveredBike) {
        this.deliveredBike = DateTimeHelper.localDateTimeToDate(deliveredBike);
    }

    public LocalDateTime getTookBike() {
        return DateTimeHelper.dateToLocalDateTime(this.tookBike);
    }

    public void setTookBike(LocalDateTime tookBike) {
        this.tookBike = DateTimeHelper.localDateTimeToDate(tookBike);
    }
}
