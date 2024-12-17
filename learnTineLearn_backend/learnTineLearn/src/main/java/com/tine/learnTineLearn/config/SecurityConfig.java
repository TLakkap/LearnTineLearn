package com.tine.learnTineLearn.config;

import com.tine.learnTineLearn.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

/**
 * Configuration class that defines security settings for the application.
 * It sets up HTTP request authorization rules, enables JWT-based authentication,
 * and configures password encoding for secure authentication processes.
 */
@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    /**
     * Configures HTTP security settings such as CSRF protection, authorization rules,
     * and JWT token filtering. It defines which API endpoints are accessible and
     * which require authentication.
     *
     * @param http HttpSecurity object used to configure HTTP security settings.
     * @return SecurityFilterChain configured security filter chain.
     * @throws Exception if there is an error in the configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Disables CSRF protection for endpoints starting with "/api/**"
        http.csrf(csrf -> csrf.ignoringRequestMatchers(new AntPathRequestMatcher("/api/**")))
            // Configures authorization rules for different HTTP methods and endpoints
            .authorizeHttpRequests(auth -> auth
                // Allows all GET requests, and POST requests to "/api/auth/login", without authentication
                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                // Requires authentication for POST, PUT and DELETE requests
                .requestMatchers(HttpMethod.POST, "/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/**").authenticated()
                // Requires authentication for any other request
                .anyRequest().authenticated()
            )
            // Adds the JWT filter before the UsernamePasswordAuthenticationFilter
            // This ensures JWT authentication happens before the default Spring Security filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Configures the AuthenticationManager bean, which is used to handle authentication requests.
     *
     * @param authenticationConfiguration provides access to AuthenticationManager.
     * @return the AuthenticationManager for handling authentication.
     * @throws Exception if there is an error in the configuration.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Configures a PasswordEncoder bean using BCrypt for password encoding.
     *
     * @return PasswordEncoder instance using BCrypt.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
