package com.salonbooking.controller;

import com.salonbooking.model.Salon;
import com.salonbooking.model.User;
import com.salonbooking.repository.SalonRepository;
import com.salonbooking.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/owner/salons")
@PreAuthorize("hasRole('OWNER')") // all endpoints restricted to salon owners
public class OwnerSalonController {

    @Autowired
    private SalonRepository salonRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔹 Create a new salon (OWNER only)
    @PostMapping
    public ResponseEntity<?> createSalon(@RequestBody Salon salon, Authentication authentication) {
    	String username = authentication.getName();
    	Optional<User> ownerOpt = userRepository.findByUsername(username);

        if (ownerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Owner not found");
        }

        salon.setOwner(ownerOpt.get());
        Salon savedSalon = salonRepository.save(salon);
        return ResponseEntity.ok(savedSalon);
    }

    // 🔹 Get all salons of the current owner
    @GetMapping
    public ResponseEntity<List<Salon>> getOwnerSalons(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> ownerOpt = userRepository.findByEmail(email);

        if (ownerOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Salon> salonOpt = salonRepository.findByOwner(ownerOpt.get());
        List<Salon> salons = salonOpt.map(List::of).orElse(List.of()); // wrap single salon into list

        return ResponseEntity.ok(salons);
    }

    // 🔹 Update a salon (only if salon belongs to this owner)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSalon(@PathVariable Long id, @RequestBody Salon updatedSalon, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> ownerOpt = userRepository.findByEmail(email);

        if (ownerOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Salon> existingSalonOpt = salonRepository.findById(id);

        if (existingSalonOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Salon salon = existingSalonOpt.get();
        if (!salon.getOwner().getId().equals(ownerOpt.get().getId())) {
            return ResponseEntity.status(403).body("You do not own this salon");
        }

        salon.setName(updatedSalon.getName());
        salon.setAddress(updatedSalon.getAddress());
        salon.setCity(updatedSalon.getCity());
        salon.setLatitude(updatedSalon.getLatitude());
        salon.setLongitude(updatedSalon.getLongitude());
        salon.setContact(updatedSalon.getContact());

        return ResponseEntity.ok(salonRepository.save(salon));
    }

    // 🔹 Delete salon (only if owned by this user)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalon(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> ownerOpt = userRepository.findByEmail(email);

        if (ownerOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Salon> salonOpt = salonRepository.findById(id);

        if (salonOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Salon salon = salonOpt.get();
        if (!salon.getOwner().getId().equals(ownerOpt.get().getId())) {
            return ResponseEntity.status(403).body("You are not authorized to delete this salon");
        }

        salonRepository.delete(salon);
        return ResponseEntity.ok("Salon deleted successfully");
    }
}
