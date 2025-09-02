package com.salonbooking.controller;

import com.salonbooking.model.Salon;
import com.salonbooking.model.Service;
import com.salonbooking.model.User;
import com.salonbooking.repository.SalonRepository;
import com.salonbooking.repository.ServiceRepository;
import com.salonbooking.repository.UserRepository;
import com.salonbooking.security.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin
@RestController
@RequestMapping("/api/owner/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private SalonRepository salonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // 🔐 Helper to get logged-in owner
    private Optional<User> getLoggedInUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return Optional.empty();
        String token = authHeader.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return userRepository.findByUsername(username);
    }

    @PostMapping("/{salonId}")
    public ResponseEntity<?> addService(@PathVariable Long salonId,
                                        @RequestBody Service service,
                                        @RequestHeader("Authorization") String authHeader) {
        Optional<User> ownerOpt = getLoggedInUser(authHeader);
        if (ownerOpt.isEmpty()) return ResponseEntity.status(401).body("Unauthorized");

        System.out.println("Logged-in owner ID: " + ownerOpt.get().getId());

        Optional<Salon> salonOpt = salonRepository.findById(salonId);
        if (salonOpt.isEmpty()) {
            System.out.println("Salon with ID " + salonId + " not found!");
            return ResponseEntity.badRequest().body("Salon not found");
        }

        Salon salon = salonOpt.get();
        System.out.println("Salon ID: " + salon.getId() + ", Owner ID: " + salon.getOwner().getId());
        if (!salon.getOwner().getId().equals(ownerOpt.get().getId())) {
            System.out.println("Ownership mismatch: salon owner ID = " + salon.getOwner().getId());
            return ResponseEntity.status(403).body("You don't own this salon");
        }

        service.setSalon(salon);
        return ResponseEntity.ok(serviceRepository.save(service));
    }


    // ✅ View all services for a salon
    @GetMapping("/{salonId}")
    public ResponseEntity<?> getServicesBySalon(@PathVariable Long salonId,
                                                @RequestHeader("Authorization") String authHeader) {
        Optional<User> ownerOpt = getLoggedInUser(authHeader);
        if (ownerOpt.isEmpty()) return ResponseEntity.status(401).body("Unauthorized");

        Optional<Salon> salonOpt = salonRepository.findById(salonId);
        if (salonOpt.isEmpty()) return ResponseEntity.badRequest().body("Salon not found");

        Salon salon = salonOpt.get();
        if (!salon.getOwner().getId().equals(ownerOpt.get().getId())) {
            return ResponseEntity.status(403).body("You don't own this salon");
        }

        return ResponseEntity.ok(serviceRepository.findBySalon(salon));
    }

    // ✅ Update service
    @PutMapping("/{serviceId}")
    public ResponseEntity<?> updateService(@PathVariable Long serviceId,
                                           @RequestBody Service updatedService,
                                           @RequestHeader("Authorization") String authHeader) {
        Optional<User> ownerOpt = getLoggedInUser(authHeader);
        if (ownerOpt.isEmpty()) return ResponseEntity.status(401).body("Unauthorized");

        Optional<Service> serviceOpt = serviceRepository.findById(serviceId);
        if (serviceOpt.isEmpty()) return ResponseEntity.notFound().build();

        Service service = serviceOpt.get();
        Salon salon = service.getSalon();

        if (!salon.getOwner().getId().equals(ownerOpt.get().getId())) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }

        service.setName(updatedService.getName());
        service.setPrice(updatedService.getPrice());
        

        return ResponseEntity.ok(serviceRepository.save(service));
    }

    // ✅ Delete service
    @DeleteMapping("/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable Long serviceId,
                                           @RequestHeader("Authorization") String authHeader) {
        Optional<User> ownerOpt = getLoggedInUser(authHeader);
        if (ownerOpt.isEmpty()) return ResponseEntity.status(401).body("Unauthorized");

        Optional<Service> serviceOpt = serviceRepository.findById(serviceId);
        if (serviceOpt.isEmpty()) return ResponseEntity.notFound().build();

        Service service = serviceOpt.get();
        if (!service.getSalon().getOwner().getId().equals(ownerOpt.get().getId())) {
            return ResponseEntity.status(403).body("Unauthorized access");
        }

        serviceRepository.delete(service);
        return ResponseEntity.ok("Service deleted successfully");
    }
}
