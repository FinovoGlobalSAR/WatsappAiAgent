import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Zap, Headphones, Car, Compass } from 'lucide-react';
import heroBg from '../assets/login1.png';

export default function Login2() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset password code logic goes here
        navigate('/login1');
    };

    return (
        <div className="min-h-screen w-full flex bg-slate-50 font-sans overflow-x-hidden">

            {/* 1. LEFT SIDE: HERO SECTION */}
            <div className="flex w-full lg:w-[55%] relative bg-[#1A0322] text-white p-10 lg:p-12 flex-col justify-between rounded-r-[60px] z-10 overflow-hidden shadow-2xl">

                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-normal"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0322]/90 via-transparent to-[#1A0322]/40" />

                {/* Top Logo */}
                <div className="relative z-20 flex items-center gap-3">
                    <div className="bg-purple-600/40 p-2 rounded-xl backdrop-blur-md border border-purple-400/30">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-wide text-white">Finovo</span>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 max-w-lg space-y-4 my-auto pt-10 pb-6">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-purple-200 font-semibold">
                        CARS • TRIPS • EXPERIENCES
                    </p>
                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
                        Travel <br />
                        <span className="text-purple-300">beyond the</span> <br />
                        ordinary.
                    </h1>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal max-w-sm pt-2">
                        From city drives to weekend escapes, Finovo gets you there.
                    </p>
                </div>

                {/* Feature Icons & Bottom Text */}
                <div className="relative z-20 space-y-8">
                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/20">
                        <div className="space-y-1">
                            <div className="bg-white/10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 backdrop-blur-md">
                                <Compass className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-xs font-bold text-white">Explore More</p>
                            <p className="text-[10px] text-slate-300 leading-tight">Top destinations, curated for you</p>
                        </div>

                        <div className="space-y-1">
                            <div className="bg-white/10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 backdrop-blur-md">
                                <Zap className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-xs font-bold text-white">Exclusive Deals</p>
                            <p className="text-[10px] text-slate-300 leading-tight">Great rides. Greater journeys.</p>
                        </div>

                        <div className="space-y-1">
                            <div className="bg-white/10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 backdrop-blur-md">
                                <Headphones className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-xs font-bold text-white">A Smoother You</p>
                            <p className="text-[10px] text-slate-300 leading-tight">Reliable, safe and always on the move</p>
                        </div>
                    </div>

                    <div className="font-serif italic text-2xl text-purple-200 tracking-wide">
                        Good Rides Brighter Days
                    </div>
                </div>
            </div>

            {/* 2. RIGHT SIDE: FORGOT PASSWORD FORM */}
            <div className="flex-1 flex flex-col justify-between p-8 lg:p-14 bg-white overflow-y-auto">

                {/* Spacer for top alignment */}
                <div />

                {/* Form Box */}
                <div className="max-w-md w-full mx-auto my-auto space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Forgot Password
                        </h2>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                            Type your authorised email address to receive reset password link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-2">

                        {/* Floating Label Email Input */}
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-slate-400 z-10">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    defaultValue="Robin@gmail.com"
                                    placeholder="Enter Email"
                                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3.5 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3.5 rounded-xl text-xs shadow-md transition duration-200 cursor-pointer"
                        >
                            Reset Password Code
                        </button>
                    </form>
                </div>

                {/* Spacer for bottom alignment */}
                <div />
            </div>

        </div>
    );
}