package com.bikenest.apigateway.unit;

import com.bikenest.apigateway.AuthenticationFilter;
import com.bikenest.common.feignclients.UsermgmtClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import static org.mockito.Mockito.when;

/**
 * Tests if the JWT Stripping works correctly.
 * For this we need to mock the UsermgmtClient, because it is used to actually validate a JWT
 * (by accessing the Usermgmt Service). Currently there is a Mock Bean created for the UsermgmtClient,
 * that will be autoinjected to the AuthenticationFilter. This Mock Bean returns true for a valid JWT
 * and false for an invalid JWT
  */
@SpringBootTest()
public class GatewayTest {

    @MockBean
    private UsermgmtClient usermgmtClient;
    @Autowired
    private AuthenticationFilter filter;
    @MockBean
    private GatewayFilterChain filterChain;

    private ArgumentCaptor<ServerWebExchange> captor = ArgumentCaptor.forClass(ServerWebExchange.class);

    @BeforeEach
    void setup() {
        when(filterChain.filter(captor.capture())).thenReturn(Mono.empty());
        when(usermgmtClient.ValidateJwt("InvalidJWT")).thenReturn(false);
        when(usermgmtClient.ValidateJwt("ValidJWT")).thenReturn(true);
    }

    @Test
    void checkValidJWT() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/booking/all")
                .header("Authorization", "ValidJWT")
        );

        filter.filter(exchange, filterChain);

        //Get the request of the Captured Value (captured by the mocked filterChain
        ServerHttpRequest actualRequest = captor.getValue().getRequest();

        assert(actualRequest.getHeaders().getFirst("Authorization").equals("ValidJWT"));
    }


    @Test
    void checkInvalidJWT() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/booking/all")
                        .header("Authorization", "InvalidJWT")
        );

        filter.filter(exchange, filterChain);

        //Get the request of the Captured Value (captured by the mocked filterChain
        ServerHttpRequest actualRequest = captor.getValue().getRequest();

        assert(!actualRequest.getHeaders().containsKey("Authorization"));
    }

    /**
     * Checks if the Gateway strips away an authorization header with value service
     */
    @Test
    void checkServiceStripped(){
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/booking/all")
                        .header("Authorization", "SERVICE")
        );

        filter.filter(exchange, filterChain);

        //Get the request of the Captured Value (captured by the mocked filterChain
        ServerHttpRequest actualRequest = captor.getValue().getRequest();

        assert(!actualRequest.getHeaders().containsKey("Authorization"));
    }
}
