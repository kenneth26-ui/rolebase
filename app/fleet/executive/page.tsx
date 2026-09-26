"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaCar, 
  FaUserFriends, 
  FaSuitcase, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaArrowRight, 
  FaWifi, 
  FaWineGlass, 
  FaSnowflake,
  FaSearch
} from "react-icons/fa";

export default function ExecutiveSedansPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // EXECUTIVE SEDANS FLEET DATA
  const cars = [
    {
      id: "maybach-s680",
      name: "Mercedes-Maybach S680",
      tagline: "Ultra-Luxury Flagship Sedan",
      
      passengers: 3,
      luggage: 3,
      imageSrc: "/mayback.jpg", 
      imageAlt: "Mercedes-Maybach S680 Executive Sedan",
      features: [
        "First-Class Rear Reclining Seats",
        "Calf Rest & Massage Functions",
        "Burmester High-End 4D Sound System",
        "Complimentary Wi-Fi & Refreshments",
      ],
      description:
        "Engineered for ultimate prestige and executive comfort. The Maybach S680 offers an whisper-quiet cabin with unmatched legroom for high-profile client transfers.",
    },
    {
      id: "mercedes-s580",
      name: "Mercedes-Benz S-Class S580",
      tagline: "The Benchmark of Executive Transport",
      
      passengers: 3,
      luggage: 3,
      imageSrc: "/Benzsclass 580.jpg", 
      imageAlt: "Mercedes-Benz S-Class S580",
      features: [
        "Executive Leather Seating",
        "Panoramic Sky Lounge Roof",
        "Rear Passenger Climate Control",
        "Privacy Rear Sunshades",
      ],
      description:
        "The global icon for corporate executives and diplomatic transfers. Exceptional ride smoothness paired with cutting-edge comfort technology.",
    },
    {
      id: "bmw-7-series",
      name: "BMW 7 Series (760i xDrive)",
      tagline: "Modern Executive Sophistication",
      
      passengers: 3,
      luggage: 3,
      imageSrc: "/bmw7.jpg", 
      imageAlt: "BMW 7 Series 760i xDrive",
      features: [
        "31-inch BMW Theatre Screen",
        "Bowers & Wilkins Diamond Surround",
        "Automatic Soft-Close Doors",
        "Executive Lounge Seating",
      ],
      description:
        "Combining commanding roadside presence with digital interior luxury. Features an ultra-wide cinema screen in the rear for long-distance corporate travel.",
    },
    {
      id: "audi-a8l",
      name: "Audi A8 L Security Edition",
      tagline: "Subtle Luxury & Discretion",
      
      passengers: 3,
      luggage: 3,
      imageSrc: "/audiA8.jpg", 
      imageAlt: "Audi A8 L Executive Sedan",
      features: [
        "Quattro All-Wheel Drive",
        "Valcona Leather Interior",
        "Acoustic Double-Pane Glass",
        "Adaptive Air Suspension",
      ],
      description:
        "Designed for seamless discretion and top-tier security transfers. Offers dynamic stability across all city routes with premium acoustic insulation.",
    },
  ];

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    car.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          Executive Fleet Selection
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Executive <span className="text-amber-500">Sedans</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Unmatched refinement, privacy, and chauffeur excellence. Designed specifically for CEO transfers, diplomatic delegations, and VIP guests.
        </p>
      </div>

      {/* SEARCH / FILTER BAR */}
      <div className="max-w-md mx-auto mb-12 relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search executive sedans (e.g. Maybach, S-Class)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-slate-500"
        />
      </div>

      {/* FLEET DISPLAY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group shadow-xl"
          >
            <div>
              {/* IMAGE CONTAINER */}
              <div className="relative w-full h-56 sm:h-64 bg-slate-950 border-b border-slate-800/80 overflow-hidden">
                <Image
                  src={car.imageSrc}
                  alt={car.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={car.id === "maybach-s680"}
                />

                {/* PRICE BADGE */}
               
              </div>

              {/* CARD BODY CONTENT */}
              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                    {car.tagline}
                  </span>
                  <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {car.name}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {car.description}
                  </p>
                </div>

                {/* CAPACITY METRICS */}
                <div className="flex items-center gap-6 text-xs text-slate-300 py-3 border-y border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <FaUserFriends className="text-amber-500 w-4 h-4" />
                    <span>Up to {car.passengers} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaSuitcase className="text-amber-500 w-4 h-4" />
                    <span>{car.luggage} Executive Bags</span>
                  </div>
                </div>

                {/* HIGHLIGHTED FEATURES */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">VIP Amenities</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheckCircle className="text-amber-500 w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}