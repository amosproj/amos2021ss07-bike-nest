package com.bikenest.servicebikenest.security;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.KeyLengthException;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;

public class TokenAuthenticationService {
    private String SECRET = "NdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3";
    private String HEADER = "Authorization";

    public String generateToken(String user) throws JOSEException {
        byte[] sharedSecret = SECRET.getBytes();
        MACSigner signer = new MACSigner(sharedSecret);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder().subject(user).build();
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(signer);
        return signedJWT.serialize();
    }

    public void addAuthentication(String user, HttpServletResponse servletResponse) throws JOSEException {
        String token = generateToken(user);
        servletResponse.addHeader("Token", token);
    }

    public Authentication getAuthentication(HttpServletRequest servletRequest) throws ParseException, JOSEException {
        String givenToken = servletRequest.getHeader(HEADER);
        if(givenToken != null){
            SignedJWT signedJWT = SignedJWT.parse(givenToken);
            byte[] sharedSecret = SECRET.getBytes();
            if(signedJWT.verify(new MACVerifier(sharedSecret))){
                return new AuthToken(signedJWT.getPayload().toJSONObject().toString());
            }
        }
        return null;
    }
}
