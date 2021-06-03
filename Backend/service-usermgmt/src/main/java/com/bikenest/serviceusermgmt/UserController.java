package com.bikenest.serviceusermgmt;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.common.interfaces.usermgmt.ChangePasswordRequest;
import com.bikenest.common.interfaces.usermgmt.SigninRequest;
import com.bikenest.common.interfaces.usermgmt.SignupRequest;
import com.bikenest.common.security.UserInformation;
import com.bikenest.serviceusermgmt.models.User;
import com.bikenest.serviceusermgmt.services.AccountService;
import com.bikenest.serviceusermgmt.services.JWTService;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping(path = "/usermanagement")
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

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@Valid @RequestBody SigninRequest signinRequest) throws BusinessLogicException {
        User loggedInUser = accountService.loginUser(signinRequest.getEmail(), signinRequest.getPassword());
        String jwt = jwtService.buildJwtFromUser(loggedInUser);
        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws BusinessLogicException {
        User user = accountService.createAccount(signUpRequest.getEmail(), signUpRequest.getPassword(),
                signUpRequest.getName(), signUpRequest.getLastname());

        String jwt = jwtService.buildJwtFromUser(user);

        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/admintoken")
    public ResponseEntity<String> getAdminToken() {
        return ResponseEntity.ok(jwtService.buildAdminJwt());
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Boolean> changePassword(@AuthenticationPrincipal UserInformation user,
                                                          @Valid @RequestBody ChangePasswordRequest changePasswordRequest) throws BusinessLogicException {
        User newUser = accountService.changePassword(
                user.getEmail(), changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());

        return ResponseEntity.ok(true);
    }
}

