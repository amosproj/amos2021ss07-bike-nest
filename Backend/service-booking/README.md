## Schemas

Reservation:
- Id
- UserId
- BikespotId  
- BikenestId
- ReservationMinutes  
- ReservationStart
- ReservationEnd
- ActualStart
- ActualEnd
- Paid
- Cancelled

## Endpoints

- /booking/add
    - Create a new Reservation, you have to provide the BikenestId and the number of minutes that 
      the user wants to book this spot for. The reservation is valid for the next 30 minutes. Afterwards it will count as cancelled.
    - Authenticated, you have to provide a valid JWT
    - Example Request Body:
        - {
          "bikenestId": 1,
          "reservationMinutes": 30
          }
    - Returns a general response with a success, error and payload field. Example:
        - {
          "success": true,
          "error": null,
          "payload": {
          "id": 2,
          "userId": 1,
          "bikenestId": 15,
          "bikespotId": 4,
          "reservationMinutes": 30,
          "paid": false,
          "cancelled": false,
          "reservationStart": "2021-06-01T15:46:58.575",
          "reservationEnd": "2021-06-01T16:16:58.575",
          "actualStart": null,
          "actualEnd": null
          }
          }
    
- /booking/all
    - JWT Authenticated
    - If a user accesses this, only the bookings that belong to that user are returned
    - If an Admin accesses this, all bookings are returned
    - Example response:
        -   [
              {
              "id": 1,
              "userId": 1,
              "bikenestId": 1,
              "bikespotId": 12,
              "reservationMinutes": 30,
              "paid": false,
              "cancelled": false,
              "reservationStart": "2021-06-01T01:20:15.471",
              "reservationEnd": "2021-06-01T01:50:15.473",
              "actualStart": null,
              "actualEnd": null
              }
            ]

## Locking/Unlocking

- Few open points:
    - How will this mechanism work with concurrency? We should probably only allow one person at a time to do anything.
    This means that once /booking/startunlock or /booking/endunlock is called, further access on the locking endpoints should be
      restricted for other users.
    - The workflow with having the user close the Bikenest by pressing a button is error prone and very uncomfortable.
    In a real world environment, the best would be to have more functionality inside the Bikenest. For security reasons the Bikenest
      will need a few sensors anyways (so that the cage won't close if anything is blocking the way). There should be some sort of
      sensor that can detect if a user left the Bikenest. If he left the Bikenest and the Bike is at the correct spot, the door 
      closes itself and a message is sent to the Backend. If he leaves and the Bike is at an incorrect sport, there should be an alarm
      sound. Or if he want to take his bike home, opens the cage but for some reason leaves without his bike, there should also be
      an alarm. You get the gist. These problems are not solvable with mechanisms in the frontend and backend, so the Bikenest 
      will have to provide additional functionality later on! For a prototype our use case will work.

The locking/unlocking process could be very complicated. For now we focus on the easy cases and ignore all the edge cases
(for example where the user does not follow the process correctly).
The Frontend will first send a request to /booking/startunlock which indicates, that the user is in front of the Bikenest and wants
to store his bike. We open up the cage and return success or an error message.

We could then ask the user to press a button in the frontend, once he placed his bike on the correct spot.
This button sends a request to /booking/startlock which will check, if the user placed his bike on the correct spot (using calls
to the Raspberry Pi), if he did, then the door will be closed. If something is not correct, an error message is returned, that
should give detailed instructions to the user.
The Frontend should also tell the user not to try and close the door, while he is still inside of the cage...

When the user wants to take his Bike from the Bikenest, the frontend will first call /booking/endunlock
which tells the Backend, that the Bikenest should be opened so that the user can get his bike.
Once he is outside of the cage he should press a button in the frontend application that will call /booking/endlock
so that the Bikenest will be closed again. The Backend will check, if the sensor of the assigned bikespot is inactive and if it is
not (the user forgot his bike) an error message is displayed. If everything seems to be ok, the Bikenest is locked again.

- /booking/lock/startunlock
    - JWT Authenticated. Example request body:
        - { "reservationId": 423, "qrCode": "3ft1j7delK%2t" }
        - The QR Code has to be scanned with the Frontend Application and is placed on the Bikenest.
          That way we can be pretty sure, that a user that tries to open the Bikenest is indeed standing in front of it.
          The QR Code can be validated using the Bikenest service.
        - The Bikenest will be opened by performing a call to the Raspberry Pi
    - Internal the actualStart time of the reservation will be set.
    - In case of success: returns the edited Reservation Object as JSON (with actualStart filled)
    
- /booking/lock/startlock
    - JWT Authenticated. Example request body:
        - { "reservationId": 423 }
    - Validates if the Bikenest is currently open and if the user has correctly placed his bike on the correct bikespot.
    - Returns either success or an error message with detailed instructions.

- /booking/lock/endunlock
    - JWT Authenticated. Example request body:
        - { "reservationId": 423, "qrCode": "3ft1j7delK%2t" }
    - User wants to take his bike from the Bikenest. If everything is valid (especially the QR Code), the Bikenest will be opened.
    - Returns the edited Reservation object (with actualEnd filled)
    
- /booking/lock/endlock
    - JWT Authenticated. Example request body:
        - { "reservationId": 423 }
    - User took his bike from the Bikenest and wants to close the cage.
    - Checks if the sensor at the assigned Bikespot is now deactivated. If it is not an error message is returned.
