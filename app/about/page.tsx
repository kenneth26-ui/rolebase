"use client";

import React from "react";
import Link from "next/link";
import { 
  FaShieldAlt, 
  FaCar, 
  FaUserCheck, 
  FaAward, 
  FaClock, 
  FaBuilding, 
  FaArrowRight, 
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutUsPage() {
  const stats = [
    { label: "Executive Vehicles", value: "50+" },
    { label: "Diplomatic & Corporate Trips", value: "10,000+" },
    { label: "Professional Chauffeurs", value: "100%" },
    { label: "Dispatch Availability", value: "24/7" },
  ];

  const coreValues = [
    {
      title: "Tactical Security & Protection",
      description:
        "Our armored fleet (B6/B7 ballistic ratings) and security personnel are trained to uphold safety for high-net-worth individuals, diplomats, and corporate executives.",
      icon: FaShieldAlt,
    },
    {
      title: "Uncompromising Punctuality",
      description:
        "Time is your most valuable asset. Our chauffeurs arrive at least 15 minutes prior to scheduled pick-ups with real-time GPS route monitoring.",
      icon: FaClock,
    },
    {
      title: "Bespoke Luxury Standard",
      description:
        "From high-end Maybachs and Range Rovers to custom Jet-Class Sprinters, our vehicles offer pristine cabin conditions and executive amenities.",
      icon: FaCar,
    },
    {
      title: "Absolute Discretion",
      description:
        "We enforce strict confidentiality standards across all client transfers, ensuring complete privacy for private and diplomatic engagements.",
      icon: FaUserCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          The Pinnacle of Executive Transport
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Redefining Luxury & Security for <span className="text-amber-500">NICON Luxury</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Delivering elite mobility solutions, armored security escorts, and VIP chauffeur services tailored for diplomats, corporate executives, and distinguished guests.
        </p>
      </div>

      {/* STATS BANNER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-1">
            <p className="text-2xl sm:text-4xl font-extrabold text-amber-500 font-mono">
              {stat.value}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* COMPANY MISSION & OVERVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
        
        {/* LEFT TEXT CONTENT */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
              OUR HERITAGE & MISSION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Built on Trust, Discretion, and World-Class Service
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            At <strong className="text-white">NICON Luxury</strong>, we specialize in high-tier ground logistics engineered for high-profile individuals and organizations requiring safety, luxury, and reliability.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Whether managing VIP airport tarmac receptions in Victoria Island or diplomatic escorts through Abuja’s Central Business District, our fleet operates under rigorous maintenance, security screening, and real-time dispatch management.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-amber-500 w-4 h-4 shrink-0" />
              <span>Certified Diplomatic & Defensive Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-amber-500 w-4 h-4 shrink-0" />
              <span>B6/B7 Ballistic Protected SUVs</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-amber-500 w-4 h-4 shrink-0" />
              <span>Tailored Corporate Billing Accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-amber-500 w-4 h-4 shrink-0" />
              <span>24/7 Live Concierge & Route Support</span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD SHOWCASE */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
              <FaAward className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">The NICON Guarantee</h3>
              <p className="text-[11px] text-slate-400">Executive Mobility Without Compromise</p>
            </div>
          </div>

          <blockquote className="text-xs sm:text-sm italic text-slate-300 leading-relaxed">
            "Our objective is not simply providing transportation, but creating an environment where corporate leaders and VIP guests feel entirely secure, productive, and comfortable."
          </blockquote>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Dispatch Hubs:</span>
            <span className="font-bold text-amber-400">Lagos & Abuja</span>
          </div>
        </div>

      </div>

      {/* BRAND PILLARS / CORE VALUES */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Why Executive Leaders Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Four foundational pillars that set our fleet services apart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div className="p-3 bg-slate-950 rounded-xl text-amber-500 border border-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CTA BANNER */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Experience NICON Luxury Mobility Today</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Explore our active fleet matrix or speak with our team to arrange corporate accounts.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/book"
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
          >
            <span>Book A Vehicle</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors text-center"
          >
            Contact Desk
          </Link>
        </div>
      </div>

    </div>
  );
}