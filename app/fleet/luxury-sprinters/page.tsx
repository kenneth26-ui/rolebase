"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaBus, 
  FaWifi, 
  FaTv, 
  FaUsers, 
  FaCheckCircle, 
  FaArrowRight, 
  FaPhoneAlt, 
  FaArrowLeft,
  FaCogs,
  FaShieldAlt,
  FaCocktail
} from "react-icons/fa";

interface SprinterModel {
  id: string;
  name: string;
  tagline: string;
  category: string;
  passengers: number;
  layout: string;
  connectivity: string;
  pricePerDay: string;
  image: string;
  features: string[];
  specs: {
    displays: string;
    seatingType: string;
    privacyPartition: string;
    audioSystem: string;
  };
}

export default function LuxurySprintersPage() {
  const sprinterFleet: SprinterModel[] = [
    {
      id: "jet-edition-vip",
      name: "Mercedes-Benz Sprinter Jet Edition",
      tagline: "Private jet interior experience tailored for C-suite executive travel.",
      category: "First Class Mobile Office",
      passengers: 6,
      layout: "Face-to-Face VIP Captain's Chairs",
      connectivity: "5G Starlink Satellite Wi-Fi",
      pricePerDay: "$1,950",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
      features: [
        "Italian leather power captain chairs with heat, massage & footrests",
        "Dual 50\" Samsung 4K QLED smart displays & Apple TV integration",
        "Motorized privacy partition with electrochromic privacy glass",
        "Retractable executive hardwood writing desks",
        "Integrated luxury refreshment bar & espresso station"
      ],
      specs: {
        displays: "Dual 50\" 4K Smart QLED TVs",
        seatingType: "6-Way Power Italian Linen Leather Seats",
        privacyPartition: "Motorized Electronic Partition",
        audioSystem: "Dolby Surround Sound System"
      }
    },
    {
      id: "presidential-shuttle-10",
      name: "Sprinter Presidential Executive Coach",
      tagline: "Spacious luxury transport ideal for corporate delegations and VIP touring.",
      category: "Diplomatic Group Transport",
      passengers: 10,
      layout: "Forward-Facing Executive Row Layout",
      connectivity: "High-Speed Dual-LTE Wi-Fi Router",
      pricePerDay: "$1,650",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200",
      features: [
        "Custom LED Starlight ceiling with dynamic ambient lighting",
        "Individual USB-C fast ports & wireless charging pads at every seat",
        "Spacious rear deep luggage compartment for long journeys",
        "Center aisle layout with overhead aviation luggage racks",
        "Onboard passenger intercom & public address broadcast"
      ],
      specs: {
        displays: "Single Overhead 43\" Smart Display",
        seatingType: "Executive Diamond-Stitched Leather Chairs",
        privacyPartition: "Acoustic Noise-Dampening Bulkhead",
        audioSystem: "Multi-Zone High-Fidelity Audio System"
      }
    },
    {
      id: "armored-sprinter-b6",
      name: "Tactical Armored Sprinter Van (B6)",
      tagline: "Complete ballistic protection fused with ultra-luxury cabin comfort.",
      category: "Armored Executive Transport",
      passengers: 8,
      layout: "VIP Lounge & Tactical Command Layout",
      connectivity: "Encrypted Satellite & Cellular Terminal",
      pricePerDay: "$2,400",
      image: "https://images.unsplash.com/photo-1562911791-c7a97b729ec5?auto=format&fit=crop&q=80&w=1200",
      features: [
        "CEN B6 Certified ballistic armor cabin protection",
        "Run-flat tire system & reinforced heavy-duty suspension",
        "Full private bathroom with luxury vanity (Select Configurations)",
        "Video conferencing suite with 360-degree perimeter security cameras",
        "Filtered internal air recirculating oxygen safety system"
      ],
      specs: {
        displays: "Dual 43\" Tactical & Infotainment Monitors",
        seatingType: "Heated & Ventilated Power Captain Chairs",
        privacyPartition: "Armored Steel Partition Wall",
        audioSystem: "Encrypted Intercom & Media Sound"
      }
    }
  ];

  const [selectedVehicle, setSelectedVehicle] = useState<SprinterModel>(sprinterFleet[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 border-b border-slate-800 py-16 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            href="/#fleet" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors mb-6"
          >
            <FaArrowLeft /> Back to Fleet Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                <FaBus /> First Class Land Transport
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Luxury <span className="text-amber-500">Sprinter Vans</span>
              </h1>
              <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                Experience mobile boardroom luxury. Custom Mercedes-Benz Sprinter Jet-Vans designed for executive meetings, airport transfers, and private corporate travel.
              </p>
            </div>

            <div className="flex items-center gap-4 border-l-2 border-amber-500 pl-4 py-1">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Standard Amenities</p>
                <p className="text-lg font-bold text-white">Starlight Ceiling & 5G Wi-Fi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        
        {/* VEHICLE SELECTOR TABS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {sprinterFleet.map((vehicle) => {
            const isSelected = selectedVehicle.id === vehicle.id;
            return (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50"
                    : "bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {vehicle.category}
                  </span>
                  <span className="text-xs font-bold text-slate-300">{vehicle.pricePerDay} / day</span>
                </div>
                <h3 className="font-bold text-white text-base truncate">{vehicle.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{vehicle.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* ACTIVE VEHICLE SHOWCASE DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: IMAGE & CABIN TECH SPECIFICATIONS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group">
              <img 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name} 
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedVehicle.name}</h2>
                  <p className="text-xs text-amber-400">{selectedVehicle.layout}</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-medium text-slate-300">
                  <FaCocktail className="text-amber-500" /> VIP Suite
                </div>
              </div>
            </div>

            {/* QUICK STATS STRIP */}
            <div className="grid grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
              <div>
                <FaUsers className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Seating Capacity</p>
                <p className="text-xs sm:text-sm font-bold text-white">{selectedVehicle.passengers} VIP Guests</p>
              </div>
              <div>
                <FaWifi className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Connectivity</p>
                <p className="text-xs sm:text-sm font-bold text-white">{selectedVehicle.connectivity}</p>
              </div>
              <div>
                <FaCogs className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Chassis</p>
                <p className="text-xs sm:text-sm font-bold text-white">Mercedes 3500 Extended</p>
              </div>
            </div>

            {/* CABIN & ENTERTAINMENT SPECIFICATIONS TABLE */}
            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaTv className="text-amber-500" /> Executive Cabin & Audio-Visual Specs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Display Monitors</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.displays}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Seating Configuration</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.seatingType}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Privacy Partition</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.privacyPartition}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Audio Setup</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.audioSystem}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: FEATURES & BOOKING ACTION CARD */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-amber-500">Daily Charter Rate</p>
                  <h2 className="text-3xl font-extrabold text-white">{selectedVehicle.pricePerDay} <span className="text-xs font-normal text-slate-400">/ 24 hours</span></h2>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-semibold border border-slate-700">
                  Chauffeur Included
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Includes dedicated professional chauffeur, unlimited Wi-Fi usage, complimentary iced refreshments, and personalized itinerary management.
              </p>

              <hr className="border-slate-800 my-6" />

              {/* VIP AMENITIES LIST */}
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
                Key VIP Amenities
              </h3>
              <ul className="space-y-3 mb-8">
                {selectedVehicle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <FaCheckCircle className="text-amber-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* ACTION BUTTONS */}
              <div className="space-y-3">
                <Link
                  href={`/book?vehicle=${encodeURIComponent(selectedVehicle.name)}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm"
                >
                  Reserve This Sprinter <FaArrowRight />
                </Link>

                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors text-xs border border-slate-700"
                >
                  <FaPhoneAlt className="text-amber-500" /> Book Event Fleet & Multi-Day Charters
                </Link>
              </div>

              <p className="text-[10px] text-center text-slate-500 mt-4">
                * Flight tracking and private airport tarmac pickup credentials available upon request.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}