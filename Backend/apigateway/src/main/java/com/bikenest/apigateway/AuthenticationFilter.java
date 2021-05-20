package com.bikenest.apigateway;

import com.bikenest.common.feignclients.UsermgmtClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;


@RefreshScope
@Component
public class AuthenticationFilter implements GatewayFilter {

    @Autowired
    UsermgmtClient usermgmtClient;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        // Check if the JWT is valid, if not then strip it
        if(!this.isAuthMissing(request)) {
            final String authToken = this.getAuthHeader(request);

            /* Validate the JWT with the use of the UserMgmt Service
             * If Token is not valid, strip the authorization Header away
             * Also if the Authorization Header has the value "SERVICE" we also strip it away,
             * because the services use this header to communicate with on and another (when that header is set
             * the JWTAuthentication will create a AuthToken, that has the SERVICE Role).
             */
            if(authToken.equals("SERVICE") || !usermgmtClient.ValidateJwt(authToken)) {
                ServerHttpRequest newRequest = request.mutate()
                        .headers(httpHeaders -> httpHeaders.remove("Authorization")).build();
                exchange = exchange.mutate().request(newRequest).build();
            }
        }

        return chain.filter(exchange);
    }

    private String getAuthHeader(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty("Authorization").get(0);
    }

    private boolean isAuthMissing(ServerHttpRequest request) {
        return !request.getHeaders().containsKey("Authorization");
    }
}
