package com.bikenest.serviceusermgmt.services;

import com.bikenest.serviceusermgmt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    UserRepository userRepository;

}
