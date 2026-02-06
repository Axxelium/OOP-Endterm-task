package com.arnurproject.rental.controllers;

import com.arnurproject.rental.data.DBManager;
import com.arnurproject.rental.models.Vehicle;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api") // ссылка
public class VehicleController {
    private DBManager dbManager = new DBManager();

    // Ссылка: http://localhost:8080/api/vehicles
    @GetMapping("/vehicles")
    public ArrayList<Vehicle> getVehicles() {
        // Просто вызываем твой старый добрый метод
        return dbManager.getAllVehicles();
    }
}