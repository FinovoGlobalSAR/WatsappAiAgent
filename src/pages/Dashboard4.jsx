import React, { useState } from 'react';
import {
    LayoutDashboard, Calendar, FileText, CreditCard, Settings,
    HelpCircle, LogOut, Bell, ChevronDown, User, Lock,
    Sun, PhoneCall, Edit3, EyeOff, Calendar as CalendarIcon, Check
} from 'lucide-react';

export default function Dashboard4() {
    const [activeTab, setActiveTab] = useState('Settings');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(true);

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
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-400 text-[#2B0938] font-extrabold flex items-center justify-center text-sm">
                                AK
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white">Ahmed Khan</h4>
                                <p className="text-[10px] text-amber-300 flex items-center gap-1">
                                    👑 Gold Member
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

                {/* HERO BANNER - ACCOUNT SETTINGS */}
                <section className="bg-gradient-to-r from-purple-100/70 via-purple-50/50 to-indigo-50/70 rounded-[28px] p-8 border border-purple-100 flex justify-between items-center relative overflow-hidden">
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-bold tracking-widest text-purple-600 uppercase">YOUR ACCOUNT</p>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#2B0938]">Account Settings</h1>
                        <p className="text-xs text-gray-500">Manage your personal information, security, preferences and more.</p>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-sm font-extrabold text-[#2B0938]">Your account,<br />your control</span>
                        <div className="w-12 h-12 bg-purple-200/60 rounded-2xl flex items-center justify-center text-purple-700">
                            <Settings className="w-6 h-6" />
                        </div>
                    </div>
                </section>

                {/* 2-COLUMN GRID SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* PERSONAL INFORMATION CARD */}
                    <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-[#2B0938]">Personal Information</h2>
                                <p className="text-[11px] text-gray-400">Update your personal details.</p>
                            </div>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Ahmed Khan"
                                    className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 font-semibold focus:outline-none focus:border-purple-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="ahmed@mail.com"
                                    className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 font-semibold focus:outline-none focus:border-purple-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                                <div className="flex items-center bg-gray-50/60 border border-gray-200 rounded-2xl px-3 py-2">
                                    <span className="bg-emerald-800 text-white text-[10px] font-extrabold px-2 py-1 rounded-md mr-2 flex items-center gap-1">
                                        🇸🇦 SAU
                                    </span>
                                    <input
                                        type="text"
                                        defaultValue="+966 123 456 789"
                                        className="w-full bg-transparent text-xs text-gray-800 font-semibold focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">Date of Birth</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        defaultValue="01/01/1990"
                                        className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 font-semibold focus:outline-none focus:border-purple-400"
                                    />
                                    <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            <button className="bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold px-5 py-3 rounded-2xl text-xs transition shadow-sm">
                                Update Information
                            </button>
                        </form>
                    </div>

                    {/* SECURITY CARD */}
                    <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-extrabold text-[#2B0938]">Security</h2>
                                    <p className="text-[11px] text-gray-400">Keep your account safe.</p>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Current Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Enter your current password"
                                            className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 focus:outline-none focus:border-purple-400"
                                        />
                                        <EyeOff className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">New Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 focus:outline-none focus:border-purple-400"
                                        />
                                        <EyeOff className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 focus:outline-none focus:border-purple-400"
                                        />
                                        <EyeOff className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
                                    </div>
                                </div>

                                {/* Password Rules Box */}
                                <div className="bg-purple-50/50 rounded-2xl p-4 space-y-2 text-xs">
                                    <p className="font-bold text-[#2B0938]">Password must contain:</p>
                                    <div className="space-y-1 text-gray-600 text-[11px]">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-purple-600" />
                                            <span>At least 8 characters</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-purple-600" />
                                            <span>A mix of letters and numbers</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-purple-600" />
                                            <span>One special character (e.g. ! @ # $)</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button className="bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold px-5 py-3 rounded-2xl text-xs transition shadow-sm">
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* PREFERENCES CARD */}
                    <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                                <Sun className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-extrabold text-[#2B0938]">Preferences</h2>
                                <p className="text-[11px] text-gray-400">Customize your experience.</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs">
                            {/* Language Dropdown */}
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-bold text-gray-800">Language</span>
                                <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 font-semibold text-gray-700 text-xs outline-none cursor-pointer">
                                    <option>English</option>
                                    <option>Arabic</option>
                                </select>
                            </div>

                            {/* Currency Dropdown */}
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="font-bold text-gray-800">Currency</span>
                                <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 font-semibold text-gray-700 text-xs outline-none cursor-pointer">
                                    <option>SAR (Saudi Riyal)</option>
                                    <option>USD ($)</option>
                                </select>
                            </div>

                            {/* Email Toggle */}
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <div>
                                    <p className="font-bold text-gray-800">Email Notifications</p>
                                    <p className="text-[11px] text-gray-400">Receive booking updates, offers and news</p>
                                </div>
                                <button
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${emailNotifications ? 'bg-amber-400 justify-end' : 'bg-gray-300 justify-start'
                                        }`}
                                >
                                    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                                </button>
                            </div>

                            {/* SMS Toggle */}
                            <div className="flex justify-between items-center py-2">
                                <div>
                                    <p className="font-bold text-gray-800">SMS Notifications</p>
                                    <p className="text-[11px] text-gray-400">Receive important alerts via SMS</p>
                                </div>
                                <button
                                    onClick={() => setSmsNotifications(!smsNotifications)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${smsNotifications ? 'bg-amber-400 justify-end' : 'bg-gray-300 justify-start'
                                        }`}
                                >
                                    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* EMERGENCY CONTACT CARD */}
                    <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-sm space-y-5 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                                    <PhoneCall className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-extrabold text-[#2B0938]">Emergency Contact</h2>
                                    <p className="text-[11px] text-gray-400">Someone we can reach in case of an emergency.</p>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Contact Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Ali Khan"
                                        className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-800 font-semibold focus:outline-none focus:border-purple-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                                    <div className="flex items-center bg-gray-50/60 border border-gray-200 rounded-2xl px-3 py-2">
                                        <span className="bg-emerald-800 text-white text-[10px] font-extrabold px-2 py-1 rounded-md mr-2 flex items-center gap-1">
                                            🇸🇦 SAU
                                        </span>
                                        <input
                                            type="text"
                                            defaultValue="+966 987 654 321"
                                            className="w-full bg-transparent text-xs text-gray-800 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Relation</label>
                                    <select className="w-full bg-gray-50/60 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-semibold text-gray-800 outline-none cursor-pointer">
                                        <option>Brother</option>
                                        <option>Father</option>
                                        <option>Mother</option>
                                        <option>Friend</option>
                                        <option>Spouse</option>
                                    </select>
                                </div>
                            </form>
                        </div>

                        <div className="pt-2">
                            <button className="bg-amber-400 hover:bg-amber-500 text-[#2B0938] font-extrabold px-5 py-3 rounded-2xl text-xs transition shadow-sm">
                                Save Emergency Contact
                            </button>
                        </div>
                    </div>

                </div>

            </main>

        </div>
    );
}