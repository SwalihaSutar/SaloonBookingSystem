package com.salonbooking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    @ManyToOne
    @JoinColumn(name = "salon_id")
    @JsonBackReference  // Prevents infinite recursion (pairs with @JsonManagedReference)
    private Salon salon;

    // --- Constructors ---
    public Service() {
    }

    public Service(Long id, String name, double price, Salon salon) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.salon = salon;
    }

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Salon getSalon() {
        return salon;
    }

    public void setSalon(Salon salon) {
        this.salon = salon;
    }
}
