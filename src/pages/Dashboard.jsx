import React from 'react';
import {
    Search, Calendar, MapPin, ChevronRight, Star, ShieldCheck,
    Clock, CheckCircle, ArrowRight, Sun, Globe, User, Car, Check, Music2, Plus, ChevronLeft, Apple, Play
} from 'lucide-react';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
// Images Import
import heroCar from '../assets/main-hero-car.png';
import heroCar1 from '../assets/main-hero-car1.png';

import catMercedes from '../assets/cat-mercedes.png';
import catAudi from '../assets/cat-audi.png';
import catBmw from '../assets/cat-bmw.png';
import catPorsche from '../assets/cat-porsche.png';

import type1 from '../assets/type-fortuner.png';
import type2 from '../assets/type-sedan-red.png';
import type3 from '../assets/type-corolla.png';
import type4 from '../assets/type-suv-blue.png';

import choose1 from '../assets/choose-silver-car.png';
import choose2 from '../assets/choose-top-car.png';
import choose3 from '../assets/choose-red-car.png';

import step1 from '../assets/step-search.png';
import step2 from '../assets/step-choose.png';
import step3 from '../assets/step-drive.png';

import appMockup from '../assets/mobile-mockup.png';

import dashpic1 from '../assets/dashpic1.png';
import dashpic2 from '../assets/dashpic2.png';
import dashpic3 from '../assets/dashpic3.png';
import dashpic4 from '../assets/dashpic4.png';

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#1F0826] text-white font-sans overflow-x-hidden">

            {/* --- NAVBAR --- */}
            <nav className="flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                        <Car className="w-5 h-5 text-[#4A0E5C]" />
                    </div>
                    <span className="text-xl font-bold">Finovo</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm text-slate-200 font-medium">
                    <a href="#" className="text-white">Home</a>
                    <a href="#" className="hover:text-purple-300">Cars</a>
                    <a href="#" className="hover:text-purple-300">Insurance</a>
                    <a href="#" className="hover:text-purple-300">About Us</a>
                    <a href="#" className="hover:text-purple-300">AI-Inspection</a>
                    <a href="#" className="hover:text-purple-300">Contact</a>
                </div>

                <div className="flex items-center gap-3 text-xs">
                    {/* Theme toggle */}
                    <div className="bg-white/10 p-1 rounded-full flex items-center w-14 h-7 relative cursor-pointer">
                        <Sun className="w-3.5 h-3.5 text-amber-400 ml-1" />
                        <div className="absolute left-7 top-1 w-5 h-5 rounded-full bg-white shadow" />
                    </div>

                    <div className="flex items-center gap-1 text-slate-200 bg-white/5 px-3 py-1.5 rounded-full">
                        <Globe className="w-3.5 h-3.5" />
                        <span>EN</span>
                        <ChevronRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/20">
                        <User className="w-3.5 h-3.5" />
                        <span>Login / My Booking</span>
                    </div>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-6 space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] text-white">
                        Find your <br />
                        Perfect Ride
                    </h1>
                    <p className="text-sm text-slate-300 leading-relaxed max-w-md">
                        Compare cars from trusted local showrooms, book in minutes, and hit the road with transparent pricing — no surprises at pickup.
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-amber-400">★★★★★</span>
                        <span className="text-white font-semibold">4.8 / 5</span>
                        <span className="text-slate-400">· 2,300+ reviews</span>
                    </div>

                    {/* SEARCH BOX */}
                    <div className="bg-[#3A0E45] p-6 rounded-3xl border border-white/5 space-y-5 max-w-lg shadow-2xl">
                        {/* Tabs */}
                        <div className="flex gap-2">
                            <button className="flex-1 text-xs font-semibold py-2.5 rounded-xl text-slate-300 hover:text-white">Daily</button>
                            <button className="flex-1 text-xs font-semibold py-2.5 rounded-xl bg-white text-slate-900">Weekly</button>
                            <button className="flex-1 text-xs font-semibold py-2.5 rounded-xl text-slate-300 hover:text-white">Monthly</button>
                        </div>

                        {/* Pick-up */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-white">Pick-up</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[10px] text-slate-400 mb-1">Pick-up location</p>
                                    <div className="bg-white p-2.5 rounded-xl flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <select className="bg-transparent text-xs w-full outline-none font-medium text-slate-800">
                                            <option>Select city</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 mb-1">Pick-up Date & time</p>
                                    <div className="bg-white p-2.5 rounded-xl flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <input type="text" placeholder="Select Date & Time" className="bg-transparent text-xs w-full outline-none font-medium text-slate-800" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Drop-off */}
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-white">Drop-off</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-[10px] text-slate-400 mb-1">Drop-off location</p>
                                    <div className="bg-white p-2.5 rounded-xl flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <select className="bg-transparent text-xs w-full outline-none font-medium text-slate-800">
                                            <option>Select city</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 mb-1">Drop-off Date & time</p>
                                    <div className="bg-white p-2.5 rounded-xl flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <input type="text" placeholder="Select Date & Time" className="bg-transparent text-xs w-full outline-none font-medium text-slate-800" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional stop */}
                        <div className="bg-white/10 p-3 rounded-xl flex justify-between items-center text-xs text-slate-200 border border-white/5">
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded bg-white/20 flex items-center justify-center">
                                    <Plus className="w-3 h-3" />
                                </span>
                                Add additional stop
                            </span>
                            <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>

                        {/* Features */}
                        <div className="flex items-center justify-between text-[10px] text-slate-200 pt-1">
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[7px]">✓</span>
                                Free cancellation
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-white/30 flex items-center justify-center text-[7px]">✓</span>
                                No hidden charges
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded bg-blue-500 flex items-center justify-center text-[7px]">✓</span>
                                24/7 support
                            </span>
                        </div>

                        <button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3.5 rounded-xl text-sm transition">
                            Search Cars
                        </button>
                    </div>
                </div>

                {/* Hero image */}
                <div className="lg:col-span-6 relative">
                    <div className="rounded-[36px] overflow-hidden border-[10px] border-[#3A0E45]/60 shadow-2xl">
                        <img src={heroCar1} alt="Main Hero Car" className="w-full h-[520px] object-cover" />
                    </div>
                </div>
            </section>

            {/* --- CAR CATEGORY SECTION --- */}
            <section className="bg-white text-slate-900 py-16 px-6 md:px-10">
                <div className="max-w-7xl mx-auto space-y-8">
                    <h2 className="text-4xl font-extrabold tracking-tight text-[#2D0A3A]">Car Category</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: "Mercedes-Benz", img: catMercedes },
                            { title: "Audi", img: catAudi },
                            { title: "BMW", img: catBmw },
                            { title: "Porsche", img: catPorsche },
                        ].map((cat, i) => (
                            <div key={i} className="relative rounded-3xl overflow-hidden group h-80 border-2 border-[#2D0A3A]/20">
                                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
                                <div className="absolute top-5 left-5 text-white text-2xl font-bold max-w-[60%] leading-tight">
                                    {cat.title}
                                </div>
                                <div className="absolute bottom-5 right-5 bg-[#2D0A3A] text-white w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-800 transition">
                                    <ArrowRight className="w-5 h-5 -rotate-45" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BROWSE BY CAR TYPE --- */}
            <section className="bg-[#21002B] py-16 px-6 md:px-10 text-white">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-4xl font-extrabold text-slate-300">Browse by Car Type</h2>
                        <a href="#" className="text-xs text-white hover:underline flex items-center gap-2">
                            View All Cars
                            <span className="w-5 h-5 rounded-full bg-white text-[#21002B] flex items-center justify-center text-[10px]">→</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[type1, type2, type3, type4].map((carImg, idx) => (
                            <div key={idx} className="space-y-4">
                                <img src={carImg} alt="Car Type" className="h-32 mx-auto object-contain drop-shadow-xl" />
                                <div className="text-center">
                                    <h3 className="text-base font-bold text-white">Mercedes-AMG GT R</h3>
                                    <p className="text-[10px] text-slate-400 tracking-wider">CABRIOLET</p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-200">
                                    <span className="border border-white/20 p-2 rounded-lg text-center">⚙ Automatic</span>
                                    <span className="border border-white/20 p-2 rounded-lg text-center">⛽ Petrol</span>
                                    <span className="border border-white/20 p-2 rounded-lg text-center">🏎 163 HP</span>
                                    <span className="border border-white/20 p-2 rounded-lg text-center">🛞 2WD</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-amber-400 text-sm">★★★★★</span>
                                    <span className="text-lg font-bold">
                                        $789 <span className="text-[10px] text-slate-400 font-normal">/ day</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE US --- */}
            <section className="bg-slate-50 text-slate-900 py-16 px-6 md:px-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <h2 className="text-4xl font-extrabold text-[#2D0A3A]">Why Choose Us</h2>
                        <p className="text-sm text-slate-600 border-l-4 border-[#2D0A3A] pl-4 max-w-md">
                            Enjoy a seamless rental experience with insured cars, transparent pricing, and support whenever you need it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="bg-gradient-to-br from-[#3A0E45] to-[#5B2266] text-white p-8 rounded-3xl relative overflow-hidden h-72 flex flex-col justify-between">
                            <div className="space-y-2 max-w-xs z-10">
                                <h3 className="text-2xl font-bold">Find cars near you instantly.</h3>
                                <p className="text-xs text-slate-300">Browse available vehicles by city, date, and budget in just a few taps.</p>
                            </div>
                            {/* Avatars */}
                            <div className="absolute left-6 top-40 flex items-center gap-2 bg-white/10 backdrop-blur px-2 py-1 rounded-full w-fit">
                                <i
                                    mg src="https://i.pravatar.cc/40?img=1" className="w-6 h-6 rounded-full" />
                                <div>
                                    <p className="text-[9px] font-semibold">Zion Lark</p>
                                    <p className="text-[8px] text-amber-400">★ 55m Away</p>
                                </div>
                            </div>
                            <div className="absolute left-36 top-52 flex items-center gap-2 bg-white/10 backdrop-blur px-2 py-1 rounded-full w-fit">
                                <img src="https://i.pravatar.cc/40?img=5" className="w-6 h-6 rounded-full" />
                                <div>
                                    <p className="text-[9px] font-semibold">Larkin</p>
                                    <p className="text-[8px] text-amber-400">★ 55m Away</p>
                                </div>
                            </div>
                            <div className="absolute left-6 bottom-6 flex items-center gap-2 bg-white/10 backdrop-blur px-2 py-1 rounded-full w-fit z-10">
                                <img src="https://i.pravatar.cc/40?img=9" className="w-6 h-6 rounded-full" />
                                <div>
                                    <p className="text-[9px] font-semibold">Remi</p>
                                    <p className="text-[8px] text-amber-400">★ 55m Away</p>
                                </div>
                            </div>
                            <img src={choose1} alt="Car" className="absolute right-0 bottom-0 w-64 object-contain" />
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gradient-to-br from-[#3A0E45] to-[#7A4585] text-white p-8 rounded-3xl relative overflow-hidden h-72 flex flex-col justify-between">
                            <div className="space-y-2 max-w-xs z-10">
                                <h3 className="text-2xl font-bold">Simple plans with no hidden fees.</h3>
                                <p className="text-xs text-slate-300">Choose daily, weekly, or monthly rentals with clear pricing every time.</p>
                            </div>
                            <div className="space-y-3 mt-6">
                                <div className="bg-white text-slate-900 p-4 rounded-2xl flex items-center gap-3 max-w-xs ml-auto">
                                    <div className="w-9 h-9 rounded-full bg-[#2D0A3A] text-white flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">Transparent Pricing</p>
                                        <p className="text-[10px] text-slate-500">What you see is what you pay.</p>
                                    </div>
                                </div>
                                <div className="bg-white text-slate-900 p-4 rounded-2xl flex items-center gap-3 max-w-xs ml-auto">
                                    <div className="w-9 h-9 rounded-full bg-[#2D0A3A] text-white flex items-center justify-center">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">Flexible Plans</p>
                                        <p className="text-[10px] text-slate-500">Daily, weekly or monthly rentals.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gradient-to-br from-[#3A0E45] to-[#7A4585] text-white p-8 rounded-3xl relative overflow-hidden h-72 flex flex-col justify-between">
                            <div className="space-y-2 max-w-xs z-10">
                                <h3 className="text-2xl font-bold">Drive verified, well-maintained cars.</h3>
                                <p className="text-xs text-slate-300">Every vehicle is quality-checked, cleaned, and ready for your trip.</p>
                            </div>
                            <div className="space-y-2 mt-6">
                                <div className="bg-white text-slate-900 px-4 py-2.5 rounded-full flex items-center gap-2 w-fit">
                                    <Check className="w-3 h-3" /> <span className="text-xs font-semibold">Inspected</span>
                                </div>
                                <div className="bg-white text-slate-900 px-4 py-2.5 rounded-full flex items-center gap-2 w-fit">
                                    <Check className="w-3 h-3" /> <span className="text-xs font-semibold">Cleaned</span>
                                </div>
                                <div className="bg-white text-slate-900 px-4 py-2.5 rounded-full flex items-center gap-2 w-fit">
                                    <Check className="w-3 h-3" /> <span className="text-xs font-semibold">Road-ready</span>
                                </div>
                            </div>
                            <img src={choose2} alt="Top Car" className="absolute right-0 bottom-0 w-56 object-contain" />
                        </div>

                        {/* Card 4 */}
                        <div className="bg-gradient-to-br from-[#3A0E45] to-[#7A4585] text-white p-8 rounded-3xl relative overflow-hidden h-72 flex flex-col justify-between">
                            <div className="space-y-2 max-w-xs z-10">
                                <h3 className="text-2xl font-bold">Get support before and during your trip.</h3>
                                <p className="text-xs text-slate-300">Book with confidence and get help anytime with 24/7 customer support.</p>
                            </div>
                            <div className="space-y-2 mt-6 z-10">
                                <div className="bg-white text-slate-900 p-3 rounded-2xl flex items-center gap-3 w-fit">
                                    <div className="w-8 h-8 rounded-full bg-[#2D0A3A] text-white flex items-center justify-center">
                                        <Clock className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold">24/7 Customer Support</p>
                                        <p className="text-[9px] text-slate-500">We're here for you.</p>
                                    </div>
                                </div>
                                <div className="bg-white text-slate-900 p-3 rounded-2xl flex items-center gap-3 w-fit">
                                    <div className="w-8 h-8 rounded-full bg-[#2D0A3A] text-white flex items-center justify-center">
                                        <ShieldCheck className="w-3 h-3" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold">Assistance On The Road</p>
                                        <p className="text-[9px] text-slate-500">Help whenever you need it.</p>
                                    </div>
                                </div>
                            </div>
                            <img src={choose3} alt="Red Car" className="absolute right-0 bottom-0 w-52 object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS --- */}
            <section className="bg-[#E8D5BE] text-slate-900 py-16 px-6 md:px-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <h2 className="text-4xl font-extrabold text-[#2D0A3A]">How It Works</h2>
                        <p className="text-sm text-slate-700 border-l-4 border-[#2D0A3A] pl-4 max-w-md">
                            Find your perfect rental car in just a few simple steps — search, choose, book, and drive with ease.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#F2E3D0] p-8 rounded-3xl text-center space-y-4">
                            <h3 className="text-2xl font-bold text-[#2D0A3A]">Search</h3>
                            <p className="text-xs text-slate-700">Enter your location and rental dates to find available cars.</p>
                            <img src={step1} alt="Search" className="h-40 mx-auto object-contain" />
                        </div>

                        <div className="bg-[#F2E3D0] p-8 rounded-3xl text-center space-y-4">
                            <img src={step2} alt="Choose" className="h-40 mx-auto object-contain" />
                            <h3 className="text-2xl font-bold text-[#2D0A3A]">Choose</h3>
                            <p className="text-xs text-slate-700">Enter your location and rental dates to find available cars.</p>
                        </div>

                        <div className="bg-[#F2E3D0] p-8 rounded-3xl text-center space-y-4">
                            <h3 className="text-2xl font-bold text-[#2D0A3A]">Book & Drive</h3>
                            <p className="text-xs text-slate-700">Confirm your booking, pick up your car, and hit the road.</p>
                            <img src={step3} alt="Book & Drive" className="h-40 mx-auto object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="bg-[#21002B] py-14 px-6 md:px-10 text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="md:border-r border-white/10">
                        <p className="text-sm text-slate-300">Cars in Fleet</p>
                        <p className="text-5xl font-extrabold text-white mt-2">500+</p>
                    </div>
                    <div className="md:border-r border-white/10">
                        <p className="text-sm text-slate-300">Happy Customers</p>
                        <p className="text-5xl font-extrabold text-white mt-2">10K+</p>
                    </div>
                    <div className="md:border-r border-white/10">
                        <p className="text-sm text-slate-300">Locations</p>
                        <p className="text-5xl font-extrabold text-white mt-2">15</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-300">Customer Support</p>
                        <p className="text-5xl font-extrabold text-white mt-2">24/7</p>
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="w-full bg-white py-20 px-4 flex flex-col items-center justify-center font-sans overflow-hidden">

                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16 z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#2a042e] tracking-tight">
                        What Our Customers Say
                    </h2>
                    <p className="text-base md:text-lg text-[#2a042e]/80 font-medium mt-4 leading-relaxed">
                        See why customers trust us for a smooth, reliable,<br className="hidden sm:inline" /> and stress-free rental experience.
                    </p>
                </div>

                {/* Absolute Layout Container - Matches Figma Pixel-Perfect */}
                <div className="relative w-full max-w-5xl h-[460px] mx-auto">

                    {/* Top Left - Ahmed Speech Bubble Card */}
                    <div className="absolute top-0 left-4 sm:left-12 md:left-20 z-20">
                        <div className="relative bg-[#2a042e] text-white rounded-3xl p-5 shadow-2xl w-[360px] sm:w-[400px] flex items-start space-x-4">
                            <img
                                src={dashpic1}
                                alt="Ahmed"
                                className="w-14 h-14 rounded-full object-cover shrink-0"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-sm text-white">Ahmed</h4>
                                    <span className="text-amber-400 text-xs tracking-widest">★★★★★</span>
                                </div>
                                <p className="text-[11px] text-gray-300 leading-snug mt-1 font-normal">
                                    Smooth booking and the car was exactly as shown. Highly recommended! The service was impeccable from start to finish.
                                </p>
                            </div>
                            <span className="text-purple-300/40 text-4xl font-serif leading-none select-none pl-1">
                                ”
                            </span>
                            {/* Pointer / Tail of Speech Bubble */}
                            <div className="absolute -bottom-2 left-8 w-5 h-5 bg-[#2a042e] rotate-45 rounded-sm"></div>
                        </div>
                    </div>

                    {/* Left - Fatima S. (Dubai) */}
                    <div className="absolute top-[210px] left-2 sm:left-8 md:left-12 z-20 flex items-center">
                        {/* Glowing Avatar */}
                        <div className="relative -mr-5 z-30">
                            <div className="w-20 h-20 rounded-full bg-amber-300/60 blur-md absolute inset-0 transform scale-110"></div>
                            <img
                                src={dashpic2}
                                alt="Fatima S."
                                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-white shadow-lg"
                            />
                        </div>

                        {/* Card Body */}
                        <div className="bg-[#2a042e] text-white rounded-xl p-4 pl-8 shadow-xl w-64 border border-purple-900/30">
                            <div className="flex items-center justify-between">
                                <div className="text-[12px] font-bold">
                                    Fatima S. <span className="text-gray-400 font-normal text-[10px]">(Dubai)</span>
                                </div>
                                <span className="text-amber-400 text-[10px]">★★★★★</span>
                            </div>
                            <p className="text-[11px] text-gray-300 mt-2 leading-tight">
                                "24/7 support really helped during our trip. Will rent again! 🔥"
                            </p>
                        </div>
                    </div>

                    {/* Bottom Center - Fatima S. (Saudia) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                        {/* Glowing Avatar */}
                        <div className="relative -mb-5 z-30">
                            <div className="w-20 h-20 rounded-full bg-amber-300/60 blur-md absolute inset-0 transform scale-110"></div>
                            <img
                                src={dashpic3}
                                alt="Fatima S."
                                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-white shadow-lg"
                            />
                        </div>

                        {/* Card Body */}
                        <div className="bg-[#2a042e] text-white rounded-xl p-4 pt-7 shadow-xl w-64 border border-purple-900/30 text-left">
                            <div className="flex items-center justify-between">
                                <div className="text-[12px] font-bold">
                                    Fatima S. <span className="text-gray-400 font-normal text-[10px]">(Saudia)</span>
                                </div>
                                <span className="text-amber-400 text-[10px]">★★★★★</span>
                            </div>
                            <p className="text-[11px] text-gray-300 mt-2 leading-tight">
                                "24/7 support really helped during our trip. Will rent again!"
                            </p>
                        </div>
                    </div>

                    {/* Right - Khalid M. (Dubai) */}
                    <div className="absolute top-[200px] right-2 sm:right-8 md:right-12 z-20 flex flex-col items-end">
                        {/* Glowing Avatar */}
                        <div className="relative -mb-5 -mr-2 z-30">
                            <div className="w-20 h-20 rounded-full bg-amber-300/60 blur-md absolute inset-0 transform scale-110"></div>
                            <img
                                src={dashpic4}
                                alt="Khalid M."
                                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-white shadow-lg"
                            />
                        </div>

                        {/* Card Body */}
                        <div className="bg-[#2a042e] text-white rounded-xl p-4 pt-7 shadow-xl w-64 border border-purple-900/30 text-left">
                            <div className="flex items-center justify-between">
                                <div className="text-[12px] font-bold">
                                    Khalid M.. <span className="text-gray-400 font-normal text-[10px]">(Dubai)</span>
                                </div>
                                <span className="text-amber-400 text-[10px]">★★★★★</span>
                            </div>
                            <p className="text-[11px] text-gray-300 mt-2 leading-tight">
                                "24/7 support really helped during our trip. Will rent again!"
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            {/* --- FAQ SECTION --- */}
            <section className="bg-[#21002B] py-16 px-6 md:px-10 text-white">
                <div className="max-w-7xl mx-auto space-y-8">
                    <h2 className="text-4xl font-extrabold text-slate-200">Frequently Asked Questions</h2>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {/* Left CTA card */}
                        <div className="min-w-[280px] bg-[#D4B896] text-[#2D0A3A] p-6 rounded-3xl flex flex-col justify-between">
                            <p className="text-sm font-semibold">Still have a question?</p>
                            <p className="text-[11px] text-slate-700 my-4">
                                Can't find the answer you're looking for? Our team is here to help. Get in touch and we'll be happy to assist you.
                            </p>
                            <button className="bg-[#2D0A3A] text-white text-xs font-semibold py-2.5 px-6 rounded-full w-fit">
                                Send email
                            </button>
                        </div>

                        {/* FAQ cards (vertical text) */}
                        {[
                            "What documents do I need to rent a car?",
                            "Can I return the car at another location?",
                            "Is a security deposit required?",
                            "What is the minimum age to rent a car?",
                            "What is the cancellation policy?",
                            "Is a security deposit required?",
                            "Is insurance included in the rental?",
                        ].map((q, i) => (
                            <div key={i} className="min-w-[90px] bg-[#F2E3D0] text-[#2D0A3A] rounded-3xl flex items-center justify-center p-4 cursor-pointer hover:bg-white transition">
                                <p className="text-xs font-semibold whitespace-nowrap" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                    {q}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- APP DOWNLOAD SECTION --- */}
            <section className="bg-slate-100 py-20 px-6 md:px-12 flex justify-center items-center">
                <div className="max-w-6xl w-full bg-[#D8BEA3] rounded-[40px] px-8 py-10 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between relative overflow-visible shadow-sm">

                    {/* Background Concentric Circles (Behind Mobile Image) */}
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-[35px] border-[#926577]/30 pointer-events-none hidden md:block" />
                    <div className="absolute left-20 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-[30px] border-[#53264A]/40 pointer-events-none hidden md:block" />

                    {/* 1. LEFT SIDE: MOBILE MOCKUP IMAGE (OVERFLOWING OUTSIDE CONTAINER) */}
                    <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-start -mt-16 md:-mt-20 md:-mb-20 md:-ml-8">
                        <img
                            src={appMockup}
                            alt="Mobile App Mockup"
                            className="w-[320px] sm:w-[400px] md:w-[460px] lg:w-[500px] max-w-none object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* 2. RIGHT SIDE: TEXT & DOWNLOAD BUTTONS */}
                    <div className="relative z-20 w-full md:w-1/2 space-y-6 text-left mt-8 md:mt-0 md:pl-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#2D0A3A] tracking-tight">
                            Drive Your Journey With Ease
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed max-w-md font-normal">
                            Find nearby rental cars, compare options, and reserve your vehicle in just a few taps. Fast, reliable, and convenient car rental at your fingertips.
                        </p>

                        {/* Store Buttons Container */}
                        <div className="flex flex-wrap gap-4 pt-2">

                            {/* App Store Button */}
                            <button className="bg-[#2D0A3A] hover:bg-[#20062a] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer">
                                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.13c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.72-.94 2.75 1.01.08 2.04-.5 2.66-1.25z" />
                                </svg>
                                <div className="text-left leading-tight">
                                    <span className="block text-[9px] text-slate-300 font-normal">Available on the</span>
                                    <span className="text-xs font-bold tracking-wide">App Store</span>
                                </div>
                            </button>

                            {/* Google Play Button */}
                            <button className="bg-[#2D0A3A] hover:bg-[#20062a] text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#410538" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5Z" />
                                    <path fill="#00E676" d="M16.81,15.12L13.69,12L16.81,8.88L20.5,10.97C21.17,11.35 21.17,12.65 20.5,13.03L16.81,15.12Z" />
                                    <path fill="#FF3D00" d="M13.69,12L3.84,2.15C4.07,2.05 4.33,2 4.6,2C5.07,2 5.54,2.2 5.92,2.42L16.81,8.88L13.69,12Z" />
                                    <path fill="#FFC107" d="M13.69,12L16.81,15.12L5.92,21.58C5.54,21.8 5.07,22 4.6,22C4.33,22 4.07,21.95 3.84,21.85L13.69,12Z" />
                                </svg>
                                <div className="text-left leading-tight">
                                    <span className="block text-[9px] text-slate-300 font-normal">Get it on</span>
                                    <span className="text-xs font-bold tracking-wide">Google Play</span>
                                </div>
                            </button>

                        </div>
                    </div>

                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-[#1F0826] text-white pt-16 pb-8 px-6 md:px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                            <Car className="w-8 h-8 text-[#2D0A3A]" />
                        </div>
                        <p className="text-sm font-semibold">Social Links</p>
                        <div className="flex gap-2">
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20">
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20">
                                <FaLinkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-base font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">About</a></li>
                            <li><a href="#" className="hover:text-white">Features</a></li>
                            <li><a href="#" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-bold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li>support@finovo.com</li>
                            <li>+1 (123) 456-7890</li>
                            <li className="text-slate-400">123 Finovo Lane, Suite 100, City, State, ZIP</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base font-bold mb-4">App Coming Soon</h4>
                        <p className="text-sm text-slate-300 mb-4">Get our car rental app soon to search, book, and manage your ride anytime, anywhere.</p>
                        <div className="flex gap-2">
                            <button className="bg-[#2D0A3A] text-white px-3 py-2 rounded-lg text-[10px] font-semibold flex items-center gap-2 border border-white/10">
                                <Apple className="w-4 h-4" /> App Store
                            </button>
                            <button className="bg-[#2D0A3A] text-white px-3 py-2 rounded-lg text-[10px] font-semibold flex items-center gap-2 border border-white/10">
                                <Play className="w-4 h-4" /> Google Play
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>© 2026 Finovo. All Rights Reserved.</p>

                    <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
                        <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10">
                            <ChevronLeft className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-white">5 / 6</span>
                        <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10">
                            <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms & Conditions</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}