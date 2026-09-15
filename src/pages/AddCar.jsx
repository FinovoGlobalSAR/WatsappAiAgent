import React, { useState } from 'react';
import { 
  LayoutDashboard, Car, LogOut, Sun, Search, Bell, HelpCircle, 
  FileText, Settings, Tag, MessageSquare, Upload, Eye, Globe, Check, Plus, Minus 
} from 'lucide-react';

export default function AddCar() {
  // Form States
  const [transmission, setTransmission] = useState('Automatic');
  const [fuelType, setFuelType] = useState('Petrol');
  const [seats, setSeats] = useState(5);
  const [doors, setDoors] = useState(4);
  const [status, setStatus] = useState('Available');
  const [showInCatalog, setShowInCatalog] = useState(true);
  const [availableFor, setAvailableFor] = useState(['Daily', 'Weekly', 'Monthly']);

  const toggleAvailableFor = (type) => {
    if (availableFor.includes(type)) {
      setAvailableFor(availableFor.filter(item => item !== type));
    } else {
      setAvailableFor([...availableFor, type]);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F6F9] font-sans text-slate-800">
      
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-64 bg-[#1F0322] text-white flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold text-[#1F0322] text-xl">
              F
            </div>
            <span className="text-2xl font-bold tracking-wide">Finovo</span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 font-medium text-sm transition">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#330837] text-white rounded-xl font-medium text-sm">
              <Car className="w-5 h-5" />
              <span>Cars</span>
            </a>
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="space-y-4 pt-6 border-t border-white/10 text-sm">
          <button className="flex items-center gap-3 text-slate-300 hover:text-white w-full px-2 py-1">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>

          <div className="flex items-center justify-between text-slate-300 px-2 pt-2">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5" />
              <span className="text-xs">Light mode</span>
            </div>
            <div className="w-10 h-6 bg-slate-300 rounded-full p-1 cursor-pointer flex items-center justify-start">
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Car</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Add Car</span>
          </div>

          {/* Search Bar */}
          <div className="relative w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search car, customers, items..." 
              className="w-full bg-slate-100/80 text-xs pl-10 pr-8 py-2 rounded-xl outline-none focus:ring-1 focus:ring-purple-900/20 text-slate-700"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 border border-slate-300 rounded px-1.5 py-0.5">/</span>
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-800 relative">
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 -right-0.5" />
            </button>
            <button className="text-slate-500 hover:text-slate-800">
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1F0322] text-white flex items-center justify-center text-xs font-bold">
              NR
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <main className="p-8 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Breadcrumb & Top Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 mb-1">Cars &gt; Add a car</div>
              <h1 className="text-3xl font-extrabold text-slate-900">Add a Car</h1>
              <p className="text-xs text-slate-500 mt-1">Add a new vehicle to your fleet. Fill in the detail below to get started.</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold flex items-center gap-1.5 transition shadow-sm">
                <Check className="w-4 h-4" /> Save car
              </button>
            </div>
          </div>

          {/* TWO COLUMN FORM LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT FORM COLUMN (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* SECTION 1: IDENTIFICATION */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Identification</h3>
                    <p className="text-[11px] text-slate-400">Basic information about the vehicle</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Brand <span className="text-red-500">*</span></label>
                    <select className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-slate-300">
                      <option>Select brand</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Category <span className="text-red-500">*</span></label>
                    <select className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2.5 text-xs text-slate-600 outline-none focus:border-slate-300">
                      <option>Select category</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Model <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. Corolla" className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-300" />
                    <span className="text-[10px] text-slate-400 mt-1 block">Max 100 chars</span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Year <span className="text-red-500">*</span></label>
                    <select defaultValue="2026" className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-slate-300">
                      <option>2026</option>
                      <option>2025</option>
                      <option>2024</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Registration Number <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. ABC-1234" className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-300" />
                  <span className="text-[10px] text-slate-400 mt-1 block">Max 50 chars</span>
                </div>
              </div>

              {/* SECTION 2: SPECIFICATIONS */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Specifications</h3>
                    <p className="text-[11px] text-slate-400">Technical details and features</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Transmission */}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-2">Transmission <span className="text-red-500">*</span></label>
                    <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                      <button 
                        type="button"
                        onClick={() => setTransmission('Automatic')}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${transmission === 'Automatic' ? 'bg-[#2A052E] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Automatic
                      </button>
                      <button 
                        type="button"
                        onClick={() => setTransmission('Manual')}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${transmission === 'Manual' ? 'bg-[#2A052E] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Manual
                      </button>
                    </div>
                  </div>

                  {/* Fuel type */}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-2">Fuel type <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((fuel) => (
                        <button
                          key={fuel}
                          type="button"
                          onClick={() => setFuelType(fuel)}
                          className={`px-3 py-2 rounded-full text-xs font-semibold border transition ${fuelType === fuel ? 'bg-white border-purple-900 text-purple-900 ring-2 ring-purple-900/10' : 'bg-slate-100/80 border-transparent text-slate-600'}`}
                        >
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Seats */}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-2">Seats <span className="text-red-500">*</span></label>
                    <div className="flex items-center bg-slate-100/80 rounded-xl p-1 w-36 border border-slate-200/50">
                      <button onClick={() => setSeats(Math.max(1, seats - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="flex-1 text-center text-xs font-bold text-slate-800">{seats}</span>
                      <button onClick={() => setSeats(seats + 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Doors */}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-2">Doors</label>
                    <div className="flex items-center bg-slate-100/80 rounded-xl p-1 w-36 border border-slate-200/50">
                      <button onClick={() => setDoors(Math.max(1, doors - 1))} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="flex-1 text-center text-xs font-bold text-slate-800">{doors}</span>
                      <button onClick={() => setDoors(doors + 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Color */}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Color</label>
                    <div className="flex gap-2">
                      <div className="w-9 h-9 rounded-xl border border-slate-300 bg-white shadow-sm shrink-0" />
                      <select className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2 text-xs text-slate-600 outline-none">
                        <option>Select color</option>
                      </select>
                    </div>
                  </div>

                  {/* Mileage */}
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Mileage <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. 15000" className="w-full bg-slate-100/70 border border-transparent rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none" />
                    <span className="text-[10px] text-slate-400 mt-1 block">Max 50 chars</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: PRICING & AVAILABILITY */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Pricing & availability</h3>
                    <p className="text-[11px] text-slate-400">Set the rental rate and availability status.</p>
                  </div>
                </div>

                {/* Available For Pills */}
                <div>
                  <label className="text-xs font-medium text-slate-800 block mb-1">Available For</label>
                  <p className="text-[10px] text-slate-400 mb-3">Select the rental periods this vehicle can be booked for</p>
                  <div className="flex gap-3">
                    {['Daily', 'Weekly', 'Monthly'].map((type) => {
                      const isSelected = availableFor.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleAvailableFor(type)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${isSelected ? 'bg-[#2A052E] text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rates inputs */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Daily Rate ($) <span className="text-red-500">*</span></label>
                    <div className="bg-slate-100/70 px-3 py-2.5 rounded-xl flex items-center justify-between text-xs text-slate-500">
                      <span>$ 0.00</span>
                      <span className="text-slate-400 text-[10px]">/day</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Weekly Rate <span className="text-red-500">*</span></label>
                    <div className="bg-slate-100/70 px-3 py-2.5 rounded-xl flex items-center justify-between text-xs text-slate-500">
                      <span>$ 0.00</span>
                      <span className="text-slate-400 text-[10px]">/Week</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Monthly Rate <span className="text-red-500">*</span></label>
                    <div className="bg-slate-100/70 px-3 py-2.5 rounded-xl flex items-center justify-between text-xs text-slate-500">
                      <span>$ 0.00</span>
                      <span className="text-slate-400 text-[10px]">/Month</span>
                    </div>
                  </div>
                </div>

                {/* Status selection cards */}
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-2">Status</label>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Available */}
                    <div 
                      onClick={() => setStatus('Available')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition ${status === 'Available' ? 'bg-emerald-50/50 border-emerald-500' : 'bg-slate-100/60 border-transparent'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] mb-2">✓</div>
                      <p className="text-xs font-bold text-slate-900">Available</p>
                      <p className="text-[10px] text-emerald-700 font-medium">Ready for rent</p>
                    </div>

                    {/* Rented */}
                    <div 
                      onClick={() => setStatus('Rented')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition ${status === 'Rented' ? 'bg-blue-50/50 border-blue-500' : 'bg-slate-100/60 border-transparent'}`}
                    >
                      <div className="w-3 h-3 rounded-full bg-blue-600 mb-2" />
                      <p className="text-xs font-bold text-slate-900">Rented</p>
                      <p className="text-[10px] text-slate-400 font-medium">Currently rented</p>
                    </div>

                    {/* Maintenance */}
                    <div 
                      onClick={() => setStatus('Maintenance')}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition ${status === 'Maintenance' ? 'bg-amber-50/50 border-amber-500' : 'bg-slate-100/60 border-transparent'}`}
                    >
                      <div className="w-3 h-3 rounded-full bg-amber-500 mb-2" />
                      <p className="text-xs font-bold text-slate-900">Maintenance</p>
                      <p className="text-[10px] text-slate-400 font-medium">Under service</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DESCRIPTION */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Description</h3>
                    <p className="text-[11px] text-slate-400">Add notes and additional information about this vehicle</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Notes</label>
                  <textarea 
                    rows={4} 
                    placeholder="Condition, history, standout features..." 
                    className="w-full bg-slate-100/70 border border-transparent rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 outline-none resize-y"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* PHOTO UPLOAD BOX */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Photo</h3>
                    <p className="text-[11px] text-slate-400">Add a high-quality photo of the vehicle</p>
                  </div>
                </div>

                {/* Drag and Drop Box */}
                <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center bg-purple-50/20 space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl text-purple-900 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 font-medium">
                      Drag a photo here or <span className="text-purple-900 font-bold underline cursor-pointer">browse</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or WEBP (max 10MB)</p>
                  </div>
                  <button className="bg-white border border-slate-200 shadow-sm text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs hover:bg-slate-50 transition">
                    Choose file
                  </button>
                </div>
              </div>

              {/* LIVE PREVIEW BOX */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Live preview</h3>
                    <p className="text-[11px] text-slate-400">This is how the car will appear in the catalog.</p>
                  </div>
                </div>

                <div className="bg-slate-100/80 rounded-2xl p-8 text-center space-y-3">
                  <div className="w-16 h-12 text-slate-300 mx-auto flex items-center justify-center">
                    <Car className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Your car preview will appear here</p>
                    <p className="text-[10px] text-slate-400 max-w-[200px] mx-auto mt-1">
                      Fill in vehicle details and upload a photo to see a live preview
                    </p>
                  </div>
                </div>
              </div>

              {/* SHOW IN PUBLIC CATALOG TOGGLE */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Show in public catalog</h4>
                    <p className="text-[10px] text-slate-400">When enabled, this car will be visible to customers.</p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div 
                  onClick={() => setShowInCatalog(!showInCatalog)} 
                  className={`w-11 h-6 rounded-full p-1 cursor-pointer transition ${showInCatalog ? 'bg-[#2A052E]' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition ${showInCatalog ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}