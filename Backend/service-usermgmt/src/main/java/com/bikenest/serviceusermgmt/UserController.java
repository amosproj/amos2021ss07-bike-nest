package com.bikenest.serviceusermgmt;

import com.bikenest.common.interfaces.usermgmt.*;
import com.bikenest.serviceusermgmt.helper.JWTHelper;
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
import com.bikenest.serviceusermgmt.repository.UserRepository;

/**
 * Provides Endpoints for Signing in and Signing up
 */
@RestController
@RequestMapping(path="/usermanagement")
public class UserController {
    private Key SECRET_KEY = Keys.hmacShaKeyFor("NdRgUkXp2s5v8yzB?D(G+KbPeShVmYq3".getBytes());

	@Autowired
	UserRepository userRepository;

    @PostMapping(path="/validatejwt")
	@PreAuthorize("hasRole('SERVICE')")
    public ResponseEntity<Boolean> ValidateJWT(@RequestBody String JWT){
    	return ResponseEntity.ok(JWTHelper.GetSingleton().ValidateJWT(JWT));
    }

	@PostMapping("/signin")
	public ResponseEntity<SigninResponse> authenticateUser(@Valid @RequestBody SigninRequest signinRequest) {
		Optional<User> user = userRepository.findByEmail(signinRequest.getEmail());
		if(!user.isPresent()){
			return ResponseEntity.badRequest().body(new SigninResponse(false, "Email not found!", null));
		}
		if(signinRequest.getPassword().equals(user.get().getPassword()))
		{
			String jwt = JWTHelper.GetSingleton().BuildJwtFromUser(user.get());
			return ResponseEntity.ok(new SigninResponse(true, null, jwt));
		}
		return ResponseEntity.badRequest().body(new SigninResponse(false, "Invalid password!", null));
	}

	@PostMapping("/signup")
	public ResponseEntity<SignupResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new SignupResponse(false,"Email is already taken!", null));
		}

		// Create new user's account
		User user = new User(signUpRequest.getName(), signUpRequest.getLastname(), signUpRequest.getEmail(),
								signUpRequest.getPassword());

		userRepository.save(user);

		String jwt = JWTHelper.GetSingleton().BuildJwtFromUser(user);

		return ResponseEntity.ok(new SignupResponse(true, null, jwt));
	}
}

