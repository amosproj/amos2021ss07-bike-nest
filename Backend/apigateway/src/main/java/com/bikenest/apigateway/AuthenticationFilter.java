package com.bikenest.apigateway;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Key;
import java.text.ParseException;

@RefreshScope
@Component
public class AuthenticationFilter implements GatewayFilter {

    private Key SECRET_KEY = Keys.hmacShaKeyFor("NdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3".getBytes());

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();

        //Check if the route is secured?

        //Check if the JWT is valid, if not then strip it
        if(!this.isAuthMissing(request)) {
            final String authToken = this.getAuthHeader(request);
            //If the token is not valid, then strip it away
            if(!Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().isSigned(authToken)) {
                request.getHeaders().remove(HttpHeaders.AUTHORIZATION);
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
