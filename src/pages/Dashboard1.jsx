import React, { useState } from 'react';
import {
    LayoutDashboard, Calendar, FileText, CreditCard, Settings,
    HelpCircle, LogOut, Bell, ChevronDown, ArrowRight, Star,
    Car, Award, AlertTriangle, Clock
} from 'lucide-react';

// Assets Imports
import activeCarImg from '../assets/dash1-active-car-bmw.png';
import recentCamryImg from '../assets/dash1-recent-camry.png';
import recentTucsonImg from '../assets/dash1-recent-tucson.png';
import promoBannerImg from '../assets/dash1-promo-banner.png';

export default function Dashboard1() {
    const [activeTab, setActiveTab] = useState('Dashboard');

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

                    {/* User Profile Mini Badge */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3 mb-6">
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
                        <span className="text-[#2B0938] font-bold underline underline-offset-4 decoration-amber-400">Home</span>
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

                {/* HERO BANNER */}
                <section className="bg-gradient-to-r from-[#2B0938] to-[#421254] rounded-[28px] p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
                    <div className="relative z-10 space-y-2">
                        <p className="text-xs text-purple-300 font-medium">Monday, 15 September 2026</p>
                        <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
                            Welcome back, Ahmed 👋
                        </h1>
                        <p className="text-xs text-purple-200">Here's what's happening with your rentals this week.</p>
                        <div className="w-12 h-1 bg-amber-400 rounded-full mt-3" />
                    </div>

                    {/* Graphical Background Lines */}
                    <div className="absolute right-8 bottom-0 top-0 flex items-end gap-2 opacity-15 pointer-events-none">
                        <div className="w-4 h-24 bg-white rounded-t-sm" />
                        <div className="w-4 h-32 bg-white rounded-t-sm" />
                        <div className="w-4 h-20 bg-white rounded-t-sm" />
                        <div className="w-4 h-40 bg-white rounded-t-sm" />
                        <div className="w-4 h-28 bg-white rounded-t-sm" />
                        <div className="w-4 h-36 bg-white rounded-t-sm" />
                    </div>
                </section>

                {/* GRID SECTION: ACTIVE BOOKING & QUICK STATS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Active Booking Card (8 cols) */}
                    <div className="lg:col-span-7 bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-base font-bold text-[#2B0938]">Active Booking</h2>
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Ongoing
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
                            <div className="md:col-span-5 bg-purple-50/50 p-4 rounded-2xl flex items-center justify-center">
                                <img src={activeCarImg} alt="BMW 520i" className="w-full h-28 object-contain" />
                            </div>

                            <div className="md:col-span-7 space-y-2 text-xs">
                                <h3 className="text-base font-extrabold text-[#2B0938]">BMW 520i · 2026</h3>

                                <div className="space-y-1.5 text-gray-500 pt-1">
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span>Booking ID</span>
                                        <span className="font-bold text-gray-800">#BK-102</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span>Pickup date</span>
                                        <span className="font-bold text-gray-800">15 Oct 2026</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span>Drop-off date</span>
                                        <span className="font-bold text-gray-800">18 Oct 2026</span>
                                    </div>
                                    <div className="flex justify-between pt-0.5">
                                        <span>Total amount</span>
                                        <span className="font-extrabold text-[#2B0938]">SAR 1,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-bold py-3 rounded-2xl text-xs flex justify-center items-center gap-1.5 shadow-sm transition">
                            Manage Booking <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Quick Stats Grid (5 cols) */}
                    <div className="lg:col-span-5 bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">
                        <h2 className="text-base font-bold text-[#2B0938]">Quick Stats</h2>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Total Trips */}
                            <div className="bg-purple-50/60 p-3.5 rounded-2xl space-y-2">
                                <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center text-purple-900 shadow-sm">
                                    <Car className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-semibold">Total Trips</p>
                                <p className="text-lg font-extrabold text-[#2B0938]">5</p>
                            </div>

                            {/* Loyalty Points */}
                            <div className="bg-emerald-50/60 p-3.5 rounded-2xl space-y-2">
                                <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                                    <Star className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-semibold">Loyalty Points</p>
                                <p className="text-lg font-extrabold text-[#2B0938]">1,250</p>
                            </div>

                            {/* Pending Docs */}
                            <div className="bg-amber-50/60 p-3.5 rounded-2xl space-y-2">
                                <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-semibold">Pending Docs</p>
                                <p className="text-lg font-extrabold text-[#2B0938] flex items-center gap-1">
                                    1 <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                </p>
                            </div>

                            {/* Member Since */}
                            <div className="bg-purple-50/60 p-3.5 rounded-2xl space-y-2">
                                <div className="w-7 h-7 bg-white rounded-xl flex items-center justify-center text-purple-900 shadow-sm">
                                    <Award className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] text-gray-400 font-semibold">Member Since</p>
                                <p className="text-base font-extrabold text-[#2B0938]">Jan '24</p>
                            </div>
                        </div>

                        {/* Motivational Quote Bar */}
                        <div className="bg-gray-50 p-3 rounded-xl text-center text-[10px] font-medium text-gray-500 italic border border-gray-100">
                            "More journeys, more memories."
                        </div>
                    </div>

                </div>

                {/* RECENT ACTIVITY TABLE */}
                <section className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-[#2B0938]">Recent Activity</h2>
                        <button className="text-xs font-bold text-[#2B0938] hover:text-purple-700 flex items-center gap-1 transition">
                            View all history <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                                    <th className="pb-3 font-semibold">Booking ID</th>
                                    <th className="pb-3 font-semibold">Car</th>
                                    <th className="pb-3 font-semibold">Date</th>
                                    <th className="pb-3 font-semibold">Status</th>
                                    <th className="pb-3 font-semibold">Rating</th>
                                    <th className="pb-3 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                                {/* Row 1 */}
                                <tr>
                                    <td className="py-3.5">#BK-101</td>
                                    <td className="py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-7 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 overflow-hidden">
                                                <img src={recentCamryImg} alt="Toyota Camry" className="w-full h-full object-contain" />
                                            </div>
                                            <span>Toyota Camry</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 text-gray-500">10 Sep 2026</td>
                                    <td className="py-3.5">
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2.5 py-1 rounded-full font-bold">
                                            • Completed
                                        </span>
                                    </td>
                                    <td className="py-3.5">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3.5 text-right">
                                        <button className="border border-gray-300 hover:bg-gray-50 text-[#2B0938] text-[11px] font-bold px-3 py-1.5 rounded-xl transition">
                                            Book again
                                        </button>
                                    </td>
                                </tr>

                                {/* Row 2 */}
                                <tr>
                                    <td className="py-3.5">#BK-100</td>
                                    <td className="py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-7 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 overflow-hidden">
                                                <img src={recentTucsonImg} alt="Hyundai Tucson" className="w-full h-full object-contain" />
                                            </div>
                                            <span>Hyundai Tucson</span>
                                        </div>
                                    </td>
                                    <td className="py-3.5 text-gray-500">05 Sep 2026</td>
                                    <td className="py-3.5">
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2.5 py-1 rounded-full font-bold">
                                            • Completed
                                        </span>
                                    </td>
                                    <td className="py-3.5">
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3.5 text-right">
                                        <button className="border border-gray-300 hover:bg-gray-50 text-[#2B0938] text-[11px] font-bold px-3 py-1.5 rounded-xl transition">
                                            Book again
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* BOTTOM PROMO BANNER */}
                <section className="relative rounded-[28px] overflow-hidden bg-[#2B0938] text-white p-6 md:p-8 flex justify-between items-center shadow-lg">
                    <img src={promoBannerImg} alt="RentORide Promo" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />

                    <div className="relative z-10 space-y-1">
                        <h3 className="text-xl md:text-2xl font-extrabold">Explore More Roads With RentORide</h3>
                        <p className="text-xs text-purple-200">Premium Cars. Trusted Service. Always with You.</p>
                    </div>

                    <button className="relative z-10 bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-md transition">
                        Browse Cars <ArrowRight className="w-4 h-4" />
                    </button>
                </section>

            </main>

        </div>
    );
}