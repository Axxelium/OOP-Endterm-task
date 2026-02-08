"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Store() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState(null); // Для раскрытой карточки

    // Загружаем данные с Java-бэкенда
    useEffect(() => {
        fetch("http://localhost:8080/api/vehicles")
            .then((res) => res.json())
            .then((data) => {
                setVehicles(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Premium Fleet
                </h1>
                <p className="text-gray-400 mb-12 text-lg">
                    Choose your vehicle. Experience the excellence.
                </p>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehicles.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                onClick={() => setSelectedVehicle(vehicle)}
                                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                            >
                                {/* Статус (Доступно/Занято) */}
                                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                      vehicle.rentingStatus
                          ? "border-red-500/30 text-red-400 bg-red-500/10"
                          : "border-green-500/30 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                  }`}>
                    {vehicle.rentingStatus ? "Rented" : "Available"}
                  </span>
                                </div>

                                {/* Название */}
                                <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                    {vehicle.brand} {vehicle.model}
                                </h2>
                                <p className="text-gray-500 text-sm mb-6">{vehicle.year}</p>

                                {/* Цена */}
                                <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Daily Rate</p>
                                        <p className="text-xl font-bold text-white">
                                            {vehicle.pricePerDay.toLocaleString()} <span className="text-sm text-blue-500">KZT</span>
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                        <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* МОДАЛЬНОЕ ОКНО (POPUP) - Раскрытая карточка */}
            {selectedVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Темный фон с размытием */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedVehicle(null)}
                    ></div>

                    {/* Карточка */}
                    <div className="relative bg-[#111] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-blue-900/20 transform transition-all scale-100">

                        {/* Заголовок модалки */}
                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 border-b border-white/5">
                            <h2 className="text-3xl font-bold text-white">
                                {selectedVehicle.brand} {selectedVehicle.model}
                            </h2>
                            <p className="text-blue-400 mt-1">{selectedVehicle.year} Edition</p>
                        </div>

                        {/* Контент модалки */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <InfoRow label="Price per Day" value={`${selectedVehicle.pricePerDay} KZT`} highlight />
                                <InfoRow label="Status" value={selectedVehicle.rentingStatus ? "Busy" : "Ready to Drive"} />
                                <InfoRow label="Vehicle ID" value={`#${selectedVehicle.id}`} />
                            </div>

                            <div className="space-y-4">
                                {/* Проверка типа (Сиденья или Грузоподъемность) */}
                                {selectedVehicle.seats > 0 ? (
                                    <InfoRow label="Passenger Seats" value={selectedVehicle.seats} />
                                ) : (
                                    <InfoRow label="Load Capacity" value={`${selectedVehicle.loadCapacity} kg`} />
                                )}
                                <InfoRow label="Category" value={selectedVehicle.seats > 0 ? "Passenger Car" : "Heavy Truck"} />
                            </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="p-6 bg-white/5 flex gap-4 justify-end border-t border-white/5">
                            <button
                                onClick={() => setSelectedVehicle(null)}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition"
                            >
                                Close
                            </button>
                            <button
                                disabled={selectedVehicle.rentingStatus}
                                className={`px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition transform hover:scale-105
                  ${selectedVehicle.rentingStatus
                                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                                    : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25"}`}
                                onClick={() => alert("Rental logic coming soon!")}
                            >
                                {selectedVehicle.rentingStatus ? "Unavailable" : "Rent Vehicle"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Маленький компонент для строк информации
function InfoRow({ label, value, highlight }) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-gray-500 text-sm uppercase tracking-wider">{label}</span>
            <span className={`font-medium ${highlight ? "text-blue-400 text-lg" : "text-gray-200"}`}>
        {value}
      </span>
        </div>
    );
}