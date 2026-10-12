import React from 'react';
import { Star, Heart, ChevronRight, ArrowRight } from 'lucide-react';

// Assets images import
import favYellowCar from '../assets/fav-yellow-car.png';
import favBlueCar from '../assets/fav-blue-car.png';

export default function FavDropDown({ isOpen = true }) {
    if (!isOpen) return null;

    const favourites = [
        {
            id: 1,
            name: 'Lamborghini 2026',
            rating: '4.8',
            price: 'SAR 1,000 / Day',
            img: favYellowCar,
        },
        {
            id: 2,
            name: 'BMW 520i 2026',
            rating: '4.7',
            price: 'SAR 500 / Day',
            img: favBlueCar,
        },
    ];

    return (
        <div className="w-[380px] bg-white rounded-3xl p-5 shadow-2xl border border-purple-50/50">

            {/* Header Section */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                    <h3 className="text-xl font-bold text-[#1F0A27]">
                        My Favourites <span className="text-[#6B21A8]">(2)</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Saved cars for your next journey
                    </p>
                </div>
                <button className="px-4 py-1.5 bg-[#F4EFE6] text-[#2D0C38] text-xs font-bold rounded-full hover:bg-[#eae3d5] transition-colors">
                    View All
                </button>
            </div>

            {/* Favourites List */}
            <div className="divide-y divide-gray-100">
                {favourites.map((car) => (
                    <div key={car.id} className="flex items-center justify-between py-4 group cursor-pointer">

                        {/* Left: Thumbnail & Info */}
                        <div className="flex items-center space-x-3">
                            <div className="w-20 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                <img
                                    src={car.img}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-[#1F0A27] leading-tight">
                                    {car.name}
                                </h4>

                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="flex items-center text-amber-400 text-xs font-semibold">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                                        <span className="text-gray-600">{car.rating}</span>
                                    </div>
                                    <span className="text-gray-300 text-xs">|</span>
                                    <span className="text-xs font-bold text-[#3B0E47]">
                                        {car.price}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Heart Icon & Chevron */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            </div>
                            <ChevronRight className="w-4 h-4 text-purple-900/60" />
                        </div>

                    </div>
                ))}
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
                <button className="w-full py-3.5 rounded-2xl bg-[#2D0C38] hover:bg-[#200829] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all">
                    <span>View All Favourites</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

        </div>
    );
}