import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen pt-16"> {/* Что бы не мешал нав панели */}
            <Navbar />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                            New arrivals in our fleet. <Link href="/store" className="font-semibold text-blue-400"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></Link>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-2xl">
                        Drive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Future</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Премиальный сервис аренды автомобилей. Почувствуйте комфорт W140 в цифровом мире.
                        Ваш идеальный автомобиль уже ждет вас.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/store" className="glass-panel px-8 py-4 rounded-lg text-lg font-semibold text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition transform">
                            Choose Vehicle
                        </Link>
                        <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-blue-400 transition">
                            Learn more <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>

                {/* Декоративные пятна на фоне (Glow effect) */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>
            </div>
        </main>
    );
}