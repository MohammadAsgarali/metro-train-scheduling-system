package com.metro.fleet.service;

import com.metro.fleet.entity.User;
import com.metro.fleet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /** Simple login check (plain-text compare, matches the sample_data.sql seed). */
    public boolean validateLogin(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
