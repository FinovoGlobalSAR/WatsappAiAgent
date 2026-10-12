import React, { useState } from 'react'; // 1. useState import kiya
import {
    Search,
    ChevronDown,
    ChevronRight,
    Filter,
    Gauge,
    Tag,
    Grid,
    List,
    ChevronLeft,
    Moon,
    Globe,
    User,
    Car,
    Calendar,
    ShieldCheck
} from 'lucide-react';

// Assets Imports (Same as before)
import heroCar from '../assets/avlbl-hero-car.png';
import lamboLogo from '../assets/avlbl-lamborghini-logo.png';
import bmwLogo from '../assets/avlbl-bmw-logo.png';
import car1 from '../assets/avlbl-red-tesla.png';
import car2 from '../assets/avlbl-dark-tesla.png';
import car3 from '../assets/avlbl-blue-hyundai.png';
import car4 from '../assets/avlbl-grey-tesla.png';
import car5 from '../assets/avlbl-white-toyota.png';
import car6 from '../assets/avlbl-black-tesla.png';
import car7 from '../assets/avlbl-yellow-ford.png';
import car8 from '../assets/avlbl-green-mini.png';
import car9 from '../assets/avlbl-blue-tucson.png';

export default function AvailableCars() {
    // 2. Pagination ke liye state
    const [currentPage, setCurrentPage] = useState(1);

    const carsList = [
        { id: 1, isFeatured: true, title: 'Lamborghini', year: '2026', subtitle: 'Unleash extraordinary performance.', logo: lamboLogo, image: car1, mileage: '250 km', price: 'SAR 1000.00' },
        { id: 2, isFeatured: false, title: 'BMW 520 i', year: '2026', logo: bmwLogo, image: car2, mileage: '250 km', price: 'SAR 500.00' },
        { id: 3, isFeatured: false, title: 'BMW 520 i', year: '2026', logo: bmwLogo, image: car3, mileage: '250 km', price: 'SAR 500.00' },
        { id: 4, isFeatured: false, title: 'BMW 520 i', year: '2026', logo: bmwLogo, image: car4, mileage: '250 km', price: 'SAR 500.00' },
        { id: 5, isFeatured: false, title: 'BMW 520 i', year: '2026', logo: bmwLogo, image: car5, mileage: '250 km', price: 'SAR 500.00' },
        { id: 6, isFeatured: false, title: 'BMW 520 i', year: '2026', logo: bmwLogo, image: car6, mileage: '250 km', price: 'SAR 500.00' },
        { id: 7, isFeatured: true, title: 'Lamborghini', year: '2026', subtitle: 'Unleash extraordinary performance.', logo: lamboLogo, image: car7, mileage: '250 km', price: 'SAR 1000.00' },
        { id: 8, isFeatured: true, title: 'Lamborghini', year: '2026', subtitle: 'Unleash extraordinary performance.', logo: lamboLogo, image: car8, mileage: '250 km', price: 'SAR 1000.00' },
        { id: 9, isFeatured: false, title: 'BMW 520 i', year: '2026', logo: bmwLogo, image: car9, mileage: '250 km', price: 'SAR 500.00' },
    ];

    // Pagination ke pages ka array
    const pages = [1, 2, 3, 4, 5, 6, 10];

    return (
        <div className="min-h-screen bg-[#F7F7FD] font-sans pb-16 text-[#210224]">

            {/* ── Top Navigation Bar ── */}
            <nav className="bg-[#210224] text-white px-8 py-3.5 flex items-center justify-between text-xs font-medium border-b border-white/10">
                <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-black text-[#210224] text-xs">FG</div>
                    <span className="text-lg font-bold tracking-tight">Finovo</span>
                </div>
                <div className="hidden md:flex items-center space-x-8 text-gray-300 font-medium">
                    <a href="#" className="hover:text-white transition-colors">Home</a>
                    <a href="#" className="text-white font-semibold border-b-2 border-amber-400 pb-0.5">Cars</a>
                    <a href="#" className="hover:text-white transition-colors">Insurance</a>
                    <a href="#" className="hover:text-white transition-colors">About Us</a>
                    <a href="#" className="hover:text-white transition-colors">AI-Inspection</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="w-8 h-4 bg-gray-600 rounded-full relative p-0.5 flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center"><Moon className="w-2 h-2 text-gray-800" /></div>
                    </button>
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <Globe className="w-3.5 h-3.5 text-gray-300" /><span>EN</span><ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-1.5 cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-all">
                        <User className="w-3.5 h-3.5" /><span>Login / My Booking</span>
                    </div>
                </div>
            </nav>

            {/* ── Hero Banner ── */}
            <div className="relative bg-[#210224] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 space-y-4 z-10">
                        <p className="text-[11px] uppercase tracking-widest font-semibold text-gray-300">EXTRAORDINARY CARS. MEMORABLE JOURNEYS.</p>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">Available Cars</h1>
                        <p className="text-sm text-gray-300 max-w-md font-normal leading-relaxed">Find your perfect drive from our premium collection of world-class vehicles.</p>
                        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-lg">
                            <div className="flex items-start space-x-2">
                                <Car className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                                <div><h4 className="text-xs font-bold leading-tight">Premium Fleet</h4><p className="text-[10px] text-gray-400 mt-0.5">Latest Models</p></div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <Calendar className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                                <div><h4 className="text-xs font-bold leading-tight">Flexible Rental</h4><p className="text-[10px] text-gray-400 mt-0.5">Daily, Weekly, Monthly</p></div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <ShieldCheck className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                                <div><h4 className="text-xs font-bold leading-tight">Trusted Worldwide</h4><p className="text-[10px] text-gray-400 mt-0.5">Thousands of Happy Customers</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 relative flex justify-end">
                        <div className="relative w-full max-w-xl">
                            <img src={heroCar} alt="Available Hero Car" className="w-full object-contain relative z-10 drop-shadow-2xl" />
                            <span className="absolute bottom-2 right-4 font-serif italic text-2xl lg:text-3xl text-white/80 z-20">More Than a Ride</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Search & Filter Section ── */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-100 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        <div className="md:col-span-5 relative">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search for your dream car..." className="w-full bg-[#EFEFF5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-[#210224]/20 transition-all placeholder:text-gray-400" />
                        </div>
                        <div className="md:col-span-4 bg-[#EFEFF5] p-1 rounded-2xl flex items-center justify-between text-xs font-bold">
                            <button className="flex-1 py-2 rounded-xl bg-[#210224] text-white shadow-sm transition-all flex items-center justify-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>Daily</span></button>
                            <button className="flex-1 py-2 rounded-xl text-gray-500 hover:text-[#210224] transition-all flex items-center justify-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>Weekly</span></button>
                            <button className="flex-1 py-2 rounded-xl text-gray-500 hover:text-[#210224] transition-all flex items-center justify-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>Monthly</span></button>
                        </div>
                        <div className="md:col-span-3 bg-[#EFEFF5] px-3.5 py-2 rounded-2xl flex items-center space-x-2 text-xs">
                            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Date Range</span>
                                <span className="text-[11px] font-semibold text-gray-600 mt-0.5">MM/DD/YYYY - MM/DD/YYYY</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-3 items-center pt-1">
                        {['Brand', 'Vehicle Type', 'Price Range', 'Transmission', 'Fuel Type'].map((label, i) => (
                            <div key={i} className="md:col-span-2 bg-[#EFEFF5] px-3 py-2 rounded-2xl">
                                <span className="text-[9px] text-gray-400 font-bold block">{label}</span>
                                <select className="w-full bg-transparent text-xs font-bold text-[#210224] outline-none cursor-pointer">
                                    <option>All {label === 'Price Range' ? 'Prices' : label === 'Transmission' || label === 'Fuel Type' ? 'Any' : label + 's'}</option>
                                </select>
                            </div>
                        ))}
                        <div className="col-span-2 md:col-span-2 flex space-x-2">
                            <button className="flex-1 bg-[#210224] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-1 hover:bg-[#340439] transition-all">
                                <Filter className="w-3.5 h-3.5" /><span>More Filters</span>
                            </button>
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                        <button className="bg-[#FFC107] hover:bg-[#e0a800] text-[#210224] px-8 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center space-x-1 shadow-md">
                            <span>Apply Filters</span><ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Cars Listing Section ── */}
            <div className="max-w-7xl mx-auto px-6 mt-10 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-[#210224]">12 Cars Available</h2>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">Premium vehicles for every journey</p>
                    </div>
                    <div className="flex items-center space-x-3 text-xs font-bold">
                        <span className="text-gray-400">Sort by:</span>
                        <select className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-[#210224] outline-none shadow-sm cursor-pointer">
                            <option>Newest First</option>
                        </select>
                        <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                            <button className="p-1.5 bg-[#210224] text-white rounded-lg"><Grid className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-gray-400 hover:text-[#210224]"><List className="w-3.5 h-3.5" /></button>
                        </div>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {carsList.map((car) => {
                        if (car.isFeatured) {
                            return (
                                <div key={car.id} className="break-inside-avoid bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden relative min-h-[220px]">
                                    <div className="absolute top-0 left-0 bottom-0 w-[65%] bg-gradient-to-r from-[#210224] via-[#3d0642] to-transparent rounded-r-[100px] p-5 flex flex-col justify-between z-0">
                                        <div>
                                            <h3 className="text-2xl font-extrabold text-white leading-tight">{car.title}</h3>
                                            <p className="text-xs font-semibold text-gray-300 mt-0.5">{car.year}</p>
                                            <p className="text-[10px] text-gray-300 mt-2 font-normal leading-snug max-w-[160px] hidden sm:block">{car.subtitle}</p>
                                        </div>
                                        <img src={car.logo} alt="Brand Logo" className="w-10 h-10 object-contain drop-shadow" />
                                    </div>
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-[#EBFBF3] text-[#00A859] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">Available</span>
                                    </div>
                                    <div className="relative z-10 flex justify-end items-center pt-6 pr-6 pb-2">
                                        <img src={car.image} alt={car.title} className="h-28 sm:h-32 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="relative z-10 flex items-center justify-between px-6 pb-5 pt-2">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-semibold">
                                                <Gauge className="w-4 h-4 text-purple-600" />
                                                <div><span className="block text-[9px] text-gray-400 uppercase font-bold">Mileage</span><span>{car.mileage}</span></div>
                                            </div>
                                            <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-semibold">
                                                <Tag className="w-4 h-4 text-purple-600" />
                                                <div><span className="block text-[9px] text-gray-400 uppercase font-bold">Daily Fee</span><span className="text-[#210224] font-black">{car.price}</span></div>
                                            </div>
                                        </div>
                                        <button className="w-8 h-8 rounded-full border border-gray-200 text-[#210224] flex items-center justify-center hover:bg-[#210224] hover:text-white transition-all shadow-sm"><ChevronRight className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div key={car.id} className="break-inside-avoid bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden relative min-h-[210px]">
                                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-[#210224] via-[#4a0a50] to-[#f2eef4] rounded-b-[50px] z-0"></div>
                                <div className="absolute top-3 right-3 z-10">
                                    <span className="bg-[#EBFBF3] text-[#00A859] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">Available</span>
                                </div>
                                <div className="relative z-10 flex justify-center pt-6 pb-2">
                                    <img src={car.image} alt={car.title} className="h-24 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="relative z-10 px-4 pb-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <img src={car.logo} alt="Brand" className="w-5 h-5 object-contain" />
                                        <div>
                                            <h4 className="text-xs font-extrabold text-[#210224] leading-tight">{car.title}</h4>
                                            <p className="text-[10px] text-gray-400 font-medium">{car.year}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                                        <div className="flex items-center space-x-3 text-[11px] font-semibold text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Gauge className="w-3.5 h-3.5 text-purple-600" />
                                                <div><span className="block text-[8px] text-gray-400 uppercase font-bold">Mileage</span><span>{car.mileage}</span></div>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Tag className="w-3.5 h-3.5 text-purple-600" />
                                                <div><span className="block text-[8px] text-gray-400 uppercase font-bold">Daily Fee</span><span className="text-[#210224] font-black">{car.price}</span></div>
                                            </div>
                                        </div>
                                        <button className="w-7 h-7 rounded-full border border-gray-200 text-[#210224] flex items-center justify-center hover:bg-[#210224] hover:text-white transition-all shadow-sm"><ChevronRight className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ── Bottom Pagination & Footer Text Bar ── */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200/80 gap-4">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                        <div>
                            <span className="font-bold text-[#210224] block">Drive a Better Tomorrow</span>
                            <span className="text-[10px] text-gray-400">Sustainable journeys for a brighter future.</span>
                        </div>
                    </div>

                    {/* ── INTERACTIVE PAGINATION ── */}
                    <div className="flex items-center space-x-1">
                        {/* Prev Button */}
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-full font-bold text-xs transition-all ${
                                    currentPage === page
                                        ? 'bg-[#210224] text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-600'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Ellipsis (Dots) */}
                        <span className="text-xs text-gray-400 px-1">...</span>

                        {/* Next Button */}
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, 10))}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="text-right">
                        <span className="text-xs font-bold text-gray-600 block">12 cars found</span>
                        <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">LUXURY MOVES PEOPLE FORWARD</span>
                    </div>
                </div>

            </div>
        </div>
    );
}