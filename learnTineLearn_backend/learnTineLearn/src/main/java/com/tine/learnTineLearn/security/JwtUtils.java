package com.tine.learnTineLearn.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

/**
 * Utility class responsible for creating, extracting, and validating JWT tokens.
 * Handles the encoding and decoding of JWTs using a secret key and ensures token validity.
 */
@Component
public class JwtUtils {

    // Secret key used for signing and verifying the JWT token
    private final Key key;

    // Token expiration time in milliseconds
    private final long expiration;

    /**
     * Constructor to initialize JwtUtils with the secret key and expiration time.
     *
     * @param secret the secret key used to sign the JWT token.
     * @param expiration the expiration time for the JWT token.
     */
    public JwtUtils(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
        // Decode the secret key and create a Key instance used for signing JWT tokens
        this.key = new SecretKeySpec(Base64.getDecoder().decode(secret), SignatureAlgorithm.HS512.getJcaName());
        // Set the expiration time for the token
        this.expiration = expiration;
    }

    /**
     * Generates a JWT token for a given username.
     * The token includes the username as the subject, the issue date, and the expiration date.
     *
     * @param username the username for which the token is generated.
     * @return the generated JWT token.
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    /**
     * Extracts the username from the given JWT token.
     *
     * @param token the JWT token from which the username is extracted.
     * @return the username extracted from the token.
     */
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Validates if the given JWT token is valid based on the username.
     *
     * @param token the JWT token to be validated
     * @param username the username to compare against the token's subject
     * @return true if the token is valid (i.e. the username matches and the token is not expired)
     */
    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    /**
     * Checks if the given JWT token has expired.
     *
     * @param token the JWT token to check for expiration
     * @return true if the token has expired, false otherwise
     */
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    /**
     * Extracts all claims (expiration date, subject, etc.) from the given JWT token.
     *
     * @param token the JWT token from which claims are extracted
     * @return the claims contained in the token
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
