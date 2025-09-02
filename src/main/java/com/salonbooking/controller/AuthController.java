package com.salonbooking.controller;

import com.salonbooking.model.User;
import com.salonbooking.repository.UserRepository;
import com.salonbooking.security.JwtTokenUtil;
import com.salonbooking.security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
    	System.out.println("Register Endpoint hit"+user.getUsername());
    	 if (user.getRole() == null) {
    	        user.setRole("USER"); // Default role
    	    }
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
    	System.out.println("Lofin API Hits: "+user.getUsername());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(token);
    }
}