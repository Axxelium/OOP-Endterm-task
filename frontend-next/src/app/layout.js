import "./globals.css";
import { Inter } from "next/font/google";

// Загружаем шрифт и привязываем его к переменной --font-display
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-display", // Важно для Tailwind v4
});

export const metadata = {
    title: "ArnurRental - Premium Luxury Car Rental",
    description: "Experience the timeless elegance of the W140 era.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable}>
        <head>
            {/* Иконки Google */}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        </head>
        <body className="font-display antialiased overflow-x-hidden selection:bg-primary selection:text-white">
        {children}
        </body>
        </html>
    );
}