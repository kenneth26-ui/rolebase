"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { db } from "@/config/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { 
  FaCar, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUserTie, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaArrowLeft,
  FaExchangeAlt
} from "react-icons/fa";

interface Booking {
  id: string;
  carName: string;
  carCategory: string;
  pickupLocation: string;
  startDate: string;
  endDate: string;
  rentalDays: number;
  includeDriver: boolean;
  totalCost: number;
  status: "pending" | "approved" | "rejected";
  createdAt?: any;
}

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const userEmail = session?.user?.email;

  const fetchUserBookings = async () => {
    if (!userEmail) return;
    try {
      setLoading(true);
      const bookingsRef = collection(db, "bookings");
      // Query bookings where userEmail matches session email
      const q = query(
        bookingsRef, 
        where("userEmail", "==", userEmail), 
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      const fetched: Booking[] = [];
      querySnapshot.forEach((docSnap) => {
        fetched.push({ id: docSnap.id, ...docSnap.data() } as Booking);
      });

      setBookings(fetched);
    } catch (err) {
      console.error("Error fetching user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchUserBookings();
    }
  }, [userEmail]);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "all") return true;
    return b.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans max-w-7xl mx-auto space-y-8">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard" 
            className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500 text-slate-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div>
            <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider rounded-md">
              Client Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">My Booking History</h1>
          </div>
        </div>

        <button 
          onClick={fetchUserBookings}
          className="self-start md:self-auto px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FaExchangeAlt className="w-3 h-3 text-amber-500" /> Refresh History
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border capitalize transition-all cursor-pointer ${
              filterStatus === status
                ? "bg-amber-500 text-slate-950 border-amber-500"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* BOOKINGS LIST */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 font-mono">Loading your bookings...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            You have no booking requests matching <span className="font-semibold text-amber-500">({filterStatus})</span>.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="p-5 sm:p-6 hover:bg-slate-950/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Details */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">{booking.carName}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-slate-800 text-amber-400 rounded-md">
                      {booking.carCategory}
                    </span>

                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      booking.status === "approved" 
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : booking.status === "rejected"
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400 animate-pulse"
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <FaMapMarkerAlt className="text-amber-500 shrink-0" /> Pickup: <span className="text-slate-200">{booking.pickupLocation}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <FaCalendarAlt className="text-amber-500 shrink-0" /> {booking.startDate} &rarr; {booking.endDate} ({booking.rentalDays} days)
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <FaUserTie className="text-amber-500 shrink-0" /> Chauffeur: <span className="text-slate-200 font-medium">{booking.includeDriver ? "Included" : "Self-Drive"}</span>
                    </p>
                  </div>
                </div>

                {/* Cost */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-slate-800/80 pt-4 lg:pt-0 gap-2 shrink-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total Cost</p>
                  <p className="text-xl font-bold font-mono text-amber-500">${booking.totalCost}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}