"use client";
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold tracking-wider text-white">
                            ARNUR<span className="text-blue-500">RENTAL</span>
                        </Link>
                    </div>

                    {/* Ссылки */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition">
                                Home
                            </Link>
                            <Link href="/store" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition">
                                Fleet (Store)
                            </Link>
                            <Link href="/profile" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition">
                                Profile
                            </Link>
                            {/* Кнопка войти */}
                            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-lg shadow-blue-500/30">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}