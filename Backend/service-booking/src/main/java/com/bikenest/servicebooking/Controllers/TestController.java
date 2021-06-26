package com.bikenest.servicebooking.Controllers;

import com.bikenest.common.feignclients.RaspiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/test")
public class TestController {
    @Autowired
    RaspiClient raspiClient;

    @GetMapping(path = "/")
    public ResponseEntity<String> helloWorld(){
        return ResponseEntity.ok(raspiClient.helloWorld());
    }


    @GetMapping(path="/open_gate")
    public ResponseEntity<String> openGate() {

        return ResponseEntity.ok(raspiClient.openGate("left"));
    }

    @GetMapping(path="/try_all")
    public ResponseEntity<String> tryAll(){
        String result = "";
        result += raspiClient.setSpotReserved(1,"rgb", false) + "\n";
        result += raspiClient.closeGate("left") + "\n";
        result += raspiClient.getStatusBikespot(1) + "\n";
        result += raspiClient.getStatusGatePosition("left") + "\n";
        result += raspiClient.getStatusStationLock() + "\n";
        result += raspiClient.openGate("right") + "\n";
        result += raspiClient.toggleStationLock() + "\n";
        result += raspiClient.getErrorStatus() + "\n";
        return ResponseEntity.ok(result);
    }
}
