package com.salonbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@GetMapping("/test")
    public ResponseEntity<String> testAdminAccess() {
        return ResponseEntity.ok("✅ Hello Admin! You have access.");
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> getAdminDashboard() {
        return ResponseEntity.ok("Welcome to Admin Dashboard");
    }

    @PostMapping("/addSalon")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addSalon(@RequestBody String salonData) {
        // Logic to add salon (mock here)
        return ResponseEntity.ok("Salon added successfully");
    }

    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        // Logic to delete user by id (mock here)
        return ResponseEntity.ok("User deleted successfully");
    }
}
