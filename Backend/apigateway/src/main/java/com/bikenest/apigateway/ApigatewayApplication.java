package com.bikenest.apigateway;

import com.bikenest.common.feignclients.UsermgmtClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ComponentScan({"com.bikenest.common.feignclients", "com.bikenest.apigateway"})
@EnableFeignClients(basePackageClasses = UsermgmtClient.class)
public class ApigatewayApplication {

    @Autowired
    AuthenticationFilter authenticationFilter;

    /**
     * These fields are set by the application.properties file while the application.properties takes it from
     * the present Environment variables. This is required for Kubernetes because Discorvery of other Services works
     * that way (If the Gateway Service can access the bikenest service, there will be a environment variable
     * BIKENEST_SERVICE_HOST available, that stores the IP address of the bikenest service.
     * For local development we use docker compose, so this also has to be compatible with this whole setup. Therefore
     * the environment variables have to be set accordingly in the docker-compose file.
     */
    @Value("${client.bikenest.url}")
    private String bikenestServiceUrl;
    @Value("${client.booking.url}")
    private String bookingServiceUrl;
    @Value("${client.usermgmt.url}")
    private String userServiceUrl;
    @Value("${client.payment.url}")
    private String paymentServiceUrl;

    public static void main(String[] args) {
        SpringApplication.run(ApigatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("bikenest", r -> r.path("/api/service-bikenest/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri(bikenestServiceUrl))
                .route("booking", r -> r.path("/api/service-booking/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri(bookingServiceUrl))
                .route("usermanagement", r -> r.path("/api/service-usermgmt/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri(userServiceUrl))
                .route("payment", r -> r.path("/api/service-payment/**")
                        .filters(f -> f.filter(authenticationFilter))
                        .uri(paymentServiceUrl))
                .build();
    }
}
