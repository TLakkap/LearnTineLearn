package com.tine.learnTineLearn;

import com.tine.learnTineLearn.model.User;
import com.tine.learnTineLearn.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserDataInit {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Value("${ADMIN_PWD}")
        private String password;

        @PostConstruct
        public void init() {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode(password));
                userRepository.save(admin);
            }
        }

}
