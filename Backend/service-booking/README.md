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
        - UserId (This is implicitly provided by the JWT)
        - BikenestId
        - StartDateTime
        - EndDateTime

- /booking/all
    - Currently returns all Bookings stored in the DB
    - Later will only return the Bookings that are viewable (For normal Users only the owned bookings and for Admins all bookings)
