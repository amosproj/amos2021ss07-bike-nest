package com.bikenest.serviceusermgmt;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;

import java.security.Key;

import java.util.Date;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bikenest.serviceusermgmt.models.User;
import com.bikenest.serviceusermgmt.payload.LoginRequest;
import com.bikenest.serviceusermgmt.payload.SignupRequest;
import com.bikenest.serviceusermgmt.payload.MessageResponse;
import com.bikenest.serviceusermgmt.repository.UserRepository;

@RestController
@RequestMapping(path="/usermanagement")
public class UserController {
    private Key SECRET_KEY = Keys.hmacShaKeyFor("NdRgUkXp2s5v8yzB?D(G+KbPeShVmYq3".getBytes());

	@Autowired
	UserRepository userRepository;

    //jwtauth Endpoint
    @PostMapping(path="/validatejwt")
    public ResponseEntity<Boolean> ValidateJWT(@RequestBody String JWT){
    	try {
			Jwt parsed = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parse(JWT);
		}catch(Exception ex){
			return ResponseEntity.ok(false);
		}
        return ResponseEntity.ok(true);
    }

	@PostMapping("/signin")
	public ResponseEntity<String> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		if(loginRequest.getUsername().equals("Test") && loginRequest.getPassword().equals("Test"))
		{
			//BUILD JWT
			String jwt = Jwts.builder()
							.signWith(SECRET_KEY)
							.setSubject("Test")
							.setIssuedAt(new Date())
							.claim("Role", "User")
							.setExpiration(new Date((new Date()).getTime() + 1000000))
							.compact();
			return ResponseEntity.ok(jwt);
		}
		return ResponseEntity.badRequest().build();
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 signUpRequest.getPassword());

		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}

