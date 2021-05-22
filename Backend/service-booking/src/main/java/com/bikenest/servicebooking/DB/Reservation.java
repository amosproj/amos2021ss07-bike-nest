package com.bikenest.servicebooking.DB;

import com.bikenest.common.interfaces.booking.CreateReservationRequest;

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
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDateTime;   //For what time was the Reservation planned
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date actualStartDateTime;   //When was the Bike actually stored inside the Bikenest?
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date endDateTime;     //For what time was it planned that the Reservation ends
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date actualEndDateTime;   //When was the Bike actually taken from the Bikenest?

    public static Reservation FromNewReservation(Integer userId, CreateReservationRequest newReservationPOJO){
        Reservation result = new Reservation();
        result.setActualEndDateTime(null);
        result.setActualStartDateTime(null);
        result.setStartDateTime(newReservationPOJO.getStartDateTime());
        result.setEndDateTime(newReservationPOJO.getEndDateTime());
        result.setBikenestId(newReservationPOJO.getBikenestId());
        result.setUserId(userId);
        return result;
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

    public LocalDateTime getStartDateTime() {
        return DateToLocalDateTime(startDateTime);
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = LocalDateTimeToDate(startDateTime);
    }

    public LocalDateTime getActualStartDateTime() {
        return DateToLocalDateTime(actualStartDateTime);
    }

    public void setActualStartDateTime(LocalDateTime actualStartDateTime) {
        this.actualStartDateTime = LocalDateTimeToDate(actualStartDateTime);
    }

    public LocalDateTime getEndDateTime() {
        return DateToLocalDateTime(endDateTime);
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = LocalDateTimeToDate(endDateTime);
    }

    public LocalDateTime getActualEndDateTime() {
        return DateToLocalDateTime(actualEndDateTime);
    }

    public void setActualEndDateTime(LocalDateTime actualEndDateTime) {
        this.actualEndDateTime = LocalDateTimeToDate(actualEndDateTime);
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
}
