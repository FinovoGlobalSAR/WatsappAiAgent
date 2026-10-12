import React from 'react';
import { X, Calendar, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

// Image import from assets
import cartDrawerCarMain from '../assets/cartdrawer-carmain.png';

export default function CartDrawer({ isOpen = true, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">

            {/* Drawer Container */}
            <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">

                {/* Top Header */}
                <div>
                    <div className="flex items-start justify-between pb-4 border-b border-purple-100">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1E002B]">Your Cart (1)</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Review your selected cars</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Cart Item Card */}
                    <div className="mt-6 bg-[#FAF7F2] rounded-3xl p-3 border border-purple-100/50">

                        {/* Car Image with Banner Overlay */}
                        <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm">
                            <img
                                src={cartDrawerCarMain}
                                alt="Lamborghini 2026"
                                className="w-full h-full object-cover"
                            />

                            {/* Trash icon top right overlay */}
                            <button className="absolute top-2.5 right-2.5 p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-full shadow hover:bg-white transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Text overlay over car image */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                                <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                                    Lamborghini 2026
                                </h3>
                                <p className="text-xs font-bold text-[#FFC107] mt-0.5">
                                    SAR 1,000 / Day
                                </p>
                            </div>
                        </div>

                        {/* Date Details */}
                        <div className="flex items-center space-x-2 text-xs text-stone-600 my-3 px-1">
                            <Calendar className="w-4 h-4 text-purple-900" />
                            <span className="font-medium">Apr 10, 2026 – Apr 12, 2026 (2 Days)</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2.5">
                            <button className="py-2.5 rounded-xl border border-purple-200 bg-stone-50/50 text-[#1E002B] font-bold text-xs hover:bg-white transition-all shadow-sm">
                                Edit Details
                            </button>
                            <button className="py-2.5 rounded-xl border border-red-200 bg-red-50/60 text-red-500 font-bold text-xs flex items-center justify-center space-x-1 hover:bg-red-100/50 transition-all shadow-sm">
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>

                    {/* Price Details Block */}
                    <div className="mt-6 bg-[#FAF7F2] rounded-2xl p-4 space-y-2.5">
                        <h4 className="font-bold text-[#1E002B] text-sm">Price Details</h4>

                        <div className="flex justify-between items-center text-xs text-stone-600 pt-1">
                            <span>Rental Charges (2 days)</span>
                            <span className="font-bold text-[#1E002B]">SAR 2,000.00</span>
                        </div>

                        <div className="flex justify-between items-center text-xs text-stone-600">
                            <span>Insurance (Standard)</span>
                            <span className="font-bold text-[#1E002B]">SAR 100.00</span>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA Buttons & Security Note */}
                <div className="mt-6 space-y-3 pt-4 border-t border-purple-50">
                    <button className="w-full py-3.5 rounded-2xl bg-[#F5B400] hover:bg-[#E0A400] text-[#1E002B] font-extrabold text-sm flex items-center justify-center space-x-2 shadow-md transition-all">
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-3.5 rounded-2xl border-2 border-[#3C0F45] text-[#3C0F45] font-bold text-sm hover:bg-purple-50 transition-all"
                    >
                        Continue Shopping
                    </button>

                    {/* Security Badge */}
                    <div className="flex items-start space-x-2 pt-2 text-stone-500">
                        <ShieldCheck className="w-4 h-4 text-purple-800 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[11px] font-bold text-[#1E002B]">Your booking is secure and encrypted</p>
                            <p className="text-[10px] text-stone-400">We use industry-standard security to protect your information.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}