import React, { useState } from 'react';
import {
    Star, Shield, ShieldCheck, Heart, ShoppingCart, Calendar, MapPin,
    ChevronDown, ChevronRight, ChevronLeft, Wifi, Compass, Camera, Sun,
    CheckCircle, Clock, User, Fuel, ArrowRight, Gauge, Tag
} from 'lucide-react';
import { FaInstagram, FaTwitter, FaLinkedin} from 'react-icons/fa';
// 1. Main Gallery Imports
import mainCarImg from '../assets/cardetail-main-yellow-lambo.png';
import thumbFront from '../assets/cardetail-thumb-front.png';
import thumbBack from '../assets/cardetail-thumb-back.png';
import thumbInterior from '../assets/cardetail-thumb-interior.png';
import thumbSide from '../assets/cardetail-thumb-side.png';
import thumbDashboard from '../assets/cardetail-thumb-dashboard.png';

// 2. Branding & Section Image Imports
import lamboLogo from '../assets/cardetail-lambo-logo.png';
import featureImg from '../assets/cardetail-feature-interior.png';
import termsCarImg from '../assets/cardetail-terms-car.png';

// 3. Customer Testimonials Avatars Imports
import user1 from '../assets/cardetail-user-1.png';
import user2 from '../assets/cardetail-user-2.png';
import user3 from '../assets/cardetail-user-3.png';

// 4. Similar Cars Imports
import carDetailSmlrCar from '../assets/cardetail-smlrcar.png';
import carDetailBmwLogo from '../assets/cardetail-bmwlogo.png';

