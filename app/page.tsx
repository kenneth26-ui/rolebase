"use client";

import React, { useState } from "react";
import { 
  FaCar, 
  FaSearch, 
  FaCalendarAlt, 
  FaGasPump, 
  FaTachometerAlt, 
  FaUserShield, 
  FaUserCheck, 
  FaShieldAlt, 
  FaStar, 
  FaArrowRight, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaSlidersH, 
  FaQuestionCircle, 
  FaKey, 
  FaMapMarkerAlt, 
  FaClock,
  FaChevronDown,
  FaCrown
} from "react-icons/fa";

export default function Home() {
  const [activeTab, setActiveTab] = useState("member");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [estimatedDays, setEstimatedDays] = useState(3);
  const [includeDriver, setIncludeDriver] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredCars = selectedCategory === "All" 
    ? sampleFleet 
    : sampleFleet.filter(car => car.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* EXECUTIVE ANNOUNCEMENT TICKER */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 text-xs py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-slate-400">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              LIVE DISPATCH
            </span>
            <span className="text-slate-300">Executive Fleet Available Across Lagos & Abuja Hubs</span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline">Instant Reservations & Priority Chauffeur Allocation</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium shrink-0 hidden sm:inline">
            NICON Executive Portal
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide">
              <FaCrown className="w-3 h-3" />
              <span>PREMIUM EXECUTIVE MOBILITY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Refined Travel. <br />
              <span className="text-amber-500">Uncompromising Fleet Control.</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Discreet, high-performance executive transport tailored for corporate leaders, private trips, and managed fleet logistics across Nigeria.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#booking-widget" 
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/10"
              >
                Reserve a Vehicle
              </a>
              <a 
                href="#roles" 
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs uppercase tracking-wider rounded-xl border border-slate-800 transition-all"
              >
                Role Management
              </a>
            </div>
          </div>

          {/* Hero Right Live Status Card */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FaClock className="text-amber-500 w-4 h-4" /> Live Platform Activity
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Real-time</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60">
                <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0 w-4 h-4" />
                <div className="text-xs">
                  <p className="text-slate-200 font-semibold">Reservation Confirmed #NC-8021</p>
                  <p className="text-slate-400 mt-0.5">NICON Apex GT assigned to Executive Account</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">2 mins ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60">
                <FaUserShield className="text-amber-500 mt-0.5 shrink-0 w-4 h-4" />
                <div className="text-xs">
                  <p className="text-slate-200 font-semibold">Access Privilege Updated</p>
                  <p className="text-slate-400 mt-0.5">User permissions elevated to Fleet Dispatcher</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">14 mins ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/60">
                <FaCar className="text-amber-400 mt-0.5 shrink-0 w-4 h-4" />
                <div className="text-xs">
                  <p className="text-slate-200 font-semibold">Fleet Addition</p>
                  <p className="text-slate-400 mt-0.5">NICON Armored Titan V8 introduced to Lagos Hub</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEARCH & BOOKING BAR */}
      <section id="booking-widget" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-semibold uppercase text-amber-500 tracking-wider flex items-center gap-2">
              <FaSearch /> Instant Vehicle Reservation
            </span>
            <span className="text-xs text-slate-500 font-mono">STEP 1 OF 3</span>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-amber-500 w-3 h-3" /> Pickup Location
              </label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors">
                <option>Victoria Island HQ (Lagos)</option>
                <option>Ikeja Executive Hub</option>
                <option>Abuja Diplomatic Zone</option>
                <option>Port Harcourt Station</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FaCalendarAlt className="text-amber-500 w-3 h-3" /> Start Date
              </label>
              <input 
                type="date" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FaCalendarAlt className="text-amber-500 w-3 h-3" /> Return Date
              </label>
              <input 
                type="date" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors" 
              />
            </div>

            <div className="flex items-end">
              <button 
                type="submit" 
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Search Available Fleet
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FLEET SHOWCASE */}
      <section id="fleet" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Executive Selection</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Our Fleet Matrix</h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {["All", "Executive", "SUV", "Electric"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  selectedCategory === category 
                    ? "bg-amber-500 text-slate-950 border-amber-500" 
                    : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-500 font-medium">{car.code}</span>
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 bg-slate-800/80 text-slate-300 rounded-md">
                    {car.category}
                  </span>
                </div>

                <div className="h-44 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-center p-6 relative">
                  <FaCar className="w-20 h-20 text-slate-700 group-hover:text-amber-500 transition-colors duration-300" />
                  <div className="absolute bottom-3 right-3 text-xs font-semibold text-amber-400 flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
                    <FaStar className="w-3 h-3 text-amber-500" /> {car.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{car.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{car.desc}</p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    <span className="flex items-center gap-1.5"><FaTachometerAlt className="text-amber-500" /> {car.speed}</span>
                    <span className="flex items-center gap-1.5"><FaGasPump className="text-amber-500" /> {car.fuel}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-2">
                <div>
                  <span className="text-xl font-bold text-amber-500">${car.price}</span>
                  <span className="text-xs text-slate-500 font-mono"> / day</span>
                </div>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RENTAL ESTIMATOR WIDGET */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8 shadow-xl">
          <div className="border-b border-slate-800 pb-4 mb-6">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Transparent Calculation</span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <FaSlidersH className="w-5 h-5 text-amber-500" /> Instant Rental Estimator
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-3">
                  <span>Rental Duration:</span>
                  <span className="text-amber-400 font-bold">{estimatedDays} Days</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={estimatedDays}
                  onChange={(e) => setEstimatedDays(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer border border-slate-800"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">Dedicated Chauffeur Service</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Professional driver included ($50 / day)</p>
                </div>
                <button 
                  onClick={() => setIncludeDriver(!includeDriver)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    includeDriver ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  {includeDriver ? "Included" : "Add Option"}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 border border-amber-500/30 rounded-xl p-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                Cost Breakdown
              </h4>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Base Vehicle Rate ($180/day):</span>
                  <span className="font-mono">${180 * estimatedDays}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Chauffeur Service:</span>
                  <span className="font-mono">${includeDriver ? 50 * estimatedDays : 0}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Comprehensive Protection:</span>
                  <span className="text-emerald-400 font-semibold">Included</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-bold text-white">
                  <span>Estimated Total:</span>
                  <span className="text-amber-500 text-lg font-mono">${(180 * estimatedDays) + (includeDriver ? 50 * estimatedDays : 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE SYSTEM PREVIEW */}
      <section id="roles" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8">
          <div className="border-b border-slate-800 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Access Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Role-Based Engine</h2>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setActiveTab("member")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "member" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <FaUserCheck /> Member Access
              </button>
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === "admin" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                <FaUserShield /> Admin Controls
              </button>
            </div>
          </div>

          {activeTab === "member" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <FaKey className="text-amber-500 w-6 h-6 mb-3" />
                <h4 className="font-semibold text-white text-sm">Keyless Express Access</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Verified members unlock allocated vehicles directly via mobile auth without counter delays.
                </p>
              </div>
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <FaCalendarAlt className="text-amber-500 w-6 h-6 mb-3" />
                <h4 className="font-semibold text-white text-sm">Reservation Control</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Modify active itineraries, review detailed receipts, and request trip extensions seamlessly.
                </p>
              </div>
              <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <FaShieldAlt className="text-amber-500 w-6 h-6 mb-3" />
                <h4 className="font-semibold text-white text-sm">Corporate Rates</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Access preferential corporate pricing tiers and streamlined billing for routine transport.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-950/60 rounded-xl border border-amber-500/30">
                <FaUserShield className="text-amber-500 w-6 h-6 mb-3" />
                <h4 className="font-semibold text-white text-sm">Fleet Dispatch Management</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Add, configure, or temporarily suspend vehicle availability across regional hubs.
                </p>
              </div>
              <div className="p-5 bg-slate-950/60 rounded-xl border border-amber-500/30">
                <FaTachometerAlt className="text-amber-500 w-6 h-6 mb-3" />
                <h4 className="font-semibold text-white text-sm">Real-Time Analytics</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Monitor fleet utilization rates, revenue metrics, and booking approval pipelines.
                </p>
              </div>
              <div className="p-5 bg-slate-950/60 rounded-xl border border-amber-500/30">
                <FaShieldAlt className="text-amber-500 w-6 h-6 mb-3" />
                <h4 className="font-semibold text-white text-sm">Privilege Governance</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Manage user role hierarchies, elevate dispatcher accounts, and audit platform security loggings.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PLATFORM COMPARISON TABLE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8">
          <div className="mb-6">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Service Distinction</span>
            <h2 className="text-2xl font-bold text-white mt-1">Why Choose NICON Luxury</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                  <th className="p-4 font-semibold">FEATURE</th>
                  <th className="p-4 text-amber-500 font-semibold">NICON LUXURY PLATFORM</th>
                  <th className="p-4 text-slate-500 font-medium">TRADITIONAL RENTALS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-white">Booking Approval</td>
                  <td className="p-4 font-medium text-amber-400 flex items-center gap-2"><FaCheckCircle /> Automated Priority Checkouts</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2"><FaTimesCircle /> Manual Counter Paperwork</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Role Management</td>
                  <td className="p-4 font-medium text-amber-400 flex items-center gap-2"><FaCheckCircle /> Built-in Corporate & Admin Controls</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2"><FaTimesCircle /> Single-Tier Public Access</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Fleet Guarantee</td>
                  <td className="p-4 font-medium text-amber-400 flex items-center gap-2"><FaCheckCircle /> Exact Vehicle Allocation</td>
                  <td className="p-4 text-slate-500 flex items-center gap-2"><FaTimesCircle /> Unpredictable Class Swaps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DISPATCH WORKFLOW TIMELINE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="border-b border-slate-800 pb-4 mb-8">
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Process</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Create Profile", desc: "Authenticate your corporate or member account." },
            { step: "02", title: "Select Vehicle", desc: "Choose your preferred model from our live regional fleet." },
            { step: "03", title: "Automated Check", desc: "Instant system verification confirms your reservation." },
            { step: "04", title: "Executive Delivery", desc: "Receive direct pickup or dedicated chauffeur dispatch." },
          ].map((item) => (
            <div key={item.step} className="p-6 bg-slate-900 border border-slate-800/80 rounded-2xl relative">
              <span className="text-2xl font-mono font-bold text-amber-500 block mb-2">{item.step}</span>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8">
          <div className="border-b border-slate-800 pb-4 mb-6">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Support</span>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
              <FaQuestionCircle className="w-5 h-5 text-amber-500" /> Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, q: "How do Admin rights function within the platform?", a: "Administrators are provisioned with elevated controls to manage fleet availability, adjust pricing tiers, and oversee active reservation queues." },
              { id: 2, q: "Can corporate accounts be upgraded to Admin access?", a: "Account access levels can be updated directly by primary system administrators via the governance panel." },
              { id: 3, q: "What documentation is required for vehicle dispatch?", a: "A verified government ID, valid driver's license (for self-drive), and account authentication are required to confirm reservations." }
            ].map((faq) => (
              <div key={faq.id} className="border border-slate-800/80 bg-slate-950/60 rounded-xl p-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full text-left font-semibold text-xs sm:text-sm text-white flex justify-between items-center gap-4"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown className={`w-3.5 h-3.5 text-amber-500 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`} />
                </button>
                {openFaq === faq.id && (
                  <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-900 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 sm:p-12 text-slate-950 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider bg-slate-950 text-amber-400 px-3 py-1 rounded-md inline-block">
              EXECUTIVE MOBILITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
              Reserve Your Vehicle Today.
            </h2>
            <p className="text-slate-900 text-xs sm:text-sm font-medium leading-relaxed">
              Experience discreet, luxurious, and reliable executive transport tailored to your schedule.
            </p>
            <div className="pt-2">
              <a 
                href="#booking-widget" 
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
              >
                <span>Get Started</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 text-center text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} NICON Luxury Fleet Management. All rights reserved.</p>
      </footer>

    </div>
  );
}

// SAMPLE FLEET DATA
const sampleFleet = [
  { 
    id: 1, 
    code: "NC-EX01", 
    name: "NICON Apex GT", 
    category: "Executive", 
    desc: "V8 performance executive sedan configured for discreet, quiet travel.", 
    rating: "4.9", 
    speed: "0-60 in 3.1s", 
    fuel: "Petrol", 
    price: 180 
  },
  { 
    id: 2, 
    code: "NC-SV02", 
    name: "NICON Armored Titan SUV", 
    category: "SUV", 
    desc: "Full-size executive SUV engineered for heavy-duty security and comfort.", 
    rating: "4.8", 
    speed: "V8 Hybrid", 
    fuel: "Hybrid", 
    price: 210 
  },
  { 
    id: 3, 
    code: "NC-EV03", 
    name: "NICON Volt Executive", 
    category: "Electric", 
    desc: "Zero-emission luxury electric sedan with smooth, keyless dispatch.", 
    rating: "5.0", 
    speed: "Dual Motor", 
    fuel: "Electric", 
    price: 195 
  },
];