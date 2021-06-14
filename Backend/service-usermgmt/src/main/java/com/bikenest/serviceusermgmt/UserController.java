package com.bikenest.serviceusermgmt;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.BooleanResponse;
import com.bikenest.common.interfaces.usermgmt.ChangePasswordRequest;
import com.bikenest.common.interfaces.usermgmt.ChangePersonalInformationRequest;
import com.bikenest.common.interfaces.usermgmt.JWTResponse;
import com.bikenest.common.interfaces.usermgmt.SigninRequest;
import com.bikenest.common.interfaces.usermgmt.SignupRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.serviceusermgmt.models.User;
import com.bikenest.serviceusermgmt.services.AccountService;
import com.bikenest.serviceusermgmt.services.JWTService;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.security.Key;


/**
 * Provides Endpoints for Signing in and Signing up
 */
@RestController
@RequestMapping(path = "/")
public class UserController {
    private Key SECRET_KEY = Keys.hmacShaKeyFor("NdRgUkXp2s5v8yzB?D(G+KbPeShVmYq3".getBytes());

    @Autowired
    AccountService accountService;
    @Autowired
    JWTService jwtService;

    @PostMapping(path = "/validatejwt")
    @PreAuthorize("hasRole('SERVICE')")
    public ResponseEntity<Boolean> validateJWT(@RequestBody String JWT) {
        return ResponseEntity.ok(jwtService.validateJWT(JWT));
    }

    @PostMapping(path="/signin")
    public ResponseEntity<JWTResponse> authenticateUser(@Valid @RequestBody SigninRequest signinRequest) throws BusinessLogicException {
        User loggedInUser = accountService.loginUser(signinRequest.getEmail(), signinRequest.getPassword());
        String jwt = jwtService.buildJwtFromUser(loggedInUser);
        return ResponseEntity.ok(new JWTResponse(jwt));
    }

    @PostMapping(path="/signup")
    public ResponseEntity<JWTResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws BusinessLogicException {
        User user = accountService.createAccount(signUpRequest.getEmail(), signUpRequest.getPassword(),
                signUpRequest.getName(), signUpRequest.getLastname());

        String jwt = jwtService.buildJwtFromUser(user);

        return ResponseEntity.ok(new JWTResponse(jwt));
    }

    @PostMapping(path = "/admintoken")
    public ResponseEntity<JWTResponse> getAdminToken() {
        return ResponseEntity.ok(
                new JWTResponse(jwtService.buildAdminJwt()));
    }

    @PostMapping(path="/changePassword")
    public ResponseEntity<BooleanResponse> changePassword(@AuthenticationPrincipal UserInformation user,
                                                          @Valid @RequestBody ChangePasswordRequest changePasswordRequest) throws BusinessLogicException {
        User newUser = accountService.changePassword(
                user.getEmail(), changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());

        return ResponseEntity.ok(new BooleanResponse(true));
    }

    @PostMapping(path="/changePersonalInformation")
    public ResponseEntity<JWTResponse> changePersonalInformation(@AuthenticationPrincipal UserInformation user,
                                                          @Valid @RequestBody ChangePersonalInformationRequest changePersonalInformationRequest) throws BusinessLogicException {
        User newUser = accountService.changePersonalInformation( 
            changePersonalInformationRequest.getPassword(), 
            changePersonalInformationRequest.getFirstName(),
            changePersonalInformationRequest.getLastName(),
            changePersonalInformationRequest.getEmail(),
            user.getEmail());
            System.out.println("Old Email: " + user.getEmail());

        String jwt = jwtService.buildJwtFromUser(newUser);

        return ResponseEntity.ok(new JWTResponse(jwt));
        //return ResponseEntity.ok(new BooleanResponse(true));
    }
}

