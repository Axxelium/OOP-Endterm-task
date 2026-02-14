import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-background-dark text-white font-display overflow-x-hidden">
            {/* Noise Texture Overlay */}
            <div className="noise-overlay"></div>

            {/* Background Gradient Mesh */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-mesh-gradient"></div>

            <Navbar />

            <div className="relative z-10 flex flex-col items-center justify-center pt-20">

                {/* Hero Section */}
                <div className="container mx-auto px-4 flex flex-col items-center text-center relative mt-12 md:mt-20 mb-32">

                    {/* Typography */}
                    <div className="relative z-20 max-w-4xl mx-auto space-y-6">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight text-gradient-glossy drop-shadow-2xl">
                            COMMAND <br className="md:hidden" /> THE ROAD
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto tracking-wide">
                            Experience the timeless elegance of the W140 era. <br className="hidden md:block" /> Unmatched luxury, redefined for the modern driver.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 mt-10 relative z-30">
                        <Link href="/store" className="px-8 py-4 rounded bg-primary text-white font-semibold tracking-wide shadow-neon hover:shadow-neon-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                            <span>Choose Vehicle</span>
                            <span className="material-icons text-sm">arrow_forward</span>
                        </Link>
                        <button className="px-8 py-4 rounded border border-glass-border bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                            About Us
                        </button>
                    </div>

                    {/* Car Visual Container */}
                    <div className="relative w-full max-w-5xl mx-auto mt-12 md:-mt-12 pointer-events-none select-none">
                        {/* Headlight Glow Effects */}
                        <div className="absolute top-[45%] left-[25%] w-32 h-32 headlight-glow mix-blend-screen z-20"></div>
                        <div className="absolute top-[45%] right-[25%] w-32 h-32 headlight-glow mix-blend-screen z-20"></div>

                        {/* Vehicle Image */}
                        <div className="relative z-10 animate-float">
                            {/* ЗАМЕНИ SRC НА СВОЮ КАРТИНКУ ПОЗЖЕ */}
                            <img
                                src="/img/w140_front_view.jpg"
                                alt="Mercedes W140 Luxury"
                                className="w-full h-auto object-cover"
                                style={{
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                                    maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
                                }}
                            />
                        </div>

                        {/* Floor Shadow/Reflection */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-primary/20 blur-[60px] rounded-full z-0"></div>
                    </div>

                    {/* Floating Feature Strip */}
                    <div className="glass-panel rounded-xl px-8 py-6 w-full max-w-4xl mx-auto -mt-24 relative z-40 shadow-2xl backdrop-blur-xl border-t border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                            <FeatureItem icon="support_agent" title="24/7 Concierge" desc="Always here for you" />
                            <FeatureItem icon="verified_user" title="Premium Insurance" desc="Full coverage included" />
                            <FeatureItem icon="currency_bitcoin" title="Crypto Accepted" desc="Bitcoin, ETH & USDT" />
                        </div>
                    </div>
                </div>

                {/* Detailed Features Section */}
                <section className="w-full relative z-10 py-24 border-t border-white/5 bg-background-dark/50 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    Engineering Meets <br />
                                    <span className="text-primary">Uncompromising Luxury</span>
                                </h2>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    Every vehicle in our fleet is meticulously maintained to showroom standards. The W140 series represents the pinnacle of over-engineering.
                                </p>
                                <ul className="space-y-4 mt-6">
                                    <ListItem text="Double-pane soundproof glazing" />
                                    <ListItem text="Soft-close doors & hydraulic suspension" />
                                    <ListItem text="V12 Engine configurations available" />
                                </ul>
                            </div>

                            <div className="relative h-[400px] rounded-xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80 z-10"></div>
                                {/* Вторая картинка - салон */}
                                <img
                                    src="https://www.topgear.com/sites/default/files/2022/08/Mercedes-Benz-S-Class-W140-5.jpg"
                                    alt="Interior"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">Interior</span>
                                    <h3 className="text-xl font-medium text-white">First Class Comfort</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full relative z-10 border-t border-white/5 py-12 bg-background-dark">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-1">
                            <span className="text-xl font-black tracking-widest text-white">ARNUR</span>
                            <span className="text-xl font-light tracking-widest text-primary">RENTAL</span>
                        </div>
                        <div className="text-slate-500 text-sm">
                            © 2026 ArnurRental Inc. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}

// Вспомогательные компоненты для чистоты кода
function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex items-center gap-4 justify-center md:justify-start pt-4 md:pt-0 first:pt-0 md:pl-8 first:pl-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                <span className="material-icons text-xl">{icon}</span>
            </div>
            <div className="text-left">
                <h3 className="text-white font-medium text-sm">{title}</h3>
                <p className="text-slate-500 text-xs">{desc}</p>
            </div>
        </div>
    );
}

function ListItem({ text }) {
    return (
        <li className="flex items-center gap-3 text-slate-300">
            <span className="material-icons text-primary text-sm">check_circle</span>
            <span>{text}</span>
        </li>
    );
}