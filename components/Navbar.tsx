"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { db } from "@/config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { 
  FaCar, 
  FaBell, 
  FaUserShield, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaChevronDown, 
  FaShieldAlt, 
  FaBus, 
  FaTachometerAlt, 
  FaUserTie,
  FaBars,
  FaTimes,
  FaComments
} from "react-icons/fa";

export default function Navbar() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);
  const [fleetDropdownOpen, setFleetDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFleetOpen, setMobileFleetOpen] = useState(false);

  const isAdmin = session?.user?.role === "admin";
  const userEmail = session?.user?.email;

  // Real-time listener for notifications
  useEffect(() => {
    // 1. Guard clause: Do not attempt query if session or email is missing
    if (!session || !userEmail) {
      setUnreadCount(0);
      return;
    }

    // 2. Build the query based on role
    const q = isAdmin
      ? query(
          collection(db, "notifications"),
          where("type", "==", "chat"),
          where("isRead", "==", false)
        )
      : query(
          collection(db, "notifications"),
          where("userId", "==", userEmail),
          where("isRead", "==", false)
        );

    // 3. Attach real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setUnreadCount(snapshot.size);
      },
      (error) => {
        console.error("Navbar notification listener error:", error);
      }
    );

    return () => unsubscribe();
  }, [session, userEmail, isAdmin]); // Constant, fixed dependency array across all renders

  // Our Fleet category links
  const fleetCategories = [
    { name: "Executive Sedans", icon: FaCar, href: "/fleet/executive", desc: "Mercedes S-Class, BMW 7 Series" },
    { name: " SUVs", icon: FaShieldAlt, href: "/fleet/suv", desc: "" },
    { name: "Luxury Sprinters", icon: FaBus, href: "/fleet/luxury-sprinters", desc: "VIP Executive Van Layouts" },

  ];

  return (
    <nav className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-white text-base"
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaCar className="text-amber-500 w-5 h-5" />
          <span>NICON <span className="text-amber-500">LUXURY</span></span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 text-xs font-medium">
          
          {!isAdmin && (
            <>
              <Link href="/book" className="text-slate-300 hover:text-white transition-colors">
                Book Fleet
              </Link>

              {/* OUR FLEET DROPDOWN MENU */}
              <div 
                className="relative"
                onMouseEnter={() => setFleetDropdownOpen(true)}
                onMouseLeave={() => setFleetDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer py-1">
                  <span>Our Fleet</span>
                  <FaChevronDown className={`w-2.5 h-2.5 text-amber-500 transition-transform ${fleetDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {fleetDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2.5 grid gap-1.5 z-50">
                    {fleetCategories.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="p-1.5 rounded-md bg-slate-950 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white group-hover:text-amber-400 transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* COMPANY LINKS */}
              <Link href="/how-it-works" className="text-slate-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
            </>
          )}

          {/* Admin Center Link (ADMIN ONLY) */}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all"
            >
              <FaUserShield /> Admin Center
            </Link>
          )}

          {/* Action Link: Admin Chats OR User Notifications */}
          {session && (
            <Link 
              href={isAdmin ? "/admin/chats" : "/notifications"} 
              className="relative p-2 text-slate-300 hover:text-white transition-colors"
              title={isAdmin ? "Live Client Chats" : "Notifications"}
            >
              {isAdmin ? <FaComments className="w-4 h-4 text-amber-500" /> : <FaBell className="w-4 h-4" />}
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

        {/* MOBILE CONTROLS (Notification Icon + Hamburger Button) */}
        <div className="flex md:hidden items-center gap-3">
          {session && (
            <Link 
              href={isAdmin ? "/admin/chats" : "/notifications"} 
              className="relative p-2 text-slate-300 hover:text-white transition-colors"
            >
              {isAdmin ? <FaComments className="w-4 h-4 text-amber-500" /> : <FaBell className="w-4 h-4" />}
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-slate-300 hover:text-amber-500 text-lg transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN PANEL */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-4 border-t border-slate-800/80 flex flex-col gap-3 text-sm font-medium">
          
          {!isAdmin && (
            <>
              <Link 
                href="/book" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-slate-200 hover:text-amber-400 transition-colors"
              >
                Book Fleet
              </Link>

              {/* Mobile Our Fleet Accordion */}
              <div>
                <button
                  onClick={() => setMobileFleetOpen(!mobileFleetOpen)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-slate-200 hover:text-amber-400 transition-colors"
                >
                  <span>Our Fleet</span>
                  <FaChevronDown className={`w-3 h-3 text-amber-500 transition-transform ${mobileFleetOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileFleetOpen && (
                  <div className="ml-3 my-1 pl-3 border-l border-slate-800 space-y-2">
                    {fleetCategories.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 py-1.5 text-xs text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          <Icon className="text-amber-500 w-3.5 h-3.5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link 
                href="/how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-slate-200 hover:text-amber-400 transition-colors"
              >
                How It Works
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-slate-200 hover:text-amber-400 transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 text-slate-200 hover:text-amber-400 transition-colors"
              >
                Contact
              </Link>
            </>
          )}

          {isAdmin && (
            <Link 
              href="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all text-xs"
            >
              <FaUserShield /> Admin Center
            </Link>
          )}

          {/* Mobile Auth Button */}
          <div className="pt-2 border-t border-slate-800/60">
            {session ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors text-xs font-semibold"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors text-xs"
              >
                <FaSignInAlt /> Sign In
              </Link>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}