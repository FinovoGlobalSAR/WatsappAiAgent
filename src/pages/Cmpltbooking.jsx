import React, { useState } from 'react';
import {
    User, Mail, Phone, FileText, Calendar, Clock, MapPin,
    ShieldCheck, Check, Lock, ChevronRight, Tag, Info,
    RotateCcw, Award, Headphones, Heart, Star,
} from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';
// Assets Imports
import bookingCarImg from '../assets/booking-car-yellow-lambo.png';
import lamboLogo from '../assets/booking-lambo-logo.png';
import promoBannerImg from '../assets/booking-promo-banner.png';

export default function CompleteBooking() {
    const [selectedInsurance, setSelectedInsurance] = useState('Standard');
    const [extras, setExtras] = useState({
        gps: false,
        childSeat: false,
        additionalDriver: false,
    });
    const [promoCode, setPromoCode] = useState('');

    const toggleExtra = (key) => {
        setExtras(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-[#2B0938] text-gray-800 font-sans">

            {/* HEADER / BREADCRUMB SECTION */}
            <div className="max-w-7xl mx-auto pt-8 pb-6 px-4 md:px-8 text-white">
                <nav className="text-xs text-purple-300 flex items-center gap-2 mb-4">
                    <span>Home</span> &gt; <span>Cart</span> &gt; <span className="text-amber-400 font-semibold">Details</span> &gt; <span>Payment</span> &gt; <span>Confirm</span>
                </nav>
                <h1 className="text-3xl md:text-4xl font-extrabold">Complete Your Booking</h1>
                <p className="text-xs text-purple-200 mt-1 max-w-xl">
                    Review your car, rental details, insurance package, and customer information before checkout.
                </p>
            </div>

            {/* MAIN CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: FORM SECTIONS */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* 1. CUSTOMER INFORMATION */}
                        <div className="bg-[#F8F9FD] p-6 md:p-8 rounded-[28px] shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-[#2B0938] text-white rounded-xl">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#2B0938]">Customer Information</h2>
                                    <p className="text-xs text-gray-400">Please provide your personal details for the booking.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="Ahmed Khan"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-purple-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="email"
                                            defaultValue="ahmed@mail.com"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-purple-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="+966 123 456 789"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-purple-600"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">National ID / Passport <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="1122334455"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-purple-600"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Driver's License Number <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="DL-9988776655"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800 focus:outline-none focus:border-purple-600"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Additional Notes (Optional)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Any special requests or information..."
                                        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-purple-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. RENTAL DETAILS */}
                        <div className="bg-[#F8F9FD] p-6 md:p-8 rounded-[28px] shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-[#2B0938] text-white rounded-xl">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#2B0938]">Rental Details</h2>
                                    <p className="text-xs text-gray-400">Choose your rental period and locations.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Pickup Date <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="Mar 15, 2026"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Drop-off Date <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="Mar 20, 2026"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Pickup Time <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="10:00 AM"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Drop-off Time <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="10:00 AM"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Pickup Location <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="Riyadh International Airport (RUH)"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Drop-off Location <span className="text-amber-500">*</span></label>
                                    <div className="relative">
                                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            defaultValue="Riyadh International Airport (RUH)"
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Rental Duration Card */}
                            <div className="mt-4 bg-[#FFF8EA] border border-amber-200 p-3.5 rounded-2xl flex justify-between items-center text-[#2B0938]">
                                <div className="flex items-center gap-2.5 text-xs font-bold">
                                    <Clock className="w-4 h-4 text-amber-600" />
                                    <span>Rental Duration</span>
                                </div>
                                <span className="text-base font-extrabold text-[#2B0938]">5 Days</span>
                            </div>
                        </div>

                        {/* 3. INSURANCE PACKAGE */}
                        <div className="bg-[#F8F9FD] p-6 md:p-8 rounded-[28px] shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-[#2B0938] text-white rounded-xl">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#2B0938]">Insurance Package</h2>
                                    <p className="text-xs text-gray-400">Choose the coverage that suits your needs.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {/* Basic Plan */}
                                <div
                                    onClick={() => setSelectedInsurance('Basic')}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedInsurance === 'Basic' ? 'bg-[#FFF8EA] border-amber-400 shadow-md' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="p-2 bg-purple-50 rounded-xl text-[#2B0938]">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedInsurance === 'Basic' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                                            {selectedInsurance === 'Basic' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sm text-[#2B0938]">Basic</h3>
                                    <p className="text-xs font-extrabold text-[#2B0938] mt-0.5">SAR 0 <span className="text-[10px] font-normal text-gray-400">/ day</span></p>
                                    <p className="text-[10px] text-gray-400 mt-1 mb-3">Basic cover with third party protection.</p>
                                    <ul className="text-[10px] text-gray-600 space-y-1.5 border-t pt-2 border-gray-100">
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Third party coverage</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> 24/7 roadside assistance</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Standard support</li>
                                    </ul>
                                </div>

                                {/* Standard Plan (Most Popular) */}
                                <div
                                    onClick={() => setSelectedInsurance('Standard')}
                                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedInsurance === 'Standard' ? 'bg-[#FFF8EA] border-amber-400 shadow-md' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-[#2B0938] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                                        Most Popular
                                    </span>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="p-2 bg-purple-50 rounded-xl text-[#2B0938]">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedInsurance === 'Standard' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                                            {selectedInsurance === 'Standard' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sm text-[#2B0938]">Standard</h3>
                                    <p className="text-xs font-extrabold text-[#2B0938] mt-0.5">SAR 50 <span className="text-[10px] font-normal text-gray-400">/ day</span></p>
                                    <p className="text-[10px] text-gray-400 mt-1 mb-3">Extended cover for a safer journey.</p>
                                    <ul className="text-[10px] text-gray-600 space-y-1.5 border-t pt-2 border-gray-100">
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Third party coverage</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Theft protection</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Accident coverage</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> 24/7 priority support</li>
                                    </ul>
                                </div>

                                {/* Premium Plan */}
                                <div
                                    onClick={() => setSelectedInsurance('Premium')}
                                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedInsurance === 'Premium' ? 'bg-[#FFF8EA] border-amber-400 shadow-md' : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="p-2 bg-purple-50 rounded-xl text-[#2B0938]">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedInsurance === 'Premium' ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}>
                                            {selectedInsurance === 'Premium' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sm text-[#2B0938]">Premium</h3>
                                    <p className="text-xs font-extrabold text-[#2B0938] mt-0.5">SAR 100 <span className="text-[10px] font-normal text-gray-400">/ day</span></p>
                                    <p className="text-[10px] text-gray-400 mt-1 mb-3">Full coverage with maximum peace of mind.</p>
                                    <ul className="text-[10px] text-gray-600 space-y-1.5 border-t pt-2 border-gray-100">
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Complete coverage</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Zero excess (T&C apply)</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> 24/7 VIP support</li>
                                        <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Replacement vehicle</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        {/* 4. OPTIONAL EXTRAS & PROMO CODE */}
                        <div className="bg-[#F8F9FD] p-6 md:p-8 rounded-[28px] shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-[#2B0938] text-white rounded-xl">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#2B0938]">Optional Extras & Special Requests</h2>
                                    <p className="text-xs text-gray-400">Make your journey more comfortable.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {[
                                    { id: 'gps', title: 'GPS Navigation', price: 'SAR 30 / day' },
                                    { id: 'childSeat', title: 'Child Seat', price: 'SAR 20 / day' },
                                    { id: 'additionalDriver', title: 'Additional Driver', price: 'SAR 50 / day' },
                                ].map((item) => (
                                    <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-gray-200 flex justify-between items-center">
                                        <div>
                                            <h4 className="text-xs font-bold text-[#2B0938]">{item.title}</h4>
                                            <p className="text-[10px] text-gray-400">{item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleExtra(item.id)}
                                            className={`w-10 h-5 rounded-full transition-colors relative ${extras[item.id] ? 'bg-amber-400' : 'bg-gray-200'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${extras[item.id] ? 'right-0.5' : 'left-0.5'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Promo Code Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1">Promo Code</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                        <input
                                            type="text"
                                            placeholder="Enter promo code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-gray-800"
                                        />
                                    </div>
                                    <button className="bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-bold px-6 py-2.5 rounded-xl text-xs transition">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
                    <div className="lg:col-span-5 space-y-6">

                        <div className="bg-[#F8F9FD] p-6 rounded-[28px] shadow-xl text-gray-800 space-y-5">

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#2B0938] text-white rounded-xl">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-[#2B0938]">Order Summary</h3>
                                    <p className="text-[10px] text-gray-400">Review your booking details</p>
                                </div>
                            </div>

                            {/* Car Card Showcase */}
                            <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white">
                                <img src={bookingCarImg} alt="Lamborghini 2026" className="w-full h-44 object-cover" />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full text-gray-800">
                                    Lamborghini
                                </span>
                                <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full text-gray-600 hover:text-red-500">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Title & Ratings */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-lg font-extrabold text-[#2B0938]">Lamborghini 2026</h4>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-800">4.9</span>
                                        <span className="text-[10px] text-gray-400">(120 reviews)</span>
                                    </div>
                                </div>

                                {lamboLogo && (
                                    <img src={lamboLogo} alt="Logo" className="w-7 h-7 object-contain bg-gray-100 p-1 rounded-full" />
                                )}
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-1.5 text-[9px] font-bold text-gray-600">
                                <span className="bg-purple-100/60 px-2 py-1 rounded-md">2 Seats</span>
                                <span className="bg-purple-100/60 px-2 py-1 rounded-md">Petrol</span>
                                <span className="bg-purple-100/60 px-2 py-1 rounded-md">Automatic</span>
                                <span className="bg-purple-100/60 px-2 py-1 rounded-md">Supercar</span>
                            </div>

                            {/* Pricing Per Day */}
                            <div className="text-[#2B0938] font-extrabold text-2xl">
                                SAR 1,000.00 <span className="text-xs font-normal text-gray-400">/ Day</span>
                            </div>

                            {/* Booking Summary Checklist */}
                            <div className="space-y-3 pt-3 border-t border-gray-200 text-xs">
                                <div>
                                    <p className="text-[9px] font-bold text-purple-900 uppercase tracking-wider">RENTAL PERIOD</p>
                                    <p className="font-semibold text-gray-800">Mar 15, 2026 – Mar 20, 2026 (5 Days)</p>
                                </div>

                                <div>
                                    <p className="text-[9px] font-bold text-purple-900 uppercase tracking-wider">PICKUP LOCATION</p>
                                    <p className="font-semibold text-gray-800">Riyadh International Airport (RUH)</p>
                                </div>

                                <div>
                                    <p className="text-[9px] font-bold text-purple-900 uppercase tracking-wider">DROP-OFF LOCATION</p>
                                    <p className="font-semibold text-gray-800">Riyadh International Airport (RUH)</p>
                                </div>

                                <div>
                                    <p className="text-[9px] font-bold text-purple-900 uppercase tracking-wider">SELECTED INSURANCE</p>
                                    <p className="font-semibold text-gray-800">{selectedInsurance} Package • SAR 50 / day</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
                                <p className="text-xs font-bold text-[#2B0938] flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> Price Breakdown
                                </p>
                                <div className="flex justify-between text-gray-600">
                                    <span>Rental Charges (5 days)</span>
                                    <span className="font-bold text-gray-800">SAR 5,000.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Insurance ({selectedInsurance})</span>
                                    <span className="font-bold text-gray-800">SAR 250.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Extras</span>
                                    <span className="font-bold text-gray-800">SAR 0.00</span>
                                </div>

                                <div className="flex justify-between text-gray-500 pt-2 border-t border-gray-200">
                                    <span className="flex items-center gap-1">
                                        Security Deposit <Info className="w-3 h-3 text-gray-400" />
                                    </span>
                                    <span className="font-bold text-gray-800">SAR 5,000.00</span>
                                </div>
                                <p className="text-[9px] text-gray-400 -mt-1">Refundable after return</p>

                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (15%)</span>
                                    <span className="font-bold text-gray-800">SAR 787.50</span>
                                </div>
                            </div>

                            {/* Total Payable Box */}
                            <div className="bg-[#FFF8EA] border border-amber-300 p-4 rounded-2xl flex justify-between items-center">
                                <span className="font-extrabold text-sm text-[#2B0938]">Total Payable</span>
                                <span className="font-extrabold text-xl text-amber-600">SAR 6,037.50</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2.5 pt-2">
                                <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold py-3.5 rounded-2xl text-sm flex justify-center items-center gap-2 shadow-md transition">
                                    <Lock className="w-4 h-4" /> Proceed to Payment <ChevronRight className="w-4 h-4" />
                                </button>

                                <button className="w-full bg-white hover:bg-gray-50 text-[#2B0938] font-bold py-3 rounded-2xl text-xs flex justify-center items-center gap-2 border border-gray-200 transition">
                                    <RotateCcw className="w-4 h-4" /> Continue
                                </button>
                            </div>

                            <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                                <Lock className="w-3 h-3" /> Your booking is secure and encrypted
                            </p>
                            <p className="text-[9px] text-center text-gray-400 -mt-2">
                                We use industry-standard security to protect your information.
                            </p>
                        </div>

                        {/* Sidebar Promo Banner Image */}
                        <div className="relative rounded-[28px] overflow-hidden bg-[#2B0938] p-6 text-white min-h-[140px] flex flex-col justify-end">
                            <img src={promoBannerImg} alt="Promo Banner" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold text-amber-300">Same Roads</h4>
                                <h4 className="text-lg font-bold">Bigger Stories</h4>
                                <p className="text-[10px] text-purple-200 mt-1">Premium cars for unforgettable journeys.</p>
                            </div>
                        </div>

                        {/* Micro Highlights */}
                        <div className="bg-[#F8F9FD] p-4 rounded-2xl grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-[#2B0938]">
                            <div>
                                <RotateCcw className="w-5 h-5 mx-auto mb-1 text-purple-900" />
                                <p>Free Cancellation</p>
                                <p className="text-[8px] text-gray-400 font-normal">Up to 48 hours</p>
                            </div>
                            <div>
                                <Award className="w-5 h-5 mx-auto mb-1 text-purple-900" />
                                <p>Best Price</p>
                                <p className="text-[8px] text-gray-400 font-normal">Guaranteed</p>
                            </div>
                            <div>
                                <Headphones className="w-5 h-5 mx-auto mb-1 text-purple-900" />
                                <p>24/7 Support</p>
                                <p className="text-[8px] text-gray-400 font-normal">Always here</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* FOOTER SECTION */}
            <footer className="bg-[#21062B] text-white pt-16 pb-8 rounded-t-[40px] border-t border-white/10">
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