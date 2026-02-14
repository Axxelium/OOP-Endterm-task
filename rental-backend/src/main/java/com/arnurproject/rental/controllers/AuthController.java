package com.arnurproject.rental.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arnurproject.rental.data.DBManager;
import com.arnurproject.rental.models.Client;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private DBManager dbManager = new DBManager();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        System.out.println("Login attempt received.");
        String username = credentials.get("username");
        String password = credentials.get("password");

        System.out.println("Processing login for user: " + username);

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }

        Client client = dbManager.getClientByCredentials(username, password);

        if (client != null) {
            System.out.println("User " + username + " logged in successfully.");
            return ResponseEntity.ok(client);
        } else {
            System.out.println("Login failed for user: " + username);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
