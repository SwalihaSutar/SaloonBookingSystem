package com.salonbooking.repository;

import com.salonbooking.model.Booking;
import com.salonbooking.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByUser(User user);
	
	
	
}

