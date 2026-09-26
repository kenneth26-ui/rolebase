"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FaCar, 
  FaCheckCircle, 
  FaGasPump, 
  FaUsers, 
  FaArrowLeft,
  FaCog,
  FaPhoneAlt,
  FaStar
} from "react-icons/fa";

interface SUVModel {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  passengers: number;
  engine: string;
  transmission: string;
  pricePerDay: string;
  image: string;
  features: string[];
  specs: {
    horsepower: string;
    torque: string;
    drivetrain: string;
    fuelType: string;
  };
}

export default function SUVPage() {
  const suvFleet: SUVModel[] = [
    {
      id: "land-cruiser-300",
      name: "Toyota Land Cruiser 300 Series",
      tagline: "Unmatched off-road endurance paired with executive interior comfort.",
      badge: "Executive SUV",
      passengers: 7,
      engine: "3.5L Twin-Turbo V6",
      transmission: "10-Speed Automatic",
      pricePerDay: "₦400,000",
      image: "/hydra.jpg",
      features: [
        "Premium perforated leather seating",
        "Multi-terrain select & active height control",
        "JBL 14-speaker premium audio system",
        "Tri-zone automatic climate control",
        "Power third-row folding seats"
      ],
      specs: {
        horsepower: "409 HP",
        torque: "650 Nm",
        drivetrain: "Full-Time 4WD",
        fuelType: "Premium Petrol"
      }
    },
    {
      id: "cadillac-escalade-esv",
      name: "Cadillac Escalade ESV",
      tagline: "Commanding road presence combined with ultimate flagship luxury.",
      badge: "Presidential SUV",
      passengers: 7,
      engine: "6.2L V8 Supercharged",
      transmission: "10-Speed Automatic",
      pricePerDay: "₦550,000",
      image: "/hydra.jpg",
      features: [
        "Curved 38-inch OLED display panel",
        "AKG Studio 36-speaker surround sound",
        "Executive VIP rear seating with massage function",
        "Rear-seat entertainment dual screens",
        "Panoramic power sunroof"
      ],
      specs: {
        horsepower: "420 HP",
        torque: "623 Nm",
        drivetrain: "All-Wheel Drive",
        fuelType: "Premium Petrol"
      }
    },
    {
      id: "range-rover-autobiography",
      name: "Range Rover Autobiography",
      tagline: "Uncompromised British refinement with serene cabin quietness.",
      badge: "Luxury Flagship",
      passengers: 5,
      engine: "4.4L Twin-Turbo V8",
      transmission: "8-Speed Automatic",
      pricePerDay: "₦500,000",
      image: "/hydra.jpg",
      features: [
        "Semi-Aniline leather seating with heated armrests",
        "Active noise cancellation technology",
        "Meridian Signature Sound System",
        "Four-zone climate control with air purification",
        "Soft-close doors & power gesture tailgate"
      ],
      specs: {
        horsepower: "523 HP",
        torque: "750 Nm",
        drivetrain: "All-Wheel Drive",
        fuelType: "Premium Petrol"
      }
    }
  ];

  const [selectedVehicle, setSelectedVehicle] = useState<SUVModel>(suvFleet[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* HEADER / HERO SECTION */}
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
                <FaCar /> Luxury Travel Division
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Luxury <span className="text-amber-500">SUV Fleet</span>
              </h1>
              <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                Premium executive SUVs offering superior comfort, high-performance engines, and spacious travel. Ideal for corporate delegations, family retreats, and VIP guest transfers.
              </p>
            </div>

            <div className="flex items-center gap-4 border-l-2 border-amber-500 pl-4 py-1">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Service Standard</p>
                <p className="text-lg font-bold text-white">Chauffeur-Driven Luxury</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        
        {/* VEHICLE SELECTOR TABS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {suvFleet.map((vehicle) => {
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
                    {vehicle.badge}
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
          
          {/* LEFT: IMAGE & PERFORMANCE HIGHLIGHTS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group h-[320px] sm:h-[420px]">
              <Image 
                src={selectedVehicle.image} 
                alt={selectedVehicle.name} 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedVehicle.name}</h2>
                  <p className="text-xs text-amber-400">{selectedVehicle.badge}</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-medium text-slate-300">
                  <FaStar className="text-amber-500" /> Premium Fleet
                </div>
              </div>
            </div>

            {/* QUICK STATS STRIP */}
            <div className="grid grid-cols-3 gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
              <div>
                <FaUsers className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Capacity</p>
                <p className="text-xs sm:text-sm font-bold text-white">{selectedVehicle.passengers} Seats</p>
              </div>
              <div>
                <FaGasPump className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Engine</p>
                <p className="text-xs sm:text-sm font-bold text-white">{selectedVehicle.engine}</p>
              </div>
              <div>
                <FaCog className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Transmission</p>
                <p className="text-xs sm:text-sm font-bold text-white">{selectedVehicle.transmission}</p>
              </div>
            </div>

            {/* TECHNICAL SPECIFICATIONS TABLE */}
            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaCar className="text-amber-500" /> Vehicle Performance Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Horsepower</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.horsepower}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Torque</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.torque}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Drivetrain</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.drivetrain}</p>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <p className="text-slate-400">Fuel Recommendation</p>
                  <p className="font-semibold text-white mt-0.5">{selectedVehicle.specs.fuelType}</p>
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
                  Includes Chauffeur
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Includes professional executive driver, airport pickup coordination, fuel allocation, and comprehensive travel support.
              </p>

              <hr className="border-slate-800 my-6" />

              {/* LUXURY FEATURES LIST */}
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
                Key Cabin & Comfort Features
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
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/10 text-xs uppercase tracking-wider"
                >
                  <FaPhoneAlt /> Book Custom SUV Charter
                </Link>
              </div>

              <p className="text-[10px] text-center text-slate-500 mt-4">
                * Rates include professional chauffeur services and city itinerary fulfillment.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}