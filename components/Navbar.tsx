"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { db } from "@/config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FaCar, FaBell, FaUserShield, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  const isAdmin = session?.user?.role === "admin";
  const userEmail = session?.user?.email;

  // Real-time listener for unread notifications count
  useEffect(() => {
    if (!userEmail) {
      setUnreadCount(0);
      return;
    }

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userEmail),
      where("isRead", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.size);
    }, (error) => {
      console.error("Navbar notification listener error:", error);
    });

    return () => unsubscribe();
  }, [userEmail]);

  return (
    <nav className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-base">
          <FaCar className="text-amber-500 w-5 h-5" />
          <span>NICON <span className="text-amber-500">LUXURY</span></span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-medium">
          <Link href="/book" className="text-slate-300 hover:text-white transition-colors">
            Book Fleet
          </Link>

          {/* Admin Center Link (ADMIN ONLY) */}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all"
            >
              <FaUserShield /> Admin Center
            </Link>
          )}

          {/* Notification Bell with Counter */}
          {session && (
            <Link href="/notifications" className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <FaBell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          )}

          {/* Auth Action Button */}
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-xl transition-colors"
            >
              <FaSignInAlt /> Sign In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}