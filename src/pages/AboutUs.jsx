import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Car, 
  Headphones, 
  CalendarCheck, 
  Globe, 
  User, 
  Moon, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

// Images Import from Assets
import heroCarImg from '../assets/hero-car.jpg';
import storyCarImg from '../assets/story-car.jpg';
import targetIcon from '../assets/target-icon.png';
import eyeIcon from '../assets/eye-icon.png';
import team1 from '../assets/team-1.jpg';
import team2 from '../assets/team-2.jpg';
import team3 from '../assets/team-3.jpg';
import ctaCarImg from '../assets/cta-car.jpg';

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F3F8] text-slate-800 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* ==================== NAVBAR ==================== */}
      <nav className="bg-[#2E0038] text-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-white p-1.5 rounded-lg">
            <Car className="w-6 h-6 text-[#2E0038]" />
          </div>
          <span className="text-xl font-bold tracking-tight">Finovo</span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <Link to="/cars" className="hover:text-amber-400 transition-colors">Cars</Link>
          <Link to="/insurance" className="hover:text-amber-400 transition-colors">Insurance</Link>
          <Link to="/about" className="text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5">About Us</Link>
          <Link to="/ai-inspection" className="hover:text-amber-400 transition-colors">AI-Inspection</Link>
          <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 bg-purple-950 rounded-full hover:bg-purple-900 transition-colors">
            <Moon className="w-4 h-4 text-amber-300" />
          </button>
          <div className="hidden sm:flex items-center text-xs space-x-1 cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>EN</span>
          </div>
          <button 
            onClick={() => navigate('/login')} 
            className="flex items-center space-x-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login / My Booking</span>
          </button>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-[#2E0038] text-white pt-12 pb-24 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-purple-300">
              ABOUT FINOVO
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Driven by People. <br />
              <span className="text-white">Built for Better Journeys.</span>
            </h1>
            <p className="text-purple-200/80 text-sm md:text-base leading-relaxed max-w-lg">
              At Finovo, we believe every journey should be simple, safe and extraordinary. We're more than a car rental platform — we're your trusted mobility partner.
            </p>

            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center space-x-2 bg-[#FFD700] text-[#2E0038] font-bold px-6 py-3 rounded-full hover:bg-amber-300 transition-all shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-800/60">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">10K+</h3>
                <p className="text-xs text-purple-300 mt-1">Happy customers</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">500+</h3>
                <p className="text-xs text-purple-300 mt-1">Premium cars</p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">25+</h3>
                <p className="text-xs text-purple-300 mt-1">Cities & locations</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-purple-700/30 group">
              <img 
                src={heroCarImg} 
                alt="Finovo Luxury Car" 
                className="w-full h-[380px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Handwritten Tagline overlay */}
              <div className="absolute bottom-6 right-8 text-right">
                <span className="text-3xl md:text-4xl font-serif italic text-white drop-shadow-md tracking-wide">
                  More <br /> Than a Ride
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== OUR STORY SECTION ==================== */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-purple-700 tracking-wider uppercase">
              OUR STORY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2E0038] leading-tight">
              A Smarter Way to <br /> Move Forward
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Finovo was founded with a simple idea — to make car rentals effortless, reliable, and accessible for everyone. What started as a small team with a big vision has now grown into a trusted brand, serving thousands of happy customers across the region.
            </p>
          </div>

          {/* Right Image + Floating Card */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img 
                src={storyCarImg} 
                alt="Driving experience" 
                className="w-full h-[320px] md:h-[380px] object-cover" 
              />

              {/* Floating Experience Badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-[220px] border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Year of Experience</p>
                <div className="text-4xl font-extrabold text-[#2E0038] my-1">8+</div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Eight years of helping travelers explore more with trust, comfort, and convenience.
                </p>
              </div>

              {/* Side Vertical Text Accent */}
              <div className="absolute right-4 top-8 hidden md:block text-[10px] tracking-widest text-white/70 uppercase font-semibold rotate-90 origin-top-right">
                PEOPLE • PLACES • POSSIBILITIES
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== MISSION & VISION SECTION ==================== */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-b from-[#F5F3F8] to-purple-50/50">
        <div className="max-w-6xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2E0038]">
            Our Mission & Vision
          </h2>
          <p className="text-slate-500 text-sm">
            Guided by purpose. Driven by a better tomorrow.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
          
          {/* Mission Card */}
          <div className="bg-[#4C126B] text-white p-8 rounded-3xl shadow-xl flex items-center space-x-6 relative overflow-hidden group">
            <div className="w-24 h-24 flex-shrink-0">
              <img src={targetIcon} alt="Mission Target" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Mission</h3>
              <p className="text-purple-100/80 text-xs md:text-sm leading-relaxed">
                To provide seamless, affordable, and reliable car rental services that empower our customers to explore with confidence and comfort.
              </p>
            </div>
          </div>

          {/* Infinity Center Divider (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-purple-200 items-center justify-center z-20 text-[#2E0038] font-bold text-xl">
            ∞
          </div>

          {/* Vision Card */}
          <div className="bg-[#EAE0D5] text-[#2E0038] p-8 rounded-3xl shadow-xl flex items-center space-x-6 relative overflow-hidden group">
            <div className="w-24 h-24 flex-shrink-0">
              <img src={eyeIcon} alt="Vision Eye" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Vision</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                To become the most trusted and preferred mobility partner in the region, known for our exceptional fleet and customer-first approach.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== WHY CHOOSE US ==================== */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2E0038]">
              Why Choose Us
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              More than a rental. A better way to travel.
            </p>
          </div>
          <span className="text-sm font-serif italic text-purple-700 mt-2 md:mt-0">
            Small Details, Big Journeys
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2E0038]">Trust & Transparency</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  No hidden fees, clear pricing, and honest service every step of the way.
                </p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-[#2E0038] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2E0038]">Premium Fleet</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Well-maintained, latest models, and fully insured vehicles.
                </p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-[#2E0038] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2E0038]">24/7 Support</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our team is always available to help you, anywhere on the road.
                </p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-[#2E0038] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-100 flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#2E0038]">Easy Booking</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quick, hassle-free booking with flexible plans and instant confirmation.
                </p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-[#2E0038] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section className="py-20 px-6 md:px-16 bg-[#EDE7F6]/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2E0038]">
                The People Behind Your Perfect Ride
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                A passionate team dedicated to making every journey extraordinary.
              </p>
            </div>
            <span className="text-sm font-serif italic text-purple-700 mt-2 md:mt-0">
              Great People, Greater Journeys
            </span>
          </div>

          {/* Polaroid Style Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Team Member 1 */}
            <div className="bg-white p-4 rounded-xl shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-300 relative group">
              <div className="w-12 h-4 bg-amber-300/80 absolute -top-2 left-1/2 -translate-x-1/2 rounded-sm shadow-sm z-10"></div>
              <div className="overflow-hidden rounded-lg">
                <img src={team1} alt="Ahmed Khan" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="text-center pt-4 pb-2">
                <h4 className="font-bold text-[#2E0038] text-base">Ahmed Khan</h4>
                <p className="text-xs text-slate-500">CEO & Founder</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-4 rounded-xl shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-300 relative group">
              <div className="w-12 h-4 bg-amber-300/80 absolute -top-2 left-1/2 -translate-x-1/2 rounded-sm shadow-sm z-10"></div>
              <div className="overflow-hidden rounded-lg">
                <img src={team2} alt="Ahmed Khan" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="text-center pt-4 pb-2">
                <h4 className="font-bold text-[#2E0038] text-base">Ahmed Khan</h4>
                <p className="text-xs text-slate-500">CEO & Founder</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-4 rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-all duration-300 relative group">
              <div className="w-12 h-4 bg-amber-300/80 absolute -top-2 left-1/2 -translate-x-1/2 rounded-sm shadow-sm z-10"></div>
              <div className="overflow-hidden rounded-lg">
                <img src={team3} alt="Ahmed Khan" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="text-center pt-4 pb-2">
                <h4 className="font-bold text-[#2E0038] text-base">Ahmed Khan</h4>
                <p className="text-xs text-slate-500">CEO & Founder</p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <span className="text-xs font-serif italic text-slate-500">
              Different People, Same Destination
            </span>
          </div>
        </div>
      </section>

      {/* ==================== BOTTOM CTA SECTION ==================== */}
      <section className="relative bg-[#2E0038] text-white overflow-hidden py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
              • LET'S GET MOVING
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Ready to hit the road? Book your dream car today.
            </h2>

            <button 
              onClick={() => navigate('/cars')}
              className="inline-flex items-center space-x-2 bg-[#FFD700] text-[#2E0038] font-bold px-8 py-3.5 rounded-full hover:bg-amber-300 transition-all shadow-xl"
            >
              <span>Explore Cars</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* User Avatars Row */}
            <div className="flex items-center space-x-3 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-xs text-[#2E0038] font-bold flex items-center justify-center border-2 border-[#2E0038]">AK</div>
                <div className="w-8 h-8 rounded-full bg-purple-600 text-xs text-white font-bold flex items-center justify-center border-2 border-[#2E0038]">SA</div>
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-xs text-white font-bold flex items-center justify-center border-2 border-[#2E0038]">UT</div>
              </div>
              <p className="text-xs text-purple-200">
                Join thousands of happy travelers across the region.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-purple-800">
              <img src={ctaCarImg} alt="Porsche Dream Car" className="w-full h-[300px] md:h-[360px] object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#1D0024] text-white pt-16 pb-8 px-6 md:px-16 border-t border-purple-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-900/60">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-1.5 rounded-lg">
                <Car className="w-5 h-5 text-[#2E0038]" />
              </div>
              <span className="text-xl font-bold tracking-tight">Finovo</span>
            </div>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Making car rentals simple, reliable, and accessible for everyone across the region.
            </p>
            <div className="flex space-x-3 text-purple-300">
              <a href="#" className="hover:text-amber-400 transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-amber-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-purple-200/80">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/cars" className="hover:text-white transition-colors">Our Fleet</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 text-xs text-purple-200/80">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@finovo.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Col 4: App Coming Soon */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">App Coming Soon</h4>
            <p className="text-xs text-purple-200/70">
              Download our mobile app for faster bookings and exclusive deals.
            </p>
            <div className="bg-purple-950/80 border border-purple-800 p-3 rounded-xl text-xs text-center text-purple-300">
              iOS & Android App in Development 🚀
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-purple-300/60">
          <p>© {new Date().getFullYear()} Finovo Car Rentals. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}