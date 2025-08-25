package com.salonbooking.repository;

import com.salonbooking.model.Salon;
import com.salonbooking.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SalonRepository extends JpaRepository<Salon, Long> {
	
	// Find salons within a radius (in kilometers)
	@Query(value = "SELECT *, (6371 * acos(cos(radians(:lat)) * cos(radians(latitude)) * cos(radians(longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(latitude)))) AS distance FROM salon HAVING distance < :radius ORDER BY distance", nativeQuery = true)
	List<Salon> findNearbySalons(@Param("lat") double latitude, @Param("lng") double longitude, @Param("radius") double radiusInKm);
	
	// Find salons by city (case insensitive)
	List<Salon> findByCityIgnoreCase(String city);

	// Find salons by service keyword (partial match, case insensitive)
	@Query("SELECT s FROM Salon s WHERE LOWER(s.services) LIKE LOWER(CONCAT('%', :keyword, '%'))")
	List<Salon> findByServiceKeyword(String keyword);
	
	Optional<Salon> findByOwner(User owner);
	
	Optional<Salon> findByOwnerUsername(String username);
	
	
	


}
