import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, Phone, Mail, MapPin, Clock, ArrowRight, User, 
  MessageSquare, Plus, X, Globe, ShieldCheck, Sun, Calendar 
} from 'lucide-react';

import heroBannerImg from '../assets/contact-hero.jpg'; 
import headOfficeImg from '../assets/head-office.jpg'; 
import downtownShowroomImg from '../assets/showroom-downtown.jpg'; 
import airportShowroomImg from '../assets/showroom-airport.jpg'; 
import businessShowroomImg from '../assets/showroom-business.jpg'; 

export default function AboutContact() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-800 overflow-x-hidden">
      
      {/* 1. TOP NAVBAR */}
      <nav className="bg-[#2D0A3A] text-white px-6 md:px-12 py-4 flex items-center justify-between border-b border-purple-950/40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="bg-purple-600/40 p-2 rounded-xl backdrop-blur-md border border-purple-400/30">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">Finovo</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-200">
          <button onClick={() => navigate('/dashboard')} className="hover:text-amber-400 transition">Home</button>
          <button onClick={() => navigate('/dashboard')} className="hover:text-amber-400 transition">Cars</button>
          <button className="hover:text-amber-400 transition">Insurance</button>
          <button onClick={() => navigate('/about')} className="hover:text-amber-400 transition">About Us</button>
          <button className="hover:text-amber-400 transition">AI-Inspection</button>
          <button className="text-amber-400 font-bold border-b-2 border-amber-400 pb-0.5">Contact</button>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle pill UI */}
          <div className="bg-purple-950/80 p-1 rounded-full border border-purple-800 flex items-center gap-2 px-2 text-xs">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <div className="w-3 h-3 bg-white/30 rounded-full" />
          </div>

          <div className="bg-purple-900/60 p-1.5 rounded-full flex items-center gap-2 border border-purple-700/50 text-xs px-3 cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-slate-300" />
            <span>EN</span>
          </div>
          
          <button onClick={() => navigate('/login1')} className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            Login / My Booking
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION WITH EXACT CURVED IMAGE LAYOUT */}
      <section className="relative bg-white pt-6 pb-24 px-4 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative rounded-[40px] overflow-hidden min-h-[460px] flex flex-col md:flex-row items-center">
          
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <img src={heroBannerImg} alt="Contact Hero" className="w-full h-full object-cover object-right" />
            
            {/* Custom SVG Curve Mask for Left Side Dark Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#21052B] via-[#350B44] to-transparent w-full md:w-[65%]"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
              }}
            />
          </div>

          {/* Left Text Content Area */}
          <div className="relative z-10 text-white p-8 md:p-14 max-w-2xl space-y-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300 font-bold">
              WE'RE ALWAYS HERE FOR YOU
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
              Get in touch
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-md">
              We're here to help with your bookings and questions — our team replies fast, every day of the week.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 text-left border-t border-purple-800/60 max-w-lg">
              <div className="flex items-start gap-2.5">
                <Car className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold leading-snug">Real people, real help</p>
                  <p className="text-[10px] text-slate-400">Friendly support team</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold leading-snug">Within 24 hours</p>
                  <p className="text-[10px] text-slate-400">Quick response</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold leading-snug">Your journey</p>
                  <p className="text-[10px] text-slate-400">Is our priority</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cursive Text Banner on Image */}
          <div className="absolute right-12 bottom-10 z-10 hidden lg:block font-serif italic text-3xl md:text-4xl text-white drop-shadow-lg tracking-wide">
            Let's Drive Together
          </div>

        </div>

        {/* 3 Floating Contact Cards (Overlapping Hero) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 -mt-16 px-4">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-amber-100/70 p-3.5 rounded-2xl text-amber-800 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Call Us</p>
              <p className="text-sm font-black text-slate-800 my-0.5">+1 (123) 456-7890</p>
              <p className="text-[11px] text-slate-400">Mon–Sat, 9am – 8pm</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-purple-100/80 p-3.5 rounded-2xl text-purple-900 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Email Us</p>
              <p className="text-sm font-black text-slate-800 my-0.5">support@finovo.com</p>
              <p className="text-[11px] text-slate-400">We reply within 24 hours</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="bg-amber-100/70 p-3.5 rounded-2xl text-amber-800 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Visit Us</p>
              <p className="text-sm font-black text-slate-800 my-0.5">123 Finovo Lane, Suite 100</p>
              <p className="text-[11px] text-slate-400">Head Office • City, State, ZIP</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MESSAGE FORM & HEAD OFFICE */}
      <section className="pt-12 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Send us a Message</h2>
              <p className="text-xs text-slate-400 mt-1">Fill out the form and our team will get back to you shortly.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Full Name <span className="text-amber-500">*</span></label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Jordan Ahmed" defaultValue="Jordan Ahmed" className="w-full bg-slate-100/70 border-none rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Email Address <span className="text-amber-500">*</span></label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="email" placeholder="jordan@email.com" defaultValue="jordan@email.com" className="w-full bg-slate-100/70 border-none rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="+1 (123) 456-7890" className="w-full bg-slate-100/70 border-none rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Subject <span className="text-amber-500">*</span></label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Booking enquiry" defaultValue="Booking enquiry" className="w-full bg-slate-100/70 border-none rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-bold text-slate-700">Message <span className="text-amber-500">*</span></label>
                <textarea rows="4" placeholder="Tell us how we can help you..." className="w-full bg-slate-100/70 border-none rounded-xl p-4 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold py-3.5 rounded-xl text-xs shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer">
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Head Office</h2>
              <p className="text-xs text-slate-400 mt-1">Drop by or find us at our main location.</p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-md h-[430px] group">
              <img src={headOfficeImg} alt="Finovo Head Office" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0322]/90 via-[#1A0322]/30 to-transparent" />

              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="bg-purple-900 p-2 rounded-xl text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Finovo Head Office</p>
                  <p className="text-[10px] text-slate-500">123 Finovo Lane, Suite 100, City, State</p>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <h3 className="text-xl font-bold tracking-wide">Premium service starts here</h3>
                <p className="text-xs text-slate-300">Visit our office or any showroom across the city.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR LOCATIONS */}
      <section className="bg-[#E5D2BE] py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-900 font-bold">OUR LOCATIONS</p>
            <h2 className="text-3xl font-black text-[#2D0A3A] tracking-tight mt-1">Find Us Across the City</h2>
            <p className="text-xs text-slate-700 mt-1">Visit your nearest showroom and experience Finovo in person.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img src={downtownShowroomImg} alt="Downtown Showroom" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Open Now
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">Downtown Showroom</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" /> 45 Main Boulevard, Downtown, City
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" /> +1 (123) 456-7890
                  </p>
                  <div className="pt-2">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-full inline-block">
                      🚗 15+ Cars Available
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full border border-slate-300 hover:border-slate-900 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                  Get Directions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img src={airportShowroomImg} alt="Airport Branch" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Open Now
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">Airport Branch</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Terminal 2, International Airport Road
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" /> +1 (123) 456-7891
                  </p>
                  <div className="pt-2">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-full inline-block">
                      🚗 20+ Cars Available
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full border border-slate-300 hover:border-slate-900 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                  Get Directions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img src={businessShowroomImg} alt="Business Bay Showroom" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> 24/7
                  </span>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">Business Bay Showroom</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" /> 12 Business Bay, Financial District
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" /> +1 (123) 456-7892
                  </p>
                  <div className="pt-2">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-full inline-block">
                      🚗 25+ Cars Available
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="w-full border border-slate-300 hover:border-slate-900 text-slate-900 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer">
                  Get Directions <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="text-center pt-4">
            <button className="bg-[#2D0A3A] hover:bg-[#1f0629] text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-lg transition inline-flex items-center gap-2 cursor-pointer">
              View All Locations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Still Have Questions?
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Find quick answers to common questions about our services, bookings, and policies.
            </p>
            <div className="pt-2">
              <button className="text-xs font-bold text-purple-900 hover:underline inline-flex items-center gap-2 cursor-pointer">
                <MessageSquare className="w-4 h-4" /> Chat with support
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <button onClick={() => toggleFaq(1)} className="w-full flex items-center justify-between text-left py-2 gap-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-amber-400 text-slate-900 font-extrabold text-xs rounded-full flex items-center justify-center shrink-0">1</span>
                  <span className="text-sm font-bold text-slate-900">How do I modify my booking?</span>
                </div>
                {openFaq === 1 ? <X className="w-5 h-5 bg-amber-400 text-slate-900 rounded-full p-1 shrink-0" /> : <Plus className="w-5 h-5 bg-slate-200 text-slate-700 rounded-full p-1 shrink-0" />}
              </button>
              {openFaq === 1 && (
                <p className="text-xs text-slate-500 leading-relaxed pt-2 pl-10 pr-4">
                  You can modify your booking by logging into your account or contacting our support team at least 24 hours in advance. Changes made after that window may incur a small fee.
                </p>
              )}
            </div>

            <div className="border-b border-slate-200 pb-4">
              <button onClick={() => toggleFaq(2)} className="w-full flex items-center justify-between text-left py-2 gap-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center shrink-0">2</span>
                  <span className="text-sm font-bold text-slate-900">What documents are required to rent a car?</span>
                </div>
                {openFaq === 2 ? <X className="w-5 h-5 bg-amber-400 text-slate-900 rounded-full p-1 shrink-0" /> : <Plus className="w-5 h-5 bg-slate-200 text-slate-700 rounded-full p-1 shrink-0" />}
              </button>
              {openFaq === 2 && (
                <p className="text-xs text-slate-500 leading-relaxed pt-2 pl-10 pr-4">
                  You need a valid driver's license, passport or national ID, and a valid credit card in the driver's name for deposit verification.
                </p>
              )}
            </div>

            <div className="border-b border-slate-200 pb-4">
              <button onClick={() => toggleFaq(3)} className="w-full flex items-center justify-between text-left py-2 gap-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center shrink-0">3</span>
                  <span className="text-sm font-bold text-slate-900">Do you offer airport pickup and drop-off?</span>
                </div>
                {openFaq === 3 ? <X className="w-5 h-5 bg-amber-400 text-slate-900 rounded-full p-1 shrink-0" /> : <Plus className="w-5 h-5 bg-slate-200 text-slate-700 rounded-full p-1 shrink-0" />}
              </button>
              {openFaq === 3 && (
                <p className="text-xs text-slate-500 leading-relaxed pt-2 pl-10 pr-4">
                  Yes, we provide 24/7 airport pickup and drop-off services at all major airport branches. Select airport location during checkout.
                </p>
              )}
            </div>

            <div className="border-b border-slate-200 pb-4">
              <button onClick={() => toggleFaq(4)} className="w-full flex items-center justify-between text-left py-2 gap-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-slate-200 text-slate-700 font-bold text-xs rounded-full flex items-center justify-center shrink-0">4</span>
                  <span className="text-sm font-bold text-slate-900">Can I cancel a reservation for free?</span>
                </div>
                {openFaq === 4 ? <X className="w-5 h-5 bg-amber-400 text-slate-900 rounded-full p-1 shrink-0" /> : <Plus className="w-5 h-5 bg-slate-200 text-slate-700 rounded-full p-1 shrink-0" />}
              </button>
              {openFaq === 4 && (
                <p className="text-xs text-slate-500 leading-relaxed pt-2 pl-10 pr-4">
                  Cancellations are 100% free up to 48 hours before your scheduled rental pick-up time.
                </p>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 6. DASHBOARD FOOTER */}
      <footer className="bg-[#2D0A3A] text-white pt-16 pb-12 rounded-t-[48px] px-6 md:px-16 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600/40 p-2.5 rounded-2xl border border-purple-400/30">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-wide">Finovo</span>
            </div>
            <p className="text-xs text-slate-300 font-medium pt-2">
              Social Links
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">About</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Features</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Contact</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>support@finovo.com</p>
              <p>+1 (123) 456-7890</p>
              <p className="text-slate-400 leading-relaxed pt-1">
                123 Finovo Lane, Suite 100, City, State, ZIP
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">App Coming Soon</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Get our car rental app soon to search, book, and manage your ride anytime, anywhere.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                <span> Available on the App Store</span>
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
                <span>▶ Get it on Google Play</span>
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-purple-900/60 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 Finovo Car Rental System. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}