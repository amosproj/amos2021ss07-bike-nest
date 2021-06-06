package com.bikenest.servicepayment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

/**
 * This Payment Service handles all of the Interactions with Braintree, the Payment Provider we have chosen for now.
 * Currently when registering one of our customers with Braintree, we send their first name, last name and email address to their servers.
 * This will have to be explicitly stated to the end user in production, because of data protection reasons.
 * Currently we only operate in a Sandbox Environment without real user data.
 */
@SpringBootApplication
@Import(com.bikenest.common.exceptions.GlobalExceptionHandler.class)
public class ServicepaymentApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServicepaymentApplication.class, args);
    }

}
