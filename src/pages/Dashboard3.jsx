import React, { useState } from 'react';
import {
    LayoutDashboard, Calendar, FileText, CreditCard, Settings,
    HelpCircle, LogOut, Bell, ChevronDown, UploadCloud, AlertCircle,
    XCircle, Clock, CheckCircle, ArrowRight
} from 'lucide-react';

export default function Dashboard3() {
    const [activeTab, setActiveTab] = useState('My Documents');

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

                {/* PAGE TITLE */}
                <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#2B0938]">Verify Your Documents</h1>
                    <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
                        Before renting a car, you must verify your driving license and ID. Our team will complete the verification within 24 hours.
                    </p>
                </div>

                {/* ERROR / REJECTION ALERT */}
                <div className="bg-red-50 border border-red-200/80 rounded-2xl p-4 flex items-center gap-3 text-red-700 text-xs font-semibold shadow-sm">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span>Your document has been rejected. Reason: The image is not clear. Please upload it again.</span>
                </div>

                {/* DOCUMENT SECTION 1: DRIVING LICENSE (REJECTED) */}
                <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 space-y-3">
                        <h2 className="text-base font-extrabold text-[#2B0938]">Driving License (Front & Back)</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Your license must have an expiry date of at least 6 months from today.
                        </p>
                        <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-[11px] font-bold px-3 py-1 rounded-full border border-red-100">
                            <XCircle className="w-3.5 h-3.5" /> Rejected
                        </span>
                    </div>

                    <div className="lg:col-span-7">
                        <label className="border-2 border-dashed border-gray-200 hover:border-purple-300 bg-gray-50/50 hover:bg-purple-50/20 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-purple-600 mb-2">
                                <UploadCloud className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-gray-800">Click to upload or drag & drop</p>
                            <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, PDF — max 5MB</p>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* DOCUMENT SECTION 2: NATIONAL ID / PASSPORT (PENDING REVIEW) */}
                <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 space-y-3">
                        <h2 className="text-base font-extrabold text-[#2B0938]">National ID / Passport</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Upload a clear image. Blurry images will not be accepted.
                        </p>
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-100">
                            <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending Review
                        </span>
                    </div>

                    <div className="lg:col-span-7">
                        <label className="border-2 border-dashed border-gray-200 hover:border-purple-300 bg-gray-50/50 hover:bg-purple-50/20 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-purple-600 mb-2">
                                <UploadCloud className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-gray-800">Click to upload or drag & drop</p>
                            <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, PDF — max 5MB</p>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* DOCUMENT SECTION 3: VISA / IQAMA (VERIFIED) */}
                <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 space-y-3">
                        <h2 className="text-base font-extrabold text-[#2B0938]">Visa / Iqama</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Required for Gulf countries.
                        </p>
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100">
                            <CheckCircle className="w-3.5 h-3.5" /> Verified
                        </span>
                    </div>

                    <div className="lg:col-span-7">
                        <label className="border-2 border-dashed border-gray-200 hover:border-purple-300 bg-gray-50/50 hover:bg-purple-50/20 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-purple-600 mb-2">
                                <UploadCloud className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-gray-800">Click to upload or drag & drop</p>
                            <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, PDF — max 5MB</p>
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* BOTTOM SUBMIT BUTTON */}
                <div className="flex justify-end pt-2">
                    <button className="bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold px-6 py-3.5 rounded-2xl text-xs flex items-center gap-2 shadow-sm transition">
                        Save & Submit for Verification <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </main>

        </div>
    );
}