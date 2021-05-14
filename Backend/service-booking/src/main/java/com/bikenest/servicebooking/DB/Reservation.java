package com.bikenest.servicebooking.DB;

import javax.persistence.*;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer Id;
    private Integer UserId;
    private Integer BikenestId;
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date StartDateTime;   //For what time was the Reservation planned
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date ActualStartDateTime;   //When was the Bike actually stored inside the Bikenest?
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date EndDateTime;     //For what time was it planned that the Reservation ends
    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date ActualEndDateTime;   //When was the Bike actually taken from the Bikenest?
}
