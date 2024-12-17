package com.tine.learnTineLearn.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Custom filter that intercepts incoming HTTP requests and validates JWT tokens.
 * Ensures that requests contain a valid JWT token and, if so, sets the authentication context
 * for the request, enabling access to secured resources.
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Method that filters incoming HTTP requests, extracts the JWT token from the Authorization header,
     * and validates the token. If valid, it sets the authentication context for the request.
     *
     * @param request the HTTP request object
     * @param response the HTTP response object
     * @param chain the filter chain to pass the request and response to the next filter
     * @throws ServletException if a servlet exception occurs during filtering
     * @throws IOException if an IO exception occurs during filtering
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Extract the 'Authorization' header from the request
        String authorizationHeader = request.getHeader("Authorization");

        // If no 'Authorization' header or the header doesn't start with "Bearer ", pass the request along the filter chain
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        // Extract the JWT token by removing the "Bearer " prefix
        String jwt = authorizationHeader.substring(7);
        String username;

        try {
            // Extract the username from the JWT token
            username = jwtUtils.extractUsername(jwt);
        } catch (JwtException | IllegalArgumentException e) {
            // If the token is invalid or expired, return an Unauthorized response
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired JWT token");
            return;
        }

        // If the username is found and no existing authentication context, authenticate the user
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details based on the username from the token
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // If the token is valid, create an authentication token and set it in the security context
            if (jwtUtils.isTokenValid(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                // Set additional details for the authentication object, such as the request details
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Set the authentication context with the authenticated user's information
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain
        chain.doFilter(request, response);
    }
}

