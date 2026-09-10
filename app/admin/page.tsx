"use client";

import React, { useState } from "react";
import {
  FaCar,
  FaCheck,
  FaTimes,
  FaClock,
  FaUser,
  FaTools,
  FaFilter,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";

// Types
type FleetStatus = "available" | "pending" | "rented" | "maintenance";
type BookingStatus = "pending" | "approved" | "rejected";

interface BookingRequest {
  id: string;
  userName: string;
  userEmail: string;
  carName: string;
  carId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  requestedAt: string;
}

interface FleetItem {
  id: string;
  name: string;
  category: string;
  plateNumber: string;
  dailyRate: number;
  status: FleetStatus;
}

// Initial Mock Data
const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: "BK-1001",
    userName: "Alex Johnson",
    userEmail: "alex@example.com",
    carName: "CYBERTRUCK DUAL-MOTOR",
    carId: "c1",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    totalPrice: 720,
    status: "pending",
    requestedAt: "10 mins ago",
  },
  {
    id: "BK-1002",
    userName: "Sarah Connor",
    userEmail: "sarah@skynet.io",
    carName: "PORSCHE 911 GT3 RS",
    carId: "c2",
    startDate: "2026-08-12",
    endDate: "2026-08-15",
    totalPrice: 960,
    status: "pending",
    requestedAt: "45 mins ago",
  },
  {
    id: "BK-1003",
    userName: "Michael Knight",
    userEmail: "mknight@foundation.org",
    carName: "DODGE CHARGER HELLCAT",
    carId: "c3",
    startDate: "2026-08-01",
    endDate: "2026-08-05",
    totalPrice: 600,
    status: "approved",
    requestedAt: "2 days ago",
  },
];

