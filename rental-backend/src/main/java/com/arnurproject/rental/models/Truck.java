package com.arnurproject.rental.models;

public class Truck extends Vehicle {
    private double loadCapacity;
    // конструктоо
    public Truck(int id, String brand, String model, int year, int pricePerDay, double liftingcapacity) {
        super(id, brand, model, year, pricePerDay);
        this.loadCapacity = liftingcapacity;
    }
    // геттер
    public double getLoadCapacity() {
        return loadCapacity;
    }
    // сеттер
    public void setLoadCapacity(double loadCapacity) {
        this.loadCapacity = loadCapacity;
    }

    @Override
    public String toString()
    {
        return super.toString() + ", Lifting capacity: " + loadCapacity;
    }
}