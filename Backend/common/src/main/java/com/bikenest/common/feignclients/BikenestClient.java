package com.bikenest.common.feignclients;

import com.bikenest.common.interfaces.bikenest.FreeSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotRequest;
import com.bikenest.common.interfaces.bikenest.ReserveSpotResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@FeignClient(url="http://bikenest:9001/", name="BikenestClient")
public interface BikenestClient {

    @RequestMapping(method = RequestMethod.POST, value = "/bikenest/service/bikenestexists",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            headers = {"Authorization=SERVICE"})
    @ResponseBody
    boolean existsBikenest(@RequestBody Integer bikenestId);

    @RequestMapping(method = RequestMethod.POST, value = "/bikenest/service/reservespot",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            headers = {"Authorization=SERVICE"})
    @ResponseBody
    ReserveSpotResponse reserveSpot(@RequestBody ReserveSpotRequest request);

    @RequestMapping(method = RequestMethod.POST, value = "/bikenest/service/freespot",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            headers = {"Authorization=SERVICE"})
    @ResponseBody
    boolean freeSpot(@RequestBody FreeSpotRequest request);

    @RequestMapping(method = RequestMethod.POST, value = "/bikenest/service/hasfreespots",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            headers = {"Authorization=SERVICE"})
    @ResponseBody
    boolean hasFreeSpots(@RequestBody Integer bikenestId);
}
