## Schemas

Reservation:
- Id
- UserId
- BikenestId
- StartDateTime
- ActualStartDateTime
- EndDateTime
- ActualEndDateTime

## Endpoints

- /booking/add
    - Authenticated, Provide a valid JWT
    - Adds a new Reservation for the User
    - Provide:
        - userId (This is implicitly provided by the JWT)
        - bikenestId
        - startDateTime
        - endDateTime
    - The DateTimes have to be formatted like
        - yyyy-MM-dd'T'HH:mm:ss.SSSX
        - 2012-10-01T09:45:00.000+02:00 (Last part gives the offset from UTC, in UTC+0 this time would be 2012-10-01T07:45:00.000Z)
    - Example Request Body:
        - {
          "bikenestId":1,
          "startDateTime":"2012-10-01T09:45:00.000+02:00",
          "endDateTime":"2012-10-01T10:45:00.000+02:00"
          }
- /booking/all
    - Currently returns all Bookings stored in the DB
    - Later will only return the Bookings that are viewable (For normal Users only the owned bookings and for Admins all bookings)
