import React from "react";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
  status: string;
}

async function getCars(): Promise<Car[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Car, "id">),
    }));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export default async function PublicFleetPage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-slate-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              NICON LUXURY CARS
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              EXCLUSIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">COLLECTION</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-lg font-light">
              Experience prestige in motion. Choose from our handpicked lineup of luxury vehicles designed for performance and supreme comfort.
            </p>
          </div>

          <Link
            href="/admin/post"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 hover:text-slate-950 hover:bg-amber-400 hover:border-amber-400 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-amber-500/20 active:scale-95"
          >
            <span>+ Admin: Add Vehicle</span>
          </Link>
        </header>

        {/* Content Section */}
        {cars.length === 0 ? (
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/80 p-16 text-center backdrop-blur-xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400 text-2xl">
              🏎️
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">No Vehicles Available</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              Our luxury fleet is currently being updated. Visit the admin dashboard to add new arrivals.
            </p>
            <Link
              href="/admin/post"
              className="inline-block px-6 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Post First Car
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 overflow-hidden shadow-xl hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500"
              >
                {/* Image Card Header */}
                <div className="relative h-60 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/60 text-[11px] font-mono font-bold uppercase text-amber-400 backdrop-blur-md">
                    {car.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-500/90 uppercase tracking-widest block mb-1">
                      {car.brand}
                    </span>
                    <h3 className="text-2xl font-black uppercase text-white tracking-wide group-hover:text-amber-400 transition-colors duration-300">
                      {car.name}
                    </h3>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-slate-400">Daily Rate</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-amber-400">${car.price}</span>
                        <span className="text-xs text-slate-400 font-medium">/ day</span>
                      </div>
                    </div>

                    <Link
                      href={`/book?carId=${car.id}`}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}