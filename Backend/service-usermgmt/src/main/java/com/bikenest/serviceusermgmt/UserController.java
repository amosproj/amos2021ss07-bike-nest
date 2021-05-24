package com.bikenest.serviceusermgmt;

import com.bikenest.common.interfaces.usermgmt.*;
import com.bikenest.serviceusermgmt.services.AccountService;
import com.bikenest.serviceusermgmt.services.JWTService;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;

import java.security.Key;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bikenest.serviceusermgmt.models.User;

/**
 * Provides Endpoints for Signing in and Signing up
 */
@RestController
@RequestMapping(path="/usermanagement")
public class UserController {
    private Key SECRET_KEY = Keys.hmacShaKeyFor("NdRgUkXp2s5v8yzB?D(G+KbPeShVmYq3".getBytes());

	@Autowired
	AccountService accountService;
	@Autowired
	JWTService jwtService;

    @PostMapping(path="/validatejwt")
	@PreAuthorize("hasRole('SERVICE')")
    public ResponseEntity<Boolean> validateJWT(@RequestBody String JWT){
    	return ResponseEntity.ok(jwtService.validateJWT(JWT));
    }

	@PostMapping("/signin")
	public ResponseEntity<SigninResponse> authenticateUser(@Valid @RequestBody SigninRequest signinRequest) {
		if (!accountService.existsAccountWithEmail(signinRequest.getEmail()))
			return ResponseEntity.badRequest().body(new SigninResponse(false, "Email not found!", null));

		Optional<User> loggedInUser = accountService.loginUser(signinRequest.getEmail(), signinRequest.getPassword());
		if(loggedInUser.isPresent())
		{
			String jwt = jwtService.buildJwtFromUser(loggedInUser.get());
			return ResponseEntity.ok(new SigninResponse(true, null, jwt));
		}

		return ResponseEntity.badRequest().body(new SigninResponse(false, "Invalid password!", null));
	}

	@PostMapping("/signup")
	public ResponseEntity<SignupResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (accountService.existsAccountWithEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new SignupResponse(false,"Email is already taken!", null));
		}

		// Create new user's account
		Optional<User> user = accountService.createAccount(signUpRequest.getEmail(), signUpRequest.getPassword(),
				signUpRequest.getName(), signUpRequest.getLastname());

		String jwt = jwtService.buildJwtFromUser(user.get());

		return ResponseEntity.ok(new SignupResponse(true, null, jwt));
	}

	@PostMapping("/admintoken")
	public ResponseEntity<String> getAdminToken(){
    	return ResponseEntity.ok(jwtService.buildAdminJwt());
	}
}

