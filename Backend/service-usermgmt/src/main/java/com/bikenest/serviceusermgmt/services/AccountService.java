package com.bikenest.serviceusermgmt.services;

import com.bikenest.serviceusermgmt.models.User;
import com.bikenest.serviceusermgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    UserRepository userRepository;

    public boolean existsAccountWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password))
            return user;
        return Optional.empty();
    }

    public Optional<User> createAccount(String email, String password, String firstName, String lastName) {
        if (existsAccountWithEmail(email))
            return Optional.empty();

        User user = new User(firstName, lastName, email, password);
        userRepository.save(user);

        return Optional.of(user);
    }

    public boolean changePassword(String email, String oldPassword, String newPassword) {
        if (!existsAccountWithEmail(email))
            return false;

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(oldPassword)) {
            user.get().setPassword(newPassword);
            return true;
        }
        return false;
    }
}
