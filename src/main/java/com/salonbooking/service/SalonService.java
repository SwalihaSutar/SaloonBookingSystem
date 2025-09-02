package com.salonbooking.service;

import com.salonbooking.dto.SalonDTO;
import com.salonbooking.dto.ServiceDTO;
import com.salonbooking.model.Salon;
import com.salonbooking.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalonService {

    @Autowired
    private SalonRepository salonRepository;

    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    public Salon getSalonById(Long salonId) {
        return salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon not found with id: " + salonId));
    }

    public Salon saveSalon(Salon salon) {
        return salonRepository.save(salon);
    }

    public void deleteSalon(Long id) {
        salonRepository.deleteById(id);
    }
    
    public List<Salon> findNearbySalons(double latitude, double longitude, double radiusInKm) {
        return salonRepository.findNearbySalons(latitude, longitude, radiusInKm);
    }
    
    public List<SalonDTO> findSalonsByServiceName(String keyword) {
        List<Salon> salons = salonRepository.findAll();

        return salons.stream()
                .filter(salon -> salon.getServices() != null && salon.getServices().stream()
                        .anyMatch(service -> service.getName().toLowerCase().contains(keyword.toLowerCase())))
                .map(this::convertToDTO)
                .toList();
    }
    public Optional<Salon> getSalonByOwnerUsername(String username) {
        return salonRepository.findByOwnerUsername(username);
    }
    
    
    
    private SalonDTO convertToDTO(Salon salon) {
        SalonDTO dto = new SalonDTO();
        dto.setId(salon.getId());
        dto.setName(salon.getName());
        dto.setAddress(salon.getAddress());
        dto.setCity(salon.getCity());
        dto.setLatitude(salon.getLatitude());
        dto.setLongitude(salon.getLongitude());
        dto.setContact(salon.getContact());

        List<ServiceDTO> serviceDTOs = salon.getServices().stream()
                .map(service -> {
                    ServiceDTO sDto = new ServiceDTO();
                    sDto.setId(service.getId());
                    sDto.setName(service.getName());
                    sDto.setPrice(service.getPrice());
                    return sDto;
                }).toList();

        dto.setServices(serviceDTOs);
        return dto;

}
}
