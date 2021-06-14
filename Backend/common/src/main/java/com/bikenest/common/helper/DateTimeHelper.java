package com.bikenest.common.helper;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class DateTimeHelper {

    public static LocalDateTime dateToLocalDateTime(Date date){
        if(date == null)
            return null;
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    public static Date localDateTimeToDate(LocalDateTime ldt){
        if(ldt == null)
            return null;
        ZonedDateTime zdt = ldt.atZone(ZoneId.systemDefault());
        return Date.from(zdt.toInstant());
    }

    public static LocalDateTime getCurrentBerlinTime(){
        return LocalDateTime.now(ZoneId.of("Europe/Berlin"));
    }
}
