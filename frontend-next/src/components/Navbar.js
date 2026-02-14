"use client";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "@/components/LoginModal"; // <--- Импорт

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // Для мобильного меню
    const [isLoginOpen, setIsLoginOpen] = useState(false); // <--- Для окна входа

    return (
        <>
            <nav className="fixed top-0 w-full z-40 glass-panel border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1 group">
                        <span className="text-2xl font-black tracking-widest text-white">ARNUR</span>
                        <span className="text-2xl font-light tracking-widest text-primary drop-shadow-[0_0_8px_rgba(60,131,246,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(60,131,246,0.9)] transition-all duration-300">
              RENTAL
            </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/store" className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">
                            Fleet
                        </Link>
                        <Link href="/services" className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">
                            Services
                        </Link>
                        {/* Кнопка Profile теперь тоже может открывать окно, если пользователь не вошел */}
                        <button
                            onClick={() => setIsLoginOpen(true)}
                            className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all"
                        >
                            Profile
                        </button>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* КНОПКА ВХОДА (Человечек) */}
                        <button
                            onClick={() => setIsLoginOpen(true)} // <--- Открываем окно
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-glass-border hover:bg-white/5 transition-colors text-white"
                        >
                            <span className="material-icons text-sm">person</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white"
                        >
                            <span className="material-icons">menu</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden glass-panel border-b border-glass-border p-4 space-y-4">
                        <Link href="/store" className="block text-slate-300">Fleet</Link>
                        <button onClick={() => setIsLoginOpen(true)} className="block text-slate-300 w-full text-left">Sign In</button>
                    </div>
                )}
            </nav>

            {/* Вставляем компонент Модального окна сюда */}
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    );
}