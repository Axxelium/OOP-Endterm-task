"use client";
import { useState, useEffect } from "react";

export default function Home() {
  // хранение списка машин
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // запрос на сервер
    fetch("http://localhost:8080/api/vehicles")
        .then((res) => res.json()) // JSON ответ
        .then((data) => {
          setVehicles(data); // сейв машин в переменную
          setLoading(false); // Индикатор загрузки убираем
        })
        .catch((err) => {
          console.error("Ошибка:", err);
          setLoading(false);
        });
  }, []);

  return (
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">🚗 Arnur Rental Service</h1>
          <p className="text-gray-600 mt-2">Best cars and trucks in Astana</p>
        </header>

        {loading ? (
            <p className="text-center text-xl">Загрузка данных...</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Пробегаемся по списку машин и рисуем карточку для каждой */}
              {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {vehicle.brand} {vehicle.model}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                  ${vehicle.rentingStatus ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {vehicle.rentingStatus ? "Rented" : "Available"}
                </span>
                    </div>

                    <div className="space-y-2 text-gray-600">
                      <p>📅 Year: <span className="font-medium text-black">{vehicle.year}</span></p>
                      <p>💰 Price: <span className="font-medium text-blue-600">{vehicle.pricePerDay} KZT/day</span></p>

                      {/* Условный рендеринг: показываем места или грузоподъемность */}
                      {vehicle.seats > 0 ? (
                          <p>💺 Seats: {vehicle.seats}</p>
                      ) : (
                          <p>📦 Load: {vehicle.loadCapacity} kg</p>
                      )}
                    </div>

                    <button
                        className={`mt-6 w-full py-2 rounded-lg font-bold text-white transition
                ${vehicle.rentingStatus
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                        disabled={vehicle.rentingStatus}
                        onClick={() => alert(`You selected: ${vehicle.brand} ${vehicle.model}`)}
                    >
                      {vehicle.rentingStatus ? "Already Rented" : "Rent Now"}
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}