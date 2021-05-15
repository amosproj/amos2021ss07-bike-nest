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
        - yyyy-MM-dd'T'HH:mm:ss
        - 2012-10-01T09:45:00
    - Example Request Body:
        - {
          "bikenestId":1,
          "startDateTime":"2012-10-01T09:45:00",
          "endDateTime":"2012-10-01T10:45:00"
          }
    - Returns the JSON of the new Reservation Object created
    
- /booking/all
    - Currently returns all Bookings stored in the DB
    - Later will only return the Bookings that are viewable (For normal Users only the owned bookings and for Admins all bookings)

- /booking/start/{reservationId}
    - Starts the reservation with Id = {reservationId}. So ActualStartDateTime will be set.
    - Checks if the user owns the reservation and if not, an error is returned.
    - In case of success: returns the edited Reservation Object as JSON (with ActualStartDateTime filled)

- /booking/end/{reservationId}
    - See /booking/end ... Only difference is that here the ActualEndDateTime is set.