const INITIAL_FLEET: FleetItem[] = [
  { id: "c1", name: "CYBERTRUCK DUAL-MOTOR", category: "EV / Truck", plateNumber: "EV-889-LA", dailyRate: 180, status: "pending" },
  { id: "c2", name: "PORSCHE 911 GT3 RS", category: "Sports", plateNumber: "GT3-911-CA", dailyRate: 320, status: "pending" },
  { id: "c3", name: "DODGE CHARGER HELLCAT", category: "Muscle", plateNumber: "HELL-707-NV", dailyRate: 150, status: "rented" },
  { id: "c4", name: "LAMBORGHINI URUS PERFORMANTE", category: "SUV Supercar", plateNumber: "URUS-001-NY", dailyRate: 450, status: "available" },
  { id: "c5", name: "BMW M5 COMPETITION", category: "Sedan", plateNumber: "M5-COMP-TX", dailyRate: 210, status: "maintenance" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings" | "fleet">("bookings");
  const [bookings, setBookings] = useState<BookingRequest[]>(INITIAL_BOOKINGS);
  const [fleet, setFleet] = useState<FleetItem[]>(INITIAL_FLEET);
  const [bookingFilter, setBookingFilter] = useState<string>("ALL");

  // --- ACTIONS ---

  // Handle approving a booking
  const handleApproveBooking = (bookingId: string, carId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "approved" } : b))
    );
    // Mark car as rented when booking is approved
    setFleet((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, status: "rented" } : c))
    );
  };

  // Handle rejecting a booking
  const handleRejectBooking = (bookingId: string, carId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "rejected" } : b))
    );
    // Revert car back to available
    setFleet((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, status: "available" } : c))
    );
  };

  // Directly change fleet car status
  const handleFleetStatusChange = (carId: string, newStatus: FleetStatus) => {
    setFleet((prev) =>
      prev.map((c) => (c.id === carId ? { ...c, status: newStatus } : c))
    );
  };

  // Filtered booking list
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === "ALL") return true;
    return b.status === bookingFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans pb-24">
      {/* --- ADMIN HEADER --- */}
      <header className="border-b-2 border-slate-800 bg-slate-950 px-4 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest border-2 border-amber-400">
                ADMIN COMMAND CENTER
              </span>
              <span className="px-2 py-1 bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                LIVE CONTROL
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              FLEET & <span className="text-amber-500">BOOKINGS</span> MANAGEMENT
            </h1>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-900 border-2 border-slate-700 p-3 shadow-[4px_4px_0px_0px_#f59e0b]">
              <span className="text-slate-400 block text-[10px] uppercase">Pending</span>
              <span className="text-xl font-black text-amber-400">
                {bookings.filter((b) => b.status === "pending").length}
              </span>
            </div>
            <div className="bg-slate-900 border-2 border-slate-700 p-3 shadow-[4px_4px_0px_0px_#22c55e]">
              <span className="text-slate-400 block text-[10px] uppercase">Rented</span>
              <span className="text-xl font-black text-green-400">
                {fleet.filter((c) => c.status === "rented").length}
              </span>
            </div>
            <div className="bg-slate-900 border-2 border-slate-700 p-3 shadow-[4px_4px_0px_0px_#ffffff]">
              <span className="text-slate-400 block text-[10px] uppercase">Available</span>
              <span className="text-xl font-black text-white">
                {fleet.filter((c) => c.status === "available").length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- DASHBOARD NAVIGATION TABS --- */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex border-b-2 border-slate-800 mb-8 gap-4">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`py-3 px-6 font-black text-sm uppercase tracking-wider border-t-2 border-x-2 transition-all cursor-pointer ${
              activeTab === "bookings"
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-[4px_-4px_0px_0px_#ffffff]"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Booking Requests ({bookings.filter((b) => b.status === "pending").length} Pending)
          </button>

          <button
            onClick={() => setActiveTab("fleet")}
            className={`py-3 px-6 font-black text-sm uppercase tracking-wider border-t-2 border-x-2 transition-all cursor-pointer ${
              activeTab === "fleet"
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-[4px_-4px_0px_0px_#ffffff]"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Fleet Inventory Control ({fleet.length})
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: BOOKING APPROVAL WORKFLOW                          */}
        {/* ========================================================= */}
        {activeTab === "bookings" && (
          <section>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono font-bold uppercase text-slate-500 flex items-center gap-1">
                <FaFilter /> Filter:
              </span>
              {["ALL", "PENDING", "APPROVED", "REJECTED"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBookingFilter(filter)}
                  className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 transition-all cursor-pointer ${
                    bookingFilter === filter
                      ? "bg-slate-100 text-slate-950 border-white shadow-[2px_2px_0px_0px_#f59e0b]"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Requests Cards List */}
            <div className="space-y-4">
              {filteredBookings.map((req) => (
                <div
                  key={req.id}
                  className={`bg-slate-900 border-2 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                    req.status === "pending"
                      ? "border-amber-500 shadow-[6px_6px_0px_0px_#f59e0b]"
                      : req.status === "approved"
                      ? "border-green-500 shadow-[6px_6px_0px_0px_#22c55e]"
                      : "border-slate-800 opacity-60"
                  }`}
                >
                  {/* Left Info Column */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-amber-400 font-bold">{req.id}</span>
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <FaClock /> {req.requestedAt}
                      </span>

                      {/* Status Pill */}
                      <span
                        className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border ${
                          req.status === "pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500"
                            : req.status === "approved"
                            ? "bg-green-500/10 text-green-400 border-green-500"
                            : "bg-red-500/10 text-red-400 border-red-500"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white uppercase">{req.carName}</h3>

                    <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <FaUser className="text-amber-500" /> {req.userName} ({req.userEmail})
                      </span>
                      <span>
                        Dates: <strong className="text-white">{req.startDate}</strong> to{" "}
                        <strong className="text-white">{req.endDate}</strong>
                      </span>
                      <span>
                        Total: <strong className="text-amber-400">${req.totalPrice}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Right Actions Column */}
                  {req.status === "pending" ? (
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleApproveBooking(req.id, req.carId)}
                        className="px-5 py-2.5 bg-green-500 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-green-400 shadow-[3px_3px_0px_0px_#ffffff] hover:bg-green-400 cursor-pointer flex items-center gap-2"
                      >
                        <FaCheck /> Approve Booking
                      </button>

                      <button
                        onClick={() => handleRejectBooking(req.id, req.carId)}
                        className="px-5 py-2.5 bg-red-600 text-white font-black text-xs uppercase tracking-wider border-2 border-red-500 shadow-[3px_3px_0px_0px_#000000] hover:bg-red-500 cursor-pointer flex items-center gap-2"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-500 italic">
                      Action Completed ({req.status.toUpperCase()})
                    </div>
                  )}
                </div>
              ))}

              {filteredBookings.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-800 p-6">
                  <p className="font-mono text-xs text-slate-500">NO BOOKINGS FOUND UNDER THIS FILTER</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* TAB 2: FLEET INVENTORY CONTROL                            */}
        {/* ========================================================= */}
        {activeTab === "fleet" && (
          <section>
            <div className="bg-slate-900 border-2 border-slate-800 overflow-x-auto shadow-[8px_8px_0px_0px_#000000]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 border-b-2 border-slate-800 text-amber-400 uppercase font-black">
                  <tr>
                    <th className="p-4">Car Machine</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Plate No.</th>
                    <th className="p-4">Daily Rate</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {fleet.map((car) => (
                    <tr key={car.id} className="hover:bg-slate-950/50">
                      <td className="p-4 font-black text-sm text-white uppercase">{car.name}</td>
                      <td className="p-4 text-slate-400">{car.category}</td>
                      <td className="p-4 font-bold text-slate-300">{car.plateNumber}</td>
                      <td className="p-4 text-amber-400 font-bold">${car.dailyRate}/day</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border inline-block ${
                            car.status === "available"
                              ? "bg-green-500/10 text-green-400 border-green-500"
                              : car.status === "pending"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500"
                              : car.status === "rented"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500"
                              : "bg-red-500/10 text-red-400 border-red-500"
                          }`}
                        >
                          {car.status === "rented" ? "RENTED / USED" : car.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {/* Status Toggle Dropdown / Buttons */}
                        <div className="flex items-center justify-end gap-1">
                          {(["available", "pending", "rented", "maintenance"] as FleetStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleFleetStatusChange(car.id, st)}
                              disabled={car.status === st}
                              className={`px-2 py-1 text-[10px] font-black uppercase border transition-all cursor-pointer ${
                                car.status === st
                                  ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-50"
                                  : "bg-slate-950 text-slate-300 border-slate-700 hover:border-amber-400 hover:text-white"
                              }`}
                            >
                              {st === "rented" ? "used" : st}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}