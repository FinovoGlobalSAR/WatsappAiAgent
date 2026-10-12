import React, { useState } from 'react';
import {
    LayoutDashboard, Calendar, FileText, CreditCard, Settings,
    HelpCircle, LogOut, Bell, ChevronDown, Search, Filter,
    Copy, Download, RefreshCw, XCircle, Calendar as CalendarIcon,
    MapPin, ShieldCheck, Edit3
} from 'lucide-react';

// Assets Imports
import heroBannerImg from '../assets/dash2-hero-banner.png';
import activeCarImg from '../assets/dash2-active-car-yellow.png';
import completedCarImg from '../assets/dash2-completed-car-green.png';

export default function Dashboard2() {
    const [activeTab, setActiveTab] = useState('My Bookings');
    const [filter, setFilter] = useState('All');

    return (
        <div className="flex min-h-screen bg-[#F3F4F8] font-sans">

            {/* SIDEBAR */}
            <aside className="w-64 bg-[#2B0938] text-white flex flex-col justify-between p-5 min-h-screen sticky top-0">
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center font-bold text-amber-400">F</div>
                        <span className="text-xl font-bold tracking-tight">Finovo</span>
                    </div>

                    {/* User Profile Mini Badge with Edit Profile Button */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-400 text-[#2B0938] font-extrabold flex items-center justify-center text-sm">
                                AK
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white">Ahmed Khan</h4>
                                <p className="text-[10px] text-amber-300 flex items-center gap-1">
                                    ★ Gold Member
                                </p>
                            </div>
                        </div>
                        <button className="w-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold py-1.5 rounded-xl border border-white/10 flex items-center justify-center gap-1.5 transition">
                            <Edit3 className="w-3 h-3" /> Edit Profile
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1.5">
                        {[
                            { name: 'Dashboard', icon: LayoutDashboard },
                            { name: 'My Bookings', icon: Calendar },
                            { name: 'My Documents', icon: FileText, badge: '1' },
                            { name: 'Payment Methods', icon: CreditCard },
                            { name: 'Settings', icon: Settings },
                            { name: 'Help & Support', icon: HelpCircle },
                        ].map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.name;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${isActive
                                            ? 'bg-amber-400 text-[#2B0938] font-bold shadow-md'
                                            : 'text-purple-200 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer Logout */}
                <div className="pt-4 border-t border-white/10">
                    <button className="flex items-center gap-3 text-purple-200 hover:text-white text-xs font-semibold px-4 py-2 transition">
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-x-hidden">

                {/* TOP NAVBAR */}
                <header className="flex justify-between items-center">
                    <nav className="flex gap-6 text-xs font-semibold text-gray-500">
                        <span className="hover:text-gray-800 cursor-pointer">Home</span>
                        <span className="hover:text-gray-800 cursor-pointer">Cars</span>
                        <span className="hover:text-gray-800 cursor-pointer">Insurance</span>
                        <span className="hover:text-gray-800 cursor-pointer">Contact</span>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 bg-white rounded-full text-gray-600 hover:text-gray-900 border border-gray-200 shadow-sm">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>

                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer">
                            <div className="w-6 h-6 rounded-full bg-amber-400 text-[#2B0938] font-bold text-[10px] flex items-center justify-center">
                                AK
                            </div>
                            <span className="text-xs font-bold text-gray-800">Ahmed Khan</span>
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </div>

                        <button className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                            <LogOut className="w-3.5 h-3.5" /> Log out
                        </button>
                    </div>
                </header>

                {/* HERO BANNER - MY BOOKINGS */}
                <section className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-12 items-center">
                    <div className="md:col-span-7 p-6 md:p-8 space-y-2">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#2B0938]">My Bookings</h1>
                        <p className="text-xs text-gray-500">View and manage all your car rentals in one place.</p>
                    </div>
                    <div className="md:col-span-5 h-40 md:h-full relative min-h-[140px]">
                        <img src={heroBannerImg} alt="New Journeys" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-black/40 md:from-white md:via-transparent md:to-transparent" />
                        <div className="absolute top-4 right-6 text-right text-white space-y-0.5 drop-shadow">
                            <p className="text-sm font-bold">New journeys</p>
                            <p className="text-sm font-bold">New stories</p>
                        </div>
                    </div>
                </section>

                {/* FILTER TABS & SEARCH BAR */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Status Filters */}
                    <div className="flex gap-2 bg-gray-200/50 p-1 rounded-2xl w-fit">
                        {[
                            { label: 'All (3)', value: 'All' },
                            { label: 'Active (1)', value: 'Active' },
                            { label: 'Completed (2)', value: 'Completed' },
                            { label: 'Cancelled (0)', value: 'Cancelled' },
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setFilter(tab.value)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${filter === tab.value
                                        ? 'bg-[#2B0938] text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search & Filter Button */}
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 md:w-64">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search bookings..."
                                className="w-full bg-white border border-gray-200 rounded-2xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-purple-400 shadow-sm"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 shadow-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* BOOKING CARD 1: ACTIVE */}
                <div className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12">

                    {/* Left Car Preview */}
                    <div className="lg:col-span-4 bg-purple-50/50 p-6 flex flex-col justify-between relative">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full w-fit flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active
                        </span>
                        <div className="my-auto py-6 flex justify-center">
                            <img src={activeCarImg} alt="BMW 520i 2026" className="w-full max-w-[220px] object-contain" />
                        </div>
                    </div>

                    {/* Middle Booking Details */}
                    <div className="lg:col-span-5 p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div>
                            <h2 className="text-lg font-extrabold text-[#2B0938]">BMW 520i 2026</h2>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <span>Booking ID</span>
                                <span className="font-bold text-gray-800">#BK-102</span>
                                <Copy className="w-3.5 h-3.5 cursor-pointer text-gray-400 hover:text-gray-600" />
                            </div>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Pickup Date</span>
                                <span className="font-bold text-gray-800">15 Oct 2026 10:00 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Drop-off Date</span>
                                <span className="font-bold text-gray-800">18 Oct 2026 10:00 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Pickup Location</span>
                                <span className="font-bold text-gray-800">Riyadh City Center</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Drop-off Location</span>
                                <span className="font-bold text-gray-800">Riyadh City Center</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Insurance Plan</span>
                                <span className="font-bold text-gray-800">Standard Coverage</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Payment Method</span>
                                <span className="font-bold text-gray-800">Visa ending in 4587</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Pricing & Actions */}
                    <div className="lg:col-span-3 p-6 flex flex-col justify-between space-y-4 bg-white">
                        <div className="text-right">
                            <p className="text-[11px] text-gray-400 font-medium">Total Amount</p>
                            <p className="text-xl font-extrabold text-[#2B0938]">SAR 1,500</p>
                        </div>

                        <div className="space-y-2 pt-4">
                            <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition">
                                <CalendarIcon className="w-4 h-4" /> Extend Booking
                            </button>
                            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-[#2B0938] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition">
                                <XCircle className="w-4 h-4 text-gray-500" /> Cancel Booking
                            </button>
                            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-[#2B0938] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition">
                                <Download className="w-4 h-4 text-gray-500" /> Download Invoice
                            </button>
                        </div>
                    </div>

                </div>

                {/* BOOKING CARD 2: COMPLETED */}
                <div className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12">

                    {/* Left Car Preview */}
                    <div className="lg:col-span-4 bg-purple-50/50 p-6 flex flex-col justify-between relative">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full w-fit flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Completed
                        </span>
                        <div className="my-auto py-6 flex justify-center">
                            <img src={completedCarImg} alt="Toyota Camry 2025" className="w-full max-w-[200px] object-contain" />
                        </div>
                    </div>

                    {/* Middle Booking Details */}
                    <div className="lg:col-span-5 p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div>
                            <h2 className="text-lg font-extrabold text-[#2B0938]">Toyota Camry 2025</h2>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                <span>Booking ID</span>
                                <span className="font-bold text-gray-800">#BK-101</span>
                                <Copy className="w-3.5 h-3.5 cursor-pointer text-gray-400 hover:text-gray-600" />
                            </div>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Pickup Date</span>
                                <span className="font-bold text-gray-800">10 Sep 2026 09:00 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Drop-off Date</span>
                                <span className="font-bold text-gray-800">12 Sep 2026 09:00 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Pickup Location</span>
                                <span className="font-bold text-gray-800">King Khalid Airport</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Drop-off Location</span>
                                <span className="font-bold text-gray-800">King Khalid Airport</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Insurance Plan</span>
                                <span className="font-bold text-gray-800">Standard Coverage</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-gray-400" />
                                <span className="w-28 text-gray-400 font-medium">Payment Method</span>
                                <span className="font-bold text-gray-800">Visa ending in 4587</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Pricing & Actions */}
                    <div className="lg:col-span-3 p-6 flex flex-col justify-between space-y-4 bg-white">
                        <div className="text-right">
                            <p className="text-[11px] text-gray-400 font-medium">Total Amount</p>
                            <p className="text-xl font-extrabold text-[#2B0938]">SAR 800</p>
                        </div>

                        <div className="space-y-2 pt-4">
                            <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition">
                                <RefreshCw className="w-4 h-4" /> Book Again
                            </button>
                            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-[#2B0938] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition">
                                <Download className="w-4 h-4 text-gray-500" /> Download Invoice
                            </button>
                        </div>
                    </div>

                </div>

                {/* PAGINATION FOOTER */}
                <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                    <span>Showing 1–2 of 3 bookings</span>
                    <div className="flex items-center gap-1.5 font-bold">
                        <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
                            &lt;
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-[#2B0938] text-white flex items-center justify-center shadow-sm">
                            1
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50">
                            2
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50">
                            3
                        </button>
                        <button className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50">
                            &gt;
                        </button>
                    </div>
                </div>

            </main>

        </div>
    );
}