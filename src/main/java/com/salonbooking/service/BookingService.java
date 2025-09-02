package com.salonbooking.service;

import com.salonbooking.dto.BookingRequest;
import com.salonbooking.model.Booking;
import com.salonbooking.model.Salon;
import com.salonbooking.model.User;
import com.salonbooking.repository.BookingRepository;
import com.salonbooking.repository.SalonRepository;
import com.salonbooking.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SalonRepository salonRepository;
    
    public Booking createBooking(BookingRequest request, String username) {

        // Get user by email (username comes from JWT)
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get salon by ID
        Salon salon = salonRepository.findById(request.getSalonId())
                .orElseThrow(() -> new RuntimeException("Salon not found"));

        Booking booking = new Booking();
        booking.setDate(LocalDate.parse(request.getDate()));
        booking.setTime(LocalTime.parse(request.getTime()));
        booking.setService(request.getService());
        booking.setSalon(salon);
        booking.setUser(user);

        return bookingRepository.save(booking);
    }


    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}  