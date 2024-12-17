package com.tine.learnTineLearn;

import com.tine.learnTineLearn.model.User;
import com.tine.learnTineLearn.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuration class responsible for initializing essential user data in the system.
 * Ensures that an 'admin' user exists with a securely encoded password.
 */
@Configuration
public class UserDataInit {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Retrieves the admin password from environment variables
    @Value("${ADMIN_PWD}")
    private String password;

    /**
     * init() method is executed after the bean's properties have been set.
     * This method checks if the 'admin' user exists in the database. If not,
     * it creates and saves an 'admin' user with a securely encoded password.
     */
    @PostConstruct
    public void init() {
        // Check if username "admin" exists in the database
        if (userRepository.findByUsername("admin").isEmpty()) {
            // Create User object, set username "admin"
            User admin = new User();
            admin.setUsername("admin");

            // Encode password and set it to "admin" User object
            admin.setPassword(passwordEncoder.encode(password));

            // Save the created "admin" user to the repository
            userRepository.save(admin);
        }
    }

}
