"use client";
import { useEffect } from "react"; // 1. Импортируем хук эффекта

export default function LoginModal({ isOpen, onClose }) {

    // Блокировки скролла
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Функция очистки
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <style jsx global>{`
        .modal-glass {
            background: rgba(22, 22, 24, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        }
        .input-glass {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            transition: all 0.3s ease;
        }
        .input-glass:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: #3c83f6;
            outline: none;
            box-shadow: 0 0 0 4px rgba(60, 131, 246, 0.1);
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #1a1a1a inset !important;
            -webkit-text-fill-color: white !important;
        }
      `}</style>

            {/* фон */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* окно */}
                <div className="modal-glass w-full max-w-[420px] rounded-2xl p-8 relative transform scale-100 opacity-100 transition-all z-10">

                    {/* Кнопка закрытия */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all"
                    >
                        <span className="material-icons text-xl block">close</span>
                    </button>

                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-1 mb-4">
                            <span className="text-xl font-black tracking-widest text-white">ARNUR</span>
                            <span className="text-xl font-light tracking-widest text-[#3c83f6]">RENTAL</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Member Sign In</h2>
                        <p className="text-gray-400 text-sm mt-2">Access your premium garage</p>
                    </div>

                    {/* Форма */}
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1" htmlFor="username">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-icons text-gray-500 text-[20px] group-focus-within:text-[#3c83f6] transition-colors">person</span>
                                </div>
                                <input
                                    className="input-glass w-full pl-11 pr-4 py-3.5 rounded-lg text-sm font-medium placeholder-gray-500"
                                    id="username"
                                    placeholder="Enter your username"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 ml-1" htmlFor="password">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-icons text-gray-500 text-[20px] group-focus-within:text-[#3c83f6] transition-colors">lock</span>
                                </div>
                                <input
                                    className="input-glass w-full pl-11 pr-4 py-3.5 rounded-lg text-sm font-medium placeholder-gray-500 tracking-widest"
                                    id="password"
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                        </div>

                        {/* Чекбокс */}
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors">
                                <input
                                    className="rounded border-gray-600 bg-transparent text-[#3c83f6] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                                    type="checkbox"
                                />
                                <span>Remember me</span>
                            </label>
                            <a className="hover:text-[#3c83f6] transition-colors" href="#">Forgot Password?</a>
                        </div>

                        {/* Submit */}
                        <button
                            className="w-full py-3.5 px-4 bg-[#3c83f6] hover:bg-[#2563eb] text-white font-bold rounded-lg shadow-[0_0_20px_rgba(60,131,246,0.3)] hover:shadow-[0_0_30px_rgba(60,131,246,0.5)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                            type="submit"
                        >
                            <span className="text-base">Sign In</span>
                            <span className="material-icons text-sm">login</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account? <a className="text-[#3c83f6] font-semibold hover:underline" href="#">Create one!</a>
                    </div>
                </div>
            </div>
        </>
    );
}