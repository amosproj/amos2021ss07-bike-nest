package com.bikenest.usermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping(path="/usermanagement")
public class UsermanagementApplication {

	@GetMapping("/info")
	public String home() {
		return "Usermanagement.";
	}

	//Login endpoint

	//jwtauth endpoint

	//create endpoint

	public static void main(String[] args) {
		SpringApplication.run(UsermanagementApplication.class, args);
	}

}
