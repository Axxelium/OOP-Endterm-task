package com.arnurproject.rental.models;
    
public class Client {
    private int id;
    private String username;
    private String password;
    private String role;

    private String name;
    private String surname;
    private String number;
    private boolean rentingStatus;
    private int balance;

    // Конструкторы
    public Client(int id, String username, String password, String role, String name, String surname, String number, int balance) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.name = name;
        this.surname = surname;
        this.number = number;
        this.balance = balance;
        this.rentingStatus = false;
    }
    public Client(String username, String password, String name, String surname, String number, int balance) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.number = number;
        this.balance = balance;
        this.rentingStatus = false;
        this.id = 0; // Пока что 0, база потому сама даст айди
    }


    // Сеттеры
    public void setId(int id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setName(String name) {
        this.name = name;
    }
    public void setSurname(String surname) {
        this.surname = surname;
    }
    public void setNumber(String number) {
        this.number = number;
    }
    public void setStatusClient(boolean rentingStatus) {
        this.rentingStatus = rentingStatus;
    }
    public void setBalance(int balance) {
        this.balance = balance;
    }

    // Геттеры
    public int getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public String getName() { return name; }
    public String getSurname() { return surname; }
    public String getNumber() { return number; }
    public boolean getRentingStatusClient() { return rentingStatus; }
    public int getBalance() { return balance; }

    // Вывод информации
    public void printInfoClient() {
        System.out.println("---------------------------");
        System.out.println("ID number: " + id);
        System.out.println("Client name: " + name + " " + surname);
        System.out.println("Client number: " + number);
        System.out.println("Renting status: " + rentingStatus);
        System.out.println("Balance: " + balance);
        System.out.println("---------------------------");
    }
}
