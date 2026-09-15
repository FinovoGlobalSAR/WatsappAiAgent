import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, EyeOff, Zap, Headphones, Car, ArrowRight } from 'lucide-react';
import heroBg from '../assets/main-hero-car.png';

export default function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen w-full flex bg-slate-100 font-sans overflow-x-hidden">

            {/* 1. LEFT SIDE: HERO SECTION */}
            <div className="hidden lg:flex w-[52%] relative bg-[#1A0322] text-white p-12 flex-col justify-between rounded-r-[50px] z-10 overflow-hidden shadow-2xl">

                {/* Hero Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(${heroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0322] via-[#1A0322]/40 to-transparent" />

                {/* Top Logo */}
                <div className="relative z-20 flex items-center gap-3">
                    <div className="bg-purple-600/40 p-2 rounded-xl backdrop-blur-md border border-purple-400/30">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-wide text-white">Finovo</span>
                </div>

                {/* Hero Headline Text */}
                <div className="relative z-20 max-w-lg space-y-4 my-auto">
                    <p className="text-xs uppercase tracking-[0.25em] text-purple-300 font-bold">
                        CARS • TRIPS • EXPERIENCES
                    </p>
                    <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight text-white">
                        Every ride you need, <br />
                        <span className="text-purple-300">ready to go.</span>
                    </h1>
                    <p className="text-sm text-slate-200 leading-relaxed font-normal max-w-md">
                        Book cars easily for daily travel, business trips, and weekend getaways — all in one place.
                    </p>
                </div>

                {/* Feature Highlights & Footer Tagline */}
                <div className="relative z-20 space-y-8">
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                        <div className="space-y-1">
                            <div className="bg-white/10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 backdrop-blur-md">
                                <Car className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-xs font-semibold text-white">Wide Selection</p>
                            <p className="text-[10px] text-slate-300">Cars for every need</p>
                        </div>

                        <div className="space-y-1">
                            <div className="bg-white/10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 backdrop-blur-md">
                                <Zap className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-xs font-semibold text-white">Easy Booking</p>
                            <p className="text-[10px] text-slate-300">Fast & hassle-free</p>
                        </div>

                        <div className="space-y-1">
                            <div className="bg-white/10 w-9 h-9 rounded-xl flex items-center justify-center mb-2 backdrop-blur-md">
                                <Headphones className="w-4 h-4 text-purple-300" />
                            </div>
                            <p className="text-xs font-semibold text-white">24/7 Support</p>
                            <p className="text-[10px] text-slate-300">Help whenever you need</p>
                        </div>
                    </div>

                    <div className="font-serif italic text-xl text-purple-200">
                        Drive More Possibilities
                    </div>
                </div>
            </div>

            {/* 2. RIGHT SIDE: AUTHENTICATION FORM */}
            <div className="flex-1 flex flex-col justify-between p-8 lg:p-14 bg-white overflow-y-auto">

                {/* Toggle Sign Up / Sign In Switcher */}
                <div className="text-right text-xs text-slate-500 font-medium">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-purple-700 font-bold hover:underline inline-flex items-center gap-1 ml-1"
                    >
                        {isLogin ? "Sign up!" : "Sign in!"} <ArrowRight className="w-3 h-3" />
                    </button>
                </div>

                {/* Main Form Box */}
                <div className="max-w-md w-full mx-auto my-auto space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {isLogin ? "Welcome Back!" : "Create Your Account"}
                        </h2>
                        <p className="text-xs text-slate-400">
                            {isLogin ? "Enter your credentials to continue" : "Getting started is easy"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name Field (Sign Up Only) */}
                        {!isLogin && (
                            <div className="relative">
                                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-slate-500 z-10">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Robin"
                                        className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="relative">
                            {!isLogin && (
                                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-slate-500 z-10">
                                    Email
                                </label>
                            )}
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter Email"
                                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            {!isLogin && (
                                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-slate-500 z-10">
                                    Password
                                </label>
                            )}
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Password"
                                    className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                                />
                                <EyeOff className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer" />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        {!isLogin && (
                            <div className="relative">
                                <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-semibold text-slate-500 z-10">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Confirm Password"
                                        className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-800 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
                                    />
                                    <EyeOff className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer" />
                                </div>
                            </div>
                        )}

                        {/* Checkbox */}
                        {!isLogin && (
                            <div className="flex items-center gap-2 text-[11px] text-slate-600 pt-1">
                                <input
                                    type="checkbox"
                                    required
                                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span>
                                    I agree to the <a href="#" className="text-purple-700 font-bold hover:underline">Terms & Conditions</a> and <a href="#" className="text-purple-700 font-bold hover:underline">Privacy Policy</a>
                                </span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3.5 rounded-xl text-xs shadow-md transition duration-200 mt-2 cursor-pointer"
                        >
                            {isLogin ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    {/* Social Auth Dividers */}
                    <div className="space-y-4 pt-2">
                        <div className="relative flex py-1 items-center">
                            <div className="flex-grow border-t border-slate-200" />
                            <span className="flex-shrink mx-4 text-[11px] text-slate-400 font-medium">or continue with</span>
                            <div className="flex-grow border-t border-slate-200" />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs text-slate-700 font-semibold transition">
                                <span className="font-bold text-red-500 text-sm">G</span> Google
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs text-slate-700 font-semibold transition">
                                <span className="font-bold text-slate-900 text-sm"></span> Apple
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs text-slate-700 font-semibold transition">
                                <span className="font-bold text-blue-600 text-sm">f</span> Facebook
                            </button>
                        </div>
                    </div>

                </div>

                <div />
            </div>

        </div>
    );
}