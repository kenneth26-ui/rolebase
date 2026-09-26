"use client";

import React from "react";
import Link from "next/link";
import { 
  FaCar, 
  FaCalendarAlt, 
  FaUserCheck, 
  FaKey, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowRight, 
  FaHeadset, 
  FaPlaneArrival, 
  FaRegCreditCard 
} from "react-icons/fa";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Select Your Vehicle Category",
      description:
        "Browse our executive fleet, ranging from high-security B6/B7 Armored SUVs and Mercedes-Maybach sedans to luxury Sprinters and supercars.",
      icon: FaCar,
      highlights: ["Armored Ballistic Protection", "Executive VIP Interiors", "Chauffeur Included Options"],
    },
    {
      number: "02",
      title: "Configure Itinerary & Security Options",
      description:
        "Specify your pick-up date, duration, destination routes, and special requests such as airport VIP tarmac reception or armed security escorts.",
      icon: FaCalendarAlt,
      highlights: ["Airport VIP Express Arrival", "Diplomatic Escorts", "Flexible Daily / Hourly Rates"],
    },
    {
      number: "03",
      title: "Instant Verification & Reservation",
      description:
        "Confirm your booking seamlessly through our secure portal. Our dispatch team verifies your itinerary and assigns a dedicated driver immediately.",
      icon: FaUserCheck,
      highlights: ["Real-time Status Tracking", "Instant Dispatch Confirmation", "24/7 Concierge Support"],
    },
    {
      number: "04",
      title: "Executive Arrival & Service Delivery",
      description:
        "Your driver arrives 15 minutes ahead of schedule in a pristine, fully prepped vehicle, ready to provide an uncompromised luxury experience.",
      icon: FaKey,
      highlights: ["Punctual Professional Drivers", "GPS Tracked Routes", "Complimentary Refreshments"],
    },
  ];

  const serviceHighlights = [
    {
      title: "Airport VIP Pickups",
      desc: "Meet-and-greet service straight from the jetway or VIP terminal with baggage assistance.",
      icon: FaPlaneArrival,
    },
    {
      title: "Armored Protection",
      desc: "Certified B6/B7 ballistic armor vehicles with highly trained tactical drivers for maximum security.",
      icon: FaShieldAlt,
    },
    {
      title: "Corporate Invoicing",
      desc: "Streamlined corporate billing and custom payment structures for corporate account holders.",
      icon: FaRegCreditCard,
    },
    {
      title: "Dedicated Dispatch 24/7",
      desc: "Round-the-clock hotline and live support for emergency route adjustments or extension requests.",
      icon: FaHeadset,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          Seamless Reservation Process
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          How <span className="text-amber-500">NICON Luxury</span> Works
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          From executive airport transfers to secure diplomatic escorts, reserving a premium vehicle takes just four simple steps.
        </p>
      </div>

      {/* STEP-BY-STEP PROCESS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group hover:border-amber-500/40 transition-all duration-300"
            >
              {/* LARGE BACKGROUND NUMBER */}
              <span className="absolute -top-3 -right-2 text-7xl font-extrabold text-slate-800/40 select-none group-hover:text-amber-500/10 transition-colors">
                {step.number}
              </span>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 bg-slate-950 rounded-xl text-amber-500 border border-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-widest">
                      STEP {step.number}
                    </span>
                    <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* HIGHLIGHT BULLETS */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {step.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <FaCheckCircle className="text-amber-500 w-3.5 h-3.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* SPECIALIZED SERVICES SECTION */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Tailored Executive Transport
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every booking comes with our benchmark standards of safety, discretion, and punctuality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceHighlights.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-center space-y-3 hover:bg-slate-900 transition-colors"
              >
                <div className="w-12 h-12 mx-auto bg-slate-950 rounded-xl flex items-center justify-center text-amber-500 border border-slate-800">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CTA BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Ready to Reserve Your Executive Fleet?</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Book online instantly or speak directly with our 24/7 dispatch desk for custom arrangements.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/book"
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
          >
            <span>Book A Fleet Now</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors text-center"
          >
            Contact Dispatch
          </Link>
        </div>
      </div>

    </div>
  );
}