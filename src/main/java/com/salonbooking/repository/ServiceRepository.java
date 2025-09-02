package com.salonbooking.repository;

import com.salonbooking.model.Service;
import com.salonbooking.model.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findBySalon(Salon salon);
    List<Service> findBySalonId(Long salonId);
}
