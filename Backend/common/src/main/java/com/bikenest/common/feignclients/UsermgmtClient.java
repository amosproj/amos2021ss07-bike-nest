package com.bikenest.common.feignclients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@FeignClient(url="${client.usermgmt.url}", name="UsermgmtClient")
public interface UsermgmtClient {
    @RequestMapping(method = RequestMethod.POST, value = "/api/service-usermgmt/validatejwt",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            headers = {"Authorization=SERVICE"})
    @ResponseBody
    boolean ValidateJwt(@RequestBody String JWT);
}
