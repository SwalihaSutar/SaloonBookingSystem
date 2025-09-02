package com.salonbooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.salonbooking.dto.RegisterRequest;
import com.salonbooking.model.User;
import com.salonbooking.model.User.Role;
import com.salonbooking.security.CustomUserDetails;
import com.salonbooking.security.JwtTokenUtil;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ This method is for registration
    public String register(RegisterRequest request) {
        // 1️⃣ Check if user already exists
        if (userService.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // 2️⃣ Create and set up the user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // ✅ Set the role from request ("CUSTOMER" or "OWNER")
        user.setRole(request.getRole().toUpperCase());

        // 3️⃣ Save the user
        userService.save(user);

        // 4️⃣ Generate JWT token
        return jwtTokenUtil.generateToken(new CustomUserDetails(user));
    }

    // Login method can stay same or similar
}
