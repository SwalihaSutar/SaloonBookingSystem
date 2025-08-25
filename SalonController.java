package com.salonbooking.controller;

import com.salonbooking.dto.SalonDTO;
import com.salonbooking.model.Salon;
import com.salonbooking.model.User;
import com.salonbooking.repository.SalonRepository;
import com.salonbooking.repository.UserRepository;
import com.salonbooking.service.SalonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/api/salons")
public class SalonController {

    @Autowired
    private SalonRepository salonRepository;
    
    @Autowired
    private SalonService salonService;
    
    @Autowired
    private UserRepository userRepository;

    // ✅ Create a new salon (Admin only)
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OWNER')")
    public ResponseEntity<?> createSalon(@RequestBody Salon salon,
                                         @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized - No user found");
        }

        String username = userDetails.getUsername();

        Optional<User> dbUserOpt = userRepository.findByUsername(username);
        if (dbUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        salon.setOwner(dbUserOpt.get());

        try {
            Salon savedSalon = salonService.saveSalon(salon);
            return ResponseEntity.ok(savedSalon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error saving salon: " + e.getMessage());
        }
    }
    // ✅ Get all salons (public)
    @GetMapping("/salons/{id}")
    public ResponseEntity<?> getSalon(@PathVariable Long id) {
        Optional<Salon> salonOpt = salonRepository.findById(id);
        if (salonOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Salon not found");
        }
        return ResponseEntity.ok(salonOpt.get());
    }

 // 🌍 Get nearby salons
    @GetMapping("/nearby")
    public ResponseEntity<List<Salon>> getNearbySalons(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "10") double radiusKm) {

        List<Salon> nearbySalons = salonService.findNearbySalons(latitude, longitude, radiusKm);
        return ResponseEntity.ok(nearbySalons);
    }


    

    // ✅ Update a salon (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<Salon> updateSalon(@PathVariable Long id, @RequestBody Salon updatedSalon) {
        return salonRepository.findById(id)
                .map(salon -> {
                    salon.setName(updatedSalon.getName());
                    salon.setAddress(updatedSalon.getAddress());
                    salon.setCity(updatedSalon.getCity());
                    salon.setLatitude(updatedSalon.getLatitude());
                    salon.setLongitude(updatedSalon.getLongitude());
                    salon.setContact(updatedSalon.getContact());
                    return ResponseEntity.ok(salonRepository.save(salon));
                }).orElse(ResponseEntity.notFound().build());
    }
    //  Delete a salon (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('OWNER', 'ADMIN')")
    public ResponseEntity<?> deleteSalon(@PathVariable Long id) {
        if (salonRepository.existsById(id)) {
            salonRepository.deleteById(id);
            return ResponseEntity.ok("Salon deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
 //  Get salons by city
    @GetMapping("/search/city")
    public ResponseEntity<List<Salon>> getSalonsByCity(@RequestParam String city) {
        List<Salon> salons = salonRepository.findByCityIgnoreCase(city);
        return ResponseEntity.ok(salons);
    }

    //  Get salons by service
    @GetMapping("/search/service")
    public ResponseEntity<List<SalonDTO>> getSalonsByService(@RequestParam("service") String keyword) {
        List<SalonDTO> salons = salonService.findSalonsByServiceName(keyword);
        return ResponseEntity.ok(salons);
    }
    
    @GetMapping
    public ResponseEntity<List<Salon>> getAllSalons() {
        List<Salon> salons = salonRepository.findAll();
        return ResponseEntity.ok(salons);
    }
    
 // ✅ Get salon for logged-in owner
    @GetMapping("/my")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> getMySalon(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String username = userDetails.getUsername();
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Optional<Salon> salonOpt = salonRepository.findByOwner(userOpt.get());
        if (salonOpt.isPresent()) {
            return ResponseEntity.ok(salonOpt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salon not registered yet");
        }
    }
    
    @GetMapping("/owner")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> getSalonForLoggedInOwner(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String username = userDetails.getUsername();
        Optional<Salon> salonOpt = salonService.getSalonByOwnerUsername(username);

        if (salonOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salon not found for owner");
        }

        return ResponseEntity.ok(salonOpt.get());
    }

 // ✅ Get salon by ID (public)
    @GetMapping("/{id}")
    public ResponseEntity<Salon> getSalonById(@PathVariable Long id) {
        Optional<Salon> salon = salonRepository.findById(id);
        return salon.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }






 
}
