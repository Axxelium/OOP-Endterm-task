package com.arnurproject.rental.models;
import java.util.Objects;

public abstract class Vehicle {
    private int id;
    private String brand;
    private String model;
    private int year;
    private int pricePerDay;
    private boolean rentingStatus;

    // Конструктор
    public Vehicle(int id,String brand, String model, int year, int pricePerDay) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.rentingStatus = false;
    }

    // Сеттеры
    public void setId(int id) {
        this.id = id;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
    public void setModel(String model) { this.model = model; }
    public void setYear(int year) { this.year = year; }
    public void setPricePerDay(int pricePerDay) { this.pricePerDay = pricePerDay; }
    public void setRentingStatus(boolean rentingStatus) { this.rentingStatus = rentingStatus; }

    // Геттеры
    public int getId() { return id; }
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public int getPricePerDay() { return pricePerDay; }
    public boolean getRentingStatus() { return rentingStatus; }

    // Вывод информации
    @Override
    public String toString() {
        return "Brand: " + brand + ", Model: " + model + ", Price: " + pricePerDay;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return year == vehicle.year &&
                Objects.equals(brand, vehicle.brand) &&
                Objects.equals(model, vehicle.model);
    }

    @Override
    public int hashCode() {
        return Objects.hash(brand, model, year);
    }
}
