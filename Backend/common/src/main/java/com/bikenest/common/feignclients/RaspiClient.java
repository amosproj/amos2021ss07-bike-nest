package com.bikenest.common.feignclients;

import com.bikenest.common.interfaces.bikenest.FreeSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotResponse;
import com.bikenest.common.interfaces.booking.GetBikespotRequest;
import com.bikenest.common.interfaces.booking.GetBikespotResponse;
import com.bikenest.common.interfaces.booking.QRCodeRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@FeignClient(url="${raspiserver.url}", name="RaspiClient")
public interface RaspiClient {

    @RequestMapping(method = RequestMethod.GET, path = "/",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String helloWorld();

    @RequestMapping(method = RequestMethod.GET, path = "/toggle_station_lock",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String toggleStationLock();


    @RequestMapping(method = RequestMethod.GET, path = "/open_gate?gate={gate}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    Integer openGate(@PathVariable String gate);

    @RequestMapping(method = RequestMethod.GET, path = "/close_gate?gate={gate}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    Integer closeGate(@PathVariable String gate);

    @RequestMapping(method = RequestMethod.GET, path = "/set_spot_reserved?spot_number={spotNumber}&rgb_value={rgb}&blink_state={blinkState}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String setSpotReserved(@PathVariable Integer spotNumber, @PathVariable String rgb, @PathVariable boolean blinkState);

    @RequestMapping(method = RequestMethod.GET, path = "/get_status_station_lock",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String getStatusStationLock();

    @RequestMapping(method = RequestMethod.GET, path = "/get_status_gate_position?gate={gate}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String getStatusGatePosition(@PathVariable String gate);

    @RequestMapping(method = RequestMethod.GET, path = "/get_status_bikespot?spot_number={spotNumber}",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String getStatusBikespot(@PathVariable Integer spotNumber);

    @RequestMapping(method = RequestMethod.GET, path = "/get_error_status",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    String getErrorStatus();
}
