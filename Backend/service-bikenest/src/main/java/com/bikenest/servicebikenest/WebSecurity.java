package com.bikenest.servicebikenest;

import com.bikenest.common.security.JWTAuthenticationEntrypoint;
import com.bikenest.common.security.JWTAuthenticationFilter;
import com.bikenest.common.security.JWTAuthenticationEntrypoint;
import com.bikenest.common.security.JWTAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
    private JWTAuthenticationEntrypoint jwtAuthenticationEntryPoint = new JWTAuthenticationEntrypoint();
    private JWTAuthenticationEntrypoint jwtAuthenticationEntryPoint = new JWTAuthenticationEntrypoint();

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.logout().disable();
        http.formLogin().disable();
        http.httpBasic().disable();


        http.cors().and().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/", "/bikenest/info", "/bikenest/all", "/bikenest/login")
                .permitAll()
                .anyRequest().authenticated()
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