export default function CarDetailPage() {
    const [selectedImage, setSelectedImage] = useState(mainCarImg);
    const [selectedInsurance, setSelectedInsurance] = useState('Standard');

    const galleryThumbs = [
        { id: 1, label: 'Front', img: thumbFront },
        { id: 2, label: 'Back', img: thumbBack },
        { id: 3, label: 'Interior', img: thumbInterior },
        { id: 4, label: 'Side', img: thumbSide },
        { id: 5, label: 'Dashboard', img: thumbDashboard },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FD] text-[#2C0C30]">

            {/* 1. TOP HERO SECTION */}
            <div className="bg-[#2B0938] text-white pt-8 pb-16 px-4 md:px-12 rounded-b-[40px] md:rounded-b-[50px]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Hero: Gallery & Heading */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <p className="text-[10px] md:text-xs tracking-[0.2em] font-semibold uppercase text-purple-300">
                                EXTRAORDINARY DRIVES • BRIGHTER TOMORROWS
                            </p>
                            <h1 className="font-serif italic text-3xl md:text-5xl mt-1 font-semibold text-amber-200/90">
                                More Than a Ride
                            </h1>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Lamborghini 2026</h2>
                                    {lamboLogo && (
                                        <img src={lamboLogo} alt="Logo" className="w-8 h-8 object-contain rounded-full bg-white/10 p-1" />
                                    )}
                                </div>
                                <p className="text-xs text-purple-200 mt-1">Unleash extraordinary performance.</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-white">4.8</span>
                                    <span className="text-xs text-purple-300">(120 Reviews)</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl md:text-4xl font-extrabold text-amber-400">SAR 1,000.00</p>
                                <p className="text-xs text-purple-300 font-medium">/ Day</p>
                            </div>
                        </div>

                        {/* Main Showcase Image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/10] bg-black/20">
                            <img src={selectedImage} alt="Selected Car" className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/20 flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5" /> 360° View
                            </div>
                            <div className="absolute bottom-4 left-6 text-white/80">
                                <p className="text-[10px] tracking-[0.25em] font-bold uppercase">LAMBORGHINI</p>
                                <p className="text-[10px] tracking-[0.15em] opacity-80">POWER • PRESTIGE • FREEDOM</p>
                            </div>
                        </div>

                        {/* Thumbnails Row (5 Pictures) */}
                        <div className="grid grid-cols-5 gap-3">
                            {galleryThumbs.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedImage(item.img)}
                                    className={`relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all bg-black/40 aspect-[4/3] ${selectedImage === item.img ? 'border-amber-400 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                                    <span className="absolute bottom-1 inset-x-0 text-center text-[9px] font-bold bg-black/60 py-0.5 text-white">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Hero: Booking Form Card */}
                    <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl border border-white/15 p-6 md:p-8 rounded-[32px] text-white space-y-6">

                        {/* Quick Spec Highlights */}
                        <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl"><Compass className="w-4 h-4 text-amber-300" /></div>
                                <div><p className="text-[10px] text-purple-200">Transmission</p><p className="text-xs font-bold">Automatic</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl"><Fuel className="w-4 h-4 text-amber-300" /></div>
                                <div><p className="text-[10px] text-purple-200">Fuel</p><p className="text-xs font-bold">Petrol</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl"><User className="w-4 h-4 text-amber-300" /></div>
                                <div><p className="text-[10px] text-purple-200">Seats</p><p className="text-xs font-bold">4 Persons</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl"><Sun className="w-4 h-4 text-amber-300" /></div>
                                <div><p className="text-[10px] text-purple-200">AC</p><p className="text-xs font-bold">Yes</p></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">Booking Details</h3>
                                <span className="text-[10px] text-purple-300">Plan your perfect journey</span>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <div className="p-2 bg-white/10 rounded-xl"><FaInstagram className="w-4 h-4 text-amber-300" /></div>
                                <div className="p-2 bg-white/10 rounded-xl"><FaTwitter className="w-4 h-4 text-amber-300" /></div>
                            </div>

                            {/* Insurance Options */}
                            <p className="text-xs font-semibold text-purple-200 mb-2">Insurance Plan</p>
                            <div className="grid grid-cols-3 gap-2.5">
                                {[
                                    { name: 'Basic', price: 'SAR 0/day', tag: 'Basic Coverage' },
                                    { name: 'Standard', price: 'SAR 50/day', tag: 'Popular Coverage' },
                                    { name: 'Premium', price: 'SAR 100/day', tag: 'Full Coverage' },
                                ].map((plan) => (
                                    <div
                                        key={plan.name}
                                        onClick={() => setSelectedInsurance(plan.name)}
                                        className={`p-3 rounded-2xl cursor-pointer border text-center transition-all ${selectedInsurance === plan.name
                                            ? 'bg-amber-400 text-[#2B0938] border-amber-400 font-bold'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <p className="text-xs font-bold">{plan.name}</p>
                                        <p className="text-[10px] opacity-80 mt-0.5">{plan.price}</p>
                                        <p className="text-[8px] opacity-70 mt-1">{plan.tag}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] text-purple-200 block mb-1">Pick-up location</label>
                                    <div className="bg-white text-gray-800 p-2.5 rounded-xl text-xs flex justify-between items-center">
                                        <span>Select city</span><ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-purple-200 block mb-1">Pick-up Date & time</label>
                                    <div className="bg-white text-gray-800 p-2.5 rounded-xl text-xs flex justify-between items-center">
                                        <span>Select Date & Time</span><Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[10px] text-purple-200 block mb-1">Drop-off location</label>
                                    <div className="bg-white text-gray-800 p-2.5 rounded-xl text-xs flex justify-between items-center">
                                        <span>Select city</span><ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-purple-200 block mb-1">Drop-off Date & time</label>
                                    <div className="bg-white text-gray-800 p-2.5 rounded-xl text-xs flex justify-between items-center">
                                        <span>Select Date & Time</span><Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rental Duration Notice */}
                        <div className="bg-amber-100/10 border border-amber-400/30 p-3 rounded-2xl flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-amber-400" />
                            <div>
                                <p className="text-xs font-bold text-amber-300">Rental Duration</p>
                                <p className="text-[10px] text-purple-200">2 Days (Apr 10, 2026 - Apr 12, 2026)</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>Insurance Included: <strong>{selectedInsurance} Plan</strong></span>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2.5 pt-2">
                            <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold py-3.5 rounded-2xl text-sm flex justify-center items-center gap-2 shadow-lg transition">
                                Book This Car <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="flex gap-2.5">
                                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-2xl text-xs flex justify-center items-center gap-2 border border-white/10 transition">
                                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                                </button>
                                <button className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/10 transition">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* 2. CAR SPECIFICATIONS */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#2B0938]">Car Specifications</h2>
                        <p className="text-xs text-gray-500 mt-1">Technical details at a glance</p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-900">— PRECISION IN EVERY DETAIL</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {[
                        { label: 'Engine', val: '2.0L Turbo' },
                        { label: 'Horsepower', val: '250 HP' },
                        { label: 'Mileage', val: '15 km/l' },
                        { label: 'Doors', val: '4' },
                        { label: 'Luggage', val: '2 Bags' },
                        { label: 'Drive Type', val: 'AWD' },
                        { label: 'Top Speed', val: '250 km/h' },
                        { label: 'Fuel Tank', val: '60 L' },
                    ].map((spec, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-purple-100 text-center shadow-sm hover:shadow-md transition">
                            <div className="w-10 h-10 mx-auto bg-purple-50 rounded-xl flex items-center justify-center mb-2 text-[#2B0938]">
                                <Compass className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{spec.label}</p>
                            <p className="text-xs font-extrabold text-[#2B0938] mt-0.5">{spec.val}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. FEATURES & AMENITIES */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#2B0938]">Features & Amenities</h2>
                        <p className="text-xs text-gray-500 mt-1">Everything you need for a seamless journey</p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-900">— LUXURY MEETS CONVENIENCE</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[4/3] bg-purple-900 text-white p-6 flex flex-col justify-between">
                        <img src={featureImg} alt="Interior Features" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold max-w-[200px]">Premium Features for Extraordinary Journeys.</h3>
                        </div>
                        <div className="relative z-10 text-[9px] font-bold tracking-widest space-y-1 text-amber-300">
                            <p>COMFORT</p>
                            <p>TECHNOLOGY</p>
                            <p>FREEDOM</p>
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {[
                                { title: 'Bluetooth', desc: 'Stay connected on the go' },
                                { title: 'GPS Navigation', desc: 'Find your way with ease' },
                                { title: 'Backup Camera', desc: 'Drive with confidence' },
                                { title: 'Sunroof', desc: 'Enjoy the open sky' },
                                { title: 'Leather Seats', desc: 'Premium comfort' },
                                { title: 'Apple CarPlay', desc: 'Seamless iPhone integration' },
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-2.5 bg-[#2B0938] text-white rounded-full"><Wifi className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#2B0938]">{feat.title}</h4>
                                        <p className="text-[10px] text-gray-400">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Insurance Included', desc: 'Drive with peace of mind' },
                                { title: '24/7 Roadside Assistance', desc: "We're always here for you" },
                                { title: 'Free Cancellation', desc: 'Flexible travel plans' },
                                { title: 'Unlimited Mileage', desc: 'Go further, worry less' },
                                { title: 'Child Seat Available', desc: 'Travel safely with your little ones' },
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="p-2.5 bg-[#2B0938] text-white rounded-full"><ShieldCheck className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="text-xs font-bold text-[#2B0938]">{feat.title}</h4>
                                        <p className="text-[10px] text-gray-400">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* 4. RENTAL TERMS & CONDITIONS */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#2B0938]">Rental Terms & Conditions</h2>
                        <p className="text-xs text-gray-500 mt-1">Important information for your rental</p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-900">— CLEAR TERMS. A BETTER JOURNEY</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    <div className="lg:col-span-6 space-y-3">
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center cursor-pointer">
                                <span className="text-xs font-bold text-[#2B0938]">Minimum age — 21 years</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">
                                Drivers must be at least 21 years old and have a valid driver's license for a minimum of 1 year.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                            <span className="text-xs font-bold text-[#2B0938]">Security Deposit — SAR 500 (Refundable)</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                            <span className="text-xs font-bold text-[#2B0938]">Fuel Policy — Full to Full</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                            <span className="text-xs font-bold text-[#2B0938]">Late Return Fee — SAR 50/hour</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#2B0938] text-white p-8 flex flex-col justify-end">
                        <img src={termsCarImg} alt="Terms Banner" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                        <div className="relative z-10">
                            <p className="text-2xl font-extrabold text-amber-300">Great Cars</p>
                            <p className="text-2xl font-extrabold">Brighter Journeys</p>
                            <p className="text-[9px] tracking-widest text-purple-200 mt-2">SAME ROADS. A MORE EXTRAORDINARY YOU.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 5. CUSTOMER TESTIMONIALS (3 Pics) */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#2B0938]">What Our Customers Say</h2>
                        <p className="text-xs text-gray-500 mt-1">Real experiences from our valued drivers</p>
                    </div>
                    <button className="text-xs font-bold text-[#2B0938] flex items-center gap-1">
                        View All Reviews <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: "Ahmed", userImg: user1 },
                        { name: "Ahmed", userImg: user2 },
                        { name: "Ahmed", userImg: user3 },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-[#2B0938] text-white p-5 rounded-3xl relative">
                            <div className="flex items-center gap-3 mb-3">
                                <img src={item.userImg} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-amber-400" />
                                <div>
                                    <h4 className="text-xs font-bold">{item.name}</h4>
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] text-purple-200 leading-relaxed">
                                Smooth booking and the car was exactly as shown. Highly recommended! The service was impeccable from start to finish.
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. SIMILAR CARS (4 Cards) */}
            <div className="max-w-7xl mx-auto px-4 pb-20">

                {/* Header Section */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#111827]">Similar Cars</h2>
                        <p className="text-sm text-gray-500 mt-1">More exceptional vehicles for your next journey</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2.5 rounded-full bg-white border border-gray-200 text-[#111827] hover:bg-gray-50 transition">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-full bg-white border border-gray-200 text-[#111827] hover:bg-gray-50 transition">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            id: 1,
                            name: "BMW 520 i",
                            year: "2026",
                            mileage: "250 km",
                            price: "SAR 500.00",
                            status: "Available",
                            carImg: carDetailSmlrCar,
                            logoImg: carDetailBmwLogo,
                            bgCityImg: "https://images.unsplash.com/photo-1477959858617-67f30ac4ce00?q=80&w=800",
                        },
                        // Agar aur cars dikhani hon toh yahan same object copy paste kar sakti hain
                    ].map((car) => (
                        <div
                            key={car.id}
                            className="relative rounded-[40px] bg-white p-6 shadow-xl border border-purple-100/60 overflow-hidden group"
                        >
                            {/* Background Curve with Purple Gradient and City Backdrop */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#4A154B] via-[#2D0B31] to-white rounded-[40px]">
                                <img
                                    src={car.bgCityImg}
                                    alt="City skyline"
                                    className="w-full h-48 object-cover opacity-25 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A154B]/40 to-white"></div>
                            </div>

                            {/* Inner Content */}
                            <div className="relative z-10 flex flex-col justify-between h-full min-h-[380px]">

                                {/* Top Status Badge */}
                                <div className="flex justify-end">
                                    <span className="bg-[#D1FAE5] text-[#065F46] font-semibold text-xs px-3.5 py-1 rounded-full shadow-sm">
                                        {car.status}
                                    </span>
                                </div>

                                {/* Center Car Image */}
                                <div className="my-auto py-2">
                                    <img
                                        src={car.carImg}
                                        alt={car.name}
                                        className="w-full h-44 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Bottom Details Section */}
                                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-sm border border-gray-100 mt-2">

                                    {/* Brand Logo & Name */}
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-white shadow-md p-1 flex items-center justify-center border border-gray-100 overflow-hidden">
                                            <img src={car.logoImg} alt="Brand Logo" className="w-full h-full object-contain rounded-full" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-gray-900 leading-tight">{car.name}</h4>
                                            <span className="text-xs font-medium text-gray-400">{car.year}</span>
                                        </div>
                                    </div>

                                    {/* Specs and Price Grid */}
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">

                                        {/* Mileage */}
                                        <div className="flex items-center space-x-2">
                                            <div className="text-purple-700">
                                                <Gauge className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-800">{car.mileage}</p>
                                                <span className="text-[10px] text-gray-400 block">Mileage</span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center space-x-2">
                                            <div className="text-purple-700">
                                                <Tag className="w-5 h-5 rotate-90" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-800">{car.price}</p>
                                                <span className="text-[10px] text-gray-400 block">Daily Fee</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="w-10 h-10 rounded-full border-2 border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-900 hover:text-white transition-colors ml-2">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* 7. FOOTER SECTION */}
            <footer className="bg-[#2B0938] text-white pt-16 pb-8 rounded-t-[40px] md:rounded-t-[50px]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/10 pb-12">

                    <div className="md:col-span-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center font-bold text-amber-400">F</div>
                            <span className="text-xl font-bold tracking-tight">Finovo</span>
                        </div>
                        <p className="text-xs text-purple-200">Social Links</p>
                        <div className="flex gap-2">
                            <div className="p-2 bg-white/10 rounded-xl"><FaInstagram className="w-4 h-4 text-amber-300" /></div>
                            <div className="p-2 bg-white/10 rounded-xl"><FaTwitter className="w-4 h-4 text-amber-300" /></div>
                            <div className="p-2 bg-white/10 rounded-xl"><FaLinkedin className="w-4 h-4 text-amber-300" /></div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <h4 className="text-xs font-bold text-amber-300">Quick Links</h4>
                        <ul className="text-xs text-purple-200 space-y-1.5">
                            <li>Home</li>
                            <li>About</li>
                            <li>Features</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div className="md:col-span-3 space-y-2">
                        <h4 className="text-xs font-bold text-amber-300">Contact</h4>
                        <ul className="text-xs text-purple-200 space-y-1.5">
                            <li>support@finovo.com</li>
                            <li>+1 (123) 456-7890</li>
                            <li>123 Finovo Lane, Suite 100, City, State, ZIP</li>
                        </ul>
                    </div>

                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold text-amber-300">App Coming Soon</h4>
                        <p className="text-[10px] text-purple-200">Get our car rental app soon to search, book, and manage your ride anytime, anywhere.</p>
                        <div className="flex gap-2">
                            <div className="bg-white/10 px-3 py-1.5 rounded-xl text-[9px] border border-white/10">App Store</div>
                            <div className="bg-white/10 px-3 py-1.5 rounded-xl text-[9px] border border-white/10">Google Play</div>
                        </div>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col md:flex-row justify-between text-[10px] text-purple-300 gap-2">
                    <p>© 2026 Finovo. All Rights Reserved.</p>
                    <div className="flex gap-4">
                        <span>Privacy Policy</span>
                        <span>Terms & Conditions</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}