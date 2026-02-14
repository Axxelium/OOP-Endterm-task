package com.arnurproject.rental.controllers;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arnurproject.rental.data.DBManager;
import com.arnurproject.rental.models.Vehicle;

@RestController
@RequestMapping("/api") // ссылка
@CrossOrigin(origins = "*")
public class VehicleController {
    private DBManager dbManager = new DBManager();

    // Ссылка: http://localhost:8080/api/vehicles
    @GetMapping("/vehicles")
    public ArrayList<Vehicle> getVehicles() {
        return dbManager.getAllVehicles();
    }
}