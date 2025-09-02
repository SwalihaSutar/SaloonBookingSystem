package com.salonbooking.controller;

import com.salonbooking.dto.BookingRequest;
import com.salonbooking.model.Booking;
import com.salonbooking.model.Salon;
import com.salonbooking.model.User;
import com.salonbooking.repository.BookingRepository;
import com.salonbooking.repository.SalonRepository;
import com.salonbooking.repository.UserRepository;
import com.salonbooking.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api/user/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private SalonRepository salonRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest bookingRequest, Principal principal) {
        String username = principal.getName();

        // ✅ Log salon ID coming from frontend
        System.out.println("Salon ID from request: " + bookingRequest.getSalonId());
        System.out.println("Principal username: " + username);

        Optional<User> userOpt = userRepository.findByUsername(username);
        System.out.println("User present: " + userOpt.isPresent());
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();
        Booking booking = new Booking();
        booking.setUser(user);

        return ResponseEntity.ok(bookingService.createBooking(bookingRequest, username));
    }


    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Booking> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id);
    }
    @GetMapping("/my")
    public ResponseEntity<List<Booking>> getMyBookings(Principal principal, @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        // ✅ Debug log for incoming token
        System.out.println("Authorization Header: " + authHeader);

        // ✅ Debug log for logged-in username
        if (principal != null) {
            System.out.println("Logged-in username from Principal: " + principal.getName());
        } else {
            System.out.println("Principal is NULL - authentication failed or token missing");
        }

        Optional<User> userOpt = userRepository.findByUsername(principal.getName());

        if (userOpt.isPresent()) {
            List<Booking> bookings = bookingRepository.findByUser(userOpt.get());
            return ResponseEntity.ok(bookings);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    
    
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setUser(updatedBooking.getUser());
            booking.setSalon(updatedBooking.getSalon());
            booking.setDateTime(updatedBooking.getDateTime());
            booking.setStatus(updatedBooking.getStatus());
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, Principal principal) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);

        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            if (booking.getUser().getUsername().equals(principal.getName())) {
                booking.setStatus("CANCELLED");
                return ResponseEntity.ok(bookingRepository.save(booking));
            }
            return ResponseEntity.status(403).body("You can't cancel this booking");
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
//    @PostMapping("/create")
//    public ResponseEntity<?> bookAppointment(@RequestParam Long salonId, @RequestParam String dateTime, Principal principal) {
//        Optional<User> userOpt = userRepository.findByUsername(principal.getName());
//        Optional<Salon> salonOpt = salonRepository.findById(salonId);
//
//        if (userOpt.isPresent() && salonOpt.isPresent()) {
//            Booking booking = new Booking();
//            booking.setUser(userOpt.get());
//            booking.setSalon(salonOpt.get());
//            booking.setDateTime(LocalDateTime.parse(dateTime));
//            booking.setStatus("PENDING");
//            return ResponseEntity.ok(bookingRepository.save(booking));
//        }
//        return ResponseEntity.badRequest().body("Invalid salon or user");
//    }
}
