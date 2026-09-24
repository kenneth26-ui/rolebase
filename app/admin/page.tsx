"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { db } from "@/config/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  FaCar, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUserTie, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaDollarSign, 
  FaExchangeAlt,
  FaArrowLeft
} from "react-icons/fa";

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  carId: string;
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

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch all user bookings from Firestore
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedBookings: Booking[] = [];
      querySnapshot.forEach((docSnap) => {
        fetchedBookings.push({
          id: docSnap.id,
          ...docSnap.data(),
        } as Booking);
      });

      setBookings(fetchedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update Booking Status (Approve / Reject) & Send User Notification
  const handleStatusChange = async (booking: Booking, newStatus: "approved" | "rejected") => {
    try {
      setUpdatingId(booking.id);

      // 1. Update booking status in Firestore
      const bookingDocRef = doc(db, "bookings", booking.id);
      await updateDoc(bookingDocRef, {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });

      // 2. If approved, update the car's availability to false so it vanishes from the user's fleet view
      if (newStatus === "approved" && booking.carId) {
        const carDocRef = doc(db, "cars", booking.carId);
        await updateDoc(carDocRef, {
          isAvailable: false,
          updatedAt: serverTimestamp(),
        });
      }

      // 3. Trigger notification for the user who made the reservation
      await addDoc(collection(db, "notifications"), {
        userId: booking.userEmail,
        bookingId: booking.id,
        title: `Reservation ${newStatus.toUpperCase()}`,
        message: `Your booking request for ${booking.carName} (${booking.rentalDays} days) has been ${newStatus}.`,
        isRead: false,
        type: newStatus === "approved" ? "success" : "alert",
        createdAt: serverTimestamp(),
      });

      // 4. Update local state instantly
      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update booking status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter bookings list
  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === "all") return true;
    return b.status === filterStatus;
  });

  // Calculate Metrics
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const approvedCount = bookings.filter((b) => b.status === "approved").length;
  const totalRevenue = bookings
    .filter((b) => b.status === "approved")
    .reduce((acc, curr) => acc + (curr.totalCost || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans max-w-7xl mx-auto space-y-8">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard" 
              className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500 text-slate-400 hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <div>
              <span className="px-2.5 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider rounded-md">
                Admin Command Center
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Vehicle Booking Requests</h1>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Manage incoming car reservations, approve requests, and issue automatic notifications to drivers.
          </p>
        </div>

        <button 
          onClick={fetchBookings}
          className="self-start md:self-auto px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FaExchangeAlt className="w-3 h-3 text-amber-500" /> Refresh Requests
        </button>
      </div>

      {/* METRICS DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Requests</p>
            <p className="text-2xl font-bold text-white mt-1">{totalBookings}</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
            <FaCar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Pending Action</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-400">
            <FaClock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Approved Rentals</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{approvedCount}</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-400">
            <FaCheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Approved Value</p>
            <p className="text-2xl font-bold text-amber-500 mt-1 font-mono">${totalRevenue}</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
            <FaDollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* REQUESTS TABLE SECTION */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Filter Controls Header */}
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Reservation Submissions</h2>

          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border capitalize transition-all cursor-pointer ${
                  filterStatus === status
                    ? "bg-amber-500 text-slate-950 border-amber-500"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500 font-mono">Loading reservation requests...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No booking requests found matching the current filter <span className="font-semibold text-amber-500">({filterStatus})</span>.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {filteredBookings.map((booking) => (
              <div 
                key={booking.id} 
                className="p-5 sm:p-6 hover:bg-slate-950/40 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left Section: User & Vehicle Specs */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-white">{booking.carName}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 bg-slate-800 text-amber-400 rounded-md">
                      {booking.carCategory}
                    </span>

                    {/* Status Badge */}
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
                      Client: <span className="text-slate-200 font-medium">{booking.userName}</span> ({booking.userEmail})
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <FaMapMarkerAlt className="text-amber-500 shrink-0" /> {booking.pickupLocation}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <FaCalendarAlt className="text-amber-500 shrink-0" /> {booking.startDate} &rarr; {booking.endDate} ({booking.rentalDays} days)
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <FaUserTie className="text-amber-500 shrink-0" /> Chauffeur: <span className="text-slate-200 font-medium">{booking.includeDriver ? "Yes" : "No"}</span>
                    </p>
                  </div>
                </div>

                {/* Right Section: Pricing & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-slate-800/80 pt-4 lg:pt-0 gap-4 shrink-0">
                  <div className="text-left lg:text-right">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total Value</p>
                    <p className="text-xl font-bold font-mono text-amber-500">${booking.totalCost}</p>
                  </div>

                  {/* Approval / Rejection Controls */}
                  <div className="flex items-center gap-2">
                    {booking.status !== "approved" && (
                      <button
                        onClick={() => handleStatusChange(booking, "approved")}
                        disabled={updatingId === booking.id}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FaCheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}

                    {booking.status !== "rejected" && (
                      <button
                        onClick={() => handleStatusChange(booking, "rejected")}
                        disabled={updatingId === booking.id}
                        className="px-3 py-2 bg-rose-950 border border-rose-800 hover:border-rose-600 text-rose-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FaTimesCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    )}
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