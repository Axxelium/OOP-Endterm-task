package com.arnurproject.rental.models;
import com.arnurproject.rental.models.Vehicle;
import com.arnurproject.rental.models.Client;

public class RentalService {
    private String companyName;
    private Vehicle[] availableCars;
    private double totalRevenue;

    // Конструктор
    public RentalService(String companyName, Vehicle[] cars) {
        this.companyName = companyName;
        this.availableCars = cars;
        this.totalRevenue = 0;
    }

    // сортировка
    public void sortByPrice() {
        int n = availableCars.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (availableCars[j].getPricePerDay() > availableCars[j + 1].getPricePerDay()) {
                    Vehicle temp = availableCars[j];
                    availableCars[j] = availableCars[j + 1];
                    availableCars[j + 1] = temp;
                }
            }
        }
        System.out.println("--- Vehicles sorted by price (Low to High) ---");

        // ДОБАВЛЯЕМ ЭТУ СТРОКУ, чтобы сразу увидеть результат
        showAvailableCars();
    }

    // Фильтрация
    public void searchByMaxPrice(int maxPrice) {
        System.out.println("--- Search Results (Cheaper than " + maxPrice + ") ---");
        boolean found = false;
        for (Vehicle v : availableCars) {
            if (v.getPricePerDay() <= maxPrice) {
                System.out.println(v.toString()); // Тут работает полиморфизм!
                found = true;
            }
        }
        if (!found) {
            System.out.println("No vehicles found in this price range.");
        }
    }

    // список доступных машин
    public void showAvailableCars() {
        System.out.println("=== " + companyName + " Garage ===");
        // Используем обычный for, чтобы был доступ к индексу 'i'
        for (int i = 0; i < availableCars.length; i++) {
            if (!availableCars[i].getRentingStatus()) {
                // Добавляем (i) перед машиной
                System.out.println( (i + 1) + ". " + availableCars[i].toString());
            } else {
                System.out.println(i + ". [Rented] " + availableCars[i].getBrand());
            }
        }
    }
}