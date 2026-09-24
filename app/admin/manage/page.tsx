"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { FaCheck, FaTimes, FaCar, FaUser, FaClock } from "react-icons/fa";

interface Booking {
  id: string;
  userId: string;
  userName: string;
  carName: string;
  pickupLocation: string;
  startDate: string;
  endDate: string;
  rentalDays: number;
  totalCost: number;
  status: "pending" | "approved" | "rejected";
}

export default function ManageBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const snapshot = await getDocs(collection(db, "bookings"));
      const list: Booking[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Booking);
      });
      setBookings(list);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update Status & Send Notification
  const handleStatusUpdate = async (booking: Booking, newStatus: "approved" | "rejected") => {
    setUpdatingId(booking.id);

    try {
      // 1. Update Booking Document Status
      const bookingDoc = doc(db, "bookings", booking.id);
      await updateDoc(bookingDoc, { status: newStatus });

      // 2. Dispatch Notification to User
      const notifMessage = newStatus === "approved"
        ? `Great news! Your booking for ${booking.carName} has been APPROVED. Pickup location: ${booking.pickupLocation}.`
        : `Your booking request for ${booking.carName} was declined. Contact support for alternative availability.`;

      await addDoc(collection(db, "notifications"), {
        userId: booking.userId,
        bookingId: booking.id,
        title: `Booking ${newStatus === "approved" ? "Approved" : "Declined"}`,
        message: notifMessage,
        type: newStatus === "approved" ? "success" : "danger",
        isRead: false,
        createdAt: serverTimestamp(),
      });

      // Refresh list
      await fetchBookings();
    } catch (err) {
      console.error("Error updating booking status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Fleet Management</span>
        <h1 className="text-2xl font-bold text-white mt-1">Manage Reservation Requests</h1>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs">Loading requests...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          No reservation requests found.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div 
              key={b.id} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md ${
                    b.status === "approved" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                    b.status === "rejected" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" :
                    "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}>
                    {b.status}
                  </span>
                  <h3 className="text-base font-bold text-white">{b.carName}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><FaUser className="text-slate-500" /> {b.userName}</span>
                  <span className="flex items-center gap-1.5"><FaClock className="text-slate-500" /> {b.rentalDays} days ({b.startDate} to {b.endDate})</span>
                  <span className="font-mono text-amber-500 font-bold">${b.totalCost}</span>
                </div>
              </div>

              {b.status === "pending" && (
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    disabled={updatingId === b.id}
                    onClick={() => handleStatusUpdate(b, "approved")}
                    className="flex-1 md:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FaCheck /> Approve
                  </button>
                  <button
                    disabled={updatingId === b.id}
                    onClick={() => handleStatusUpdate(b, "rejected")}
                    className="flex-1 md:flex-none px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}