# Bikenest Project (AMOS SS 2021)
![Project License](https://img.shields.io/github/license/amosproj/amos-ss2021-bike-nest?style=for-the-badge)
<p align="center">
  <img src="https://github.com/amosproj/amos-ss2021-bike-nest/blob/main/Deliverables/2021-04-21_Logo_black.png">
</p>

Welcome to the Bikenest Repository. This project is working on a bicycle parking app. Imagine a locked cage for bicycles. Users can book places for their own bikes in it. Account creation, reservations, payment and locking and unlocking of the cage + their bike spaces inside should be possible via the app. The goal is a working Proof-of-Concept from Frontend to Backend, including the real (un)lock processes of existing locks.

## AMOS Project
The project is created as a work as part of a student project, carried out by [Prof. Riehle](https://oss.cs.fau.de/person/riehle-dirk/) at the [Friedrich-Alexander University of Erlangen-Nuremberg](https://www.fau.de).

## How to setup
1. Download a release or the current project repository. 
2. To run the setup different dependencies have to be installed: 
    1. **Backend**: [Docker](https://www.docker.com), [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
    2. **Frontend**: [(React) Expo](http://expo.io/)

Further Backend documentation can be found [here](https://github.com/amosproj/amos-ss2021-bike-nest/blob/main/Backend/README.md).

## How to run the project after initial setup.
1. **Backend**: Navigate into the `Backend` directory. Run the `run-release.bat` (or rename it to run-release.sh to run it on Unix-based OS) via the command `run-release.bat` or `sh run-release.sh` for UNIX systems.
2. **Frontend**: Navigate into the `code` directory and start the Expo CLI via `yarn start`.




