package com.bikenest.serviceusermgmt;

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

        // Configure what requests should be authorized. In thise case none.
        // Also we set a filter, that will check the Authorization Header and set the SecurityContext, if a JWT is provided.
        http.cors().and().authorizeRequests()
                .antMatchers("/usermanagement/changePassword")
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
