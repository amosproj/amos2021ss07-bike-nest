package com.bikenest.serviceusermgmt.services;

import com.bikenest.common.exceptions.BusinessLogicException;
import com.bikenest.serviceusermgmt.models.User;
import com.bikenest.serviceusermgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    UserRepository userRepository;

    private boolean existsAccountWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User loginUser(String email, String password) throws BusinessLogicException {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty())
            throw new BusinessLogicException("Es existiert kein Account mit dieser Email Adresse.");

        if (!user.get().getPassword().equals(password))
            throw new BusinessLogicException("Das Passwort für diese Email ist falsch.");

        return user.get();
    }

    public User createAccount(String email, String password, String firstName, String lastName) throws BusinessLogicException {
        if (existsAccountWithEmail(email))
            throw new BusinessLogicException("Ein Account mit dieser Email Adresse existiert bereits!");

        User user = new User(firstName, lastName, email, password);
        userRepository.save(user);

        return user;
    }

    public User changePassword(String email, String oldPassword, String newPassword) throws BusinessLogicException {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isEmpty())
            throw new BusinessLogicException("Es existiert kein Account mit dieser Email Adresse.");

        User actualUser = user.get();
        if (!actualUser.getPassword().equals(oldPassword)) {
            throw new BusinessLogicException("Das alte Passwort ist inkorrekt.");
        }
        actualUser.setPassword(newPassword);
        return userRepository.save(actualUser);
    }
}
