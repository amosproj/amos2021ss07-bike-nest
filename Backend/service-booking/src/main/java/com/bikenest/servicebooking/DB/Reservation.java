package com.bikenest.servicebooking.DB;

import com.bikenest.common.interfaces.booking.AddReservationInterface;

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
    private Integer Id;
    private Integer UserId;
    private Integer BikenestId;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date StartDateTime;   //For what time was the Reservation planned
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date ActualStartDateTime;   //When was the Bike actually stored inside the Bikenest?
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date EndDateTime;     //For what time was it planned that the Reservation ends
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date ActualEndDateTime;   //When was the Bike actually taken from the Bikenest?

    public static Reservation FromNewReservation(Integer userId, AddReservationInterface newReservationPOJO){
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
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getUserId() {
        return UserId;
    }

    public void setUserId(Integer userId) {
        UserId = userId;
    }

    public Integer getBikenestId() {
        return BikenestId;
    }

    public void setBikenestId(Integer bikenestId) {
        BikenestId = bikenestId;
    }

    public LocalDateTime getStartDateTime() {
        return DateToLocalDateTime(StartDateTime);
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        StartDateTime = LocalDateTimeToDate(startDateTime);
    }

    public LocalDateTime getActualStartDateTime() {
        return DateToLocalDateTime(ActualStartDateTime);
    }

    public void setActualStartDateTime(LocalDateTime actualStartDateTime) {
        ActualStartDateTime = LocalDateTimeToDate(actualStartDateTime);
    }

    public LocalDateTime getEndDateTime() {
        return DateToLocalDateTime(EndDateTime);
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        EndDateTime = LocalDateTimeToDate(endDateTime);
    }

    public LocalDateTime getActualEndDateTime() {
        return DateToLocalDateTime(ActualEndDateTime);
    }

    public void setActualEndDateTime(LocalDateTime actualEndDateTime) {
        ActualEndDateTime = LocalDateTimeToDate(actualEndDateTime);
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
