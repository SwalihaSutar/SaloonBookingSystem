package com.salonbooking.controller;

import com.salonbooking.dto.LoginRequest;
import com.salonbooking.dto.RegisterRequest;
import com.salonbooking.dto.UserDTO;
import com.salonbooking.model.User;
import com.salonbooking.repository.UserRepository;
import com.salonbooking.security.JwtTokenUtil;
import com.salonbooking.service.OtpService;
import com.salonbooking.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private OtpService otpService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // ✅ Get all users (avoid exposing password)
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setPassword(null)); // remove passwords
        return ResponseEntity.ok(users);
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            user.get().setPassword(null); // hide password
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // ✅ Update user by ID (encrypt password before saving)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setUsername(updatedUser.getUsername());
            user.setRole(updatedUser.getRole());

            // Only update password if provided
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            userRepository.save(user);
            user.setPassword(null); // Hide password in response
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }



    // ✅ Get current logged-in user (token-based)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.substring(7); // skip "Bearer "
            String username = jwtTokenUtil.getUsernameFromToken(token);
            Optional<User> userOpt = userRepository.findByUsername(username);

            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setPassword(null);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }
    }

    // ✅ Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // ✅ Register with OTP check
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        if (userService.existsByUsername(userDTO.getUsername())) {
            return ResponseEntity.badRequest().body("❌ Username is already taken!");
        }

        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Validate & set role (fallback to USER if null or invalid)
        String role = userDTO.getRole();
        if (role == null || (!role.equalsIgnoreCase("USER") 
                && !role.equalsIgnoreCase("ADMIN") 
                && !role.equalsIgnoreCase("OWNER"))) {
            role = "USER"; // fallback
        }
        newUser.setRole(role.toUpperCase());

        userService.save(newUser);
        return ResponseEntity.ok("✅ User registered successfully!");
    }



    // ✅ Login and return token
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
                String token = jwtTokenUtil.generateToken(userDetails);
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("id", user.getId());
                response.put("role", user.getRole());
                response.put("username", user.getUsername());

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
