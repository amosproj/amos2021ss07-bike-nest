package com.bikenest.apigateway;

import com.bikenest.common.feignclients.UsermgmtClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ComponentScan({"com.bikenest.common", "com.bikenest.apigateway"})
@EnableFeignClients(basePackageClasses = UsermgmtClient.class)
public class ApigatewayApplication {

    @Autowired
    AuthenticationFilter authenticationFilter;

    public static void main(String[] args) {
        SpringApplication.run(ApigatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("bikenest", r -> r.path("/bikenest/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://bikenest:9001"))
                .route("booking", r -> r.path("/booking/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://booking:9002"))
                .route("usermanagement", r -> r.path("/usermanagement/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri("http://usermgmt:9003"))
                .build();
    }
}
