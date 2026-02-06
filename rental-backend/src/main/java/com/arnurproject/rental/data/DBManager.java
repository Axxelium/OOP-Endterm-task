package com.arnurproject.rental.data;

import com.arnurproject.rental.models.Client;
import com.arnurproject.rental.models.Vehicle;
import com.arnurproject.rental.models.Car;
import com.arnurproject.rental.models.Truck;
import java.sql.*;
import java.util.ArrayList;

public class DBManager {

    // CREATE
    public void addClient(Client client) {
        String sql = "INSERT INTO clients (name, surname, phone_number, balance, renting_status) VALUES (?, ?, ?, ?, ?)" ;

        try (Connection conn = PostgresDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Заполнение
            stmt.setString(1, client.getName());
            stmt.setString(2, client.getSurname());
            stmt.setString(3, client.getNumber());
            stmt.setInt(4, client.getBalance());
            stmt.setBoolean(5, client.getRentingStatusClient());
            // Отправка
            stmt.executeUpdate();
            System.out.println("Client added to Database!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // READ
    public ArrayList<Client> getAllClients() {
        ArrayList<Client> clients = new ArrayList<>();
        String sql = "SELECT * FROM clients";

        try (Connection conn = PostgresDB.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String surname = rs.getString("surname");
                String phone = rs.getString("phone_number");
                int balance = rs.getInt("balance");

                // создаем объект
                Client c = new Client(id, name, surname, phone, balance);
                clients.add(c);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return clients;
    }

    public ArrayList<Vehicle> getAllVehicles() {
        ArrayList<Vehicle> vehicles = new ArrayList<>();
        String sql = "SELECT * FROM vehicles";

        try (Connection conn = PostgresDB.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String brand = rs.getString("brand");
                String model = rs.getString("model");
                int year = rs.getInt("year");
                int price = rs.getInt("price_per_day");
                boolean status = rs.getBoolean("renting_status");
                String type = rs.getString("type"); // 'CAR' или 'TRUCK'

                Vehicle v = null;

                // выбор класса для машины из бд
                if ("CAR".equalsIgnoreCase(type)) {
                    int seats = rs.getInt("seats");
                    v = new Car(id, brand, model, year, price, seats);
                } else if ("TRUCK".equalsIgnoreCase(type)) {
                    double capacity = rs.getDouble("load_capacity");
                    v = new Truck(id, brand, model, year, price, capacity);
                }

                // Айди и статус
                if (v != null) {
                    v.setId(id);
                    v.setRentingStatus(status);
                    vehicles.add(v);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vehicles;
    }

    // 3. UPDATE
    public void updateClient(int id, String newNumber, int newBalance) {
        String sql = "UPDATE clients SET phone_number = ?, balance = ? WHERE id = ?";

        try (Connection conn = PostgresDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, newNumber);
            stmt.setInt(2, newBalance);
            stmt.setInt(3, id);

            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Client with ID " + id + " updated successfully!");
            } else {
                System.out.println("Client with ID " + id + " not found.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 4. DELETE
    public void deleteClient(int id) {
        String sql = "DELETE FROM clients WHERE id = ?";

        try (Connection conn = PostgresDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);

            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Client with ID " + id + " deleted successfully!");
            } else {
                System.out.println("Client with ID " + id + " not found.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}