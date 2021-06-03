package com.bikenest.servicebikenest;

import com.bikenest.common.security.JWTAuthenticationEntrypoint;
import com.bikenest.common.security.JWTAuthenticationFilter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)  // This Enables the @PreAuthorize @PostAuthorize Annotations
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private JWTAuthenticationEntrypoint jwtAuthenticationEntryPoint = new JWTAuthenticationEntrypoint();

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.logout().disable();
        http.formLogin().disable();
        http.httpBasic().disable();

        http.cors().and()
                .authorizeRequests()
                .antMatchers("/bikenest/add", "/bikenest/deleteall")
                .authenticated()
                .anyRequest().permitAll()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .addFilterBefore(new JWTAuthenticationFilter(), BasicAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf()
                .disable();
    }
}
