"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FaBell } from "react-icons/fa";

export default function NotificationBell() {
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  const userEmail = session?.user?.email;

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

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setUnreadCount(snapshot.size);
      },
      (error) => {
        console.error("Error fetching notification count:", error);
      }
    );

    return () => unsubscribe();
  }, [userEmail]);

  if (!session) return null;

  return (
    <Link
      href="/notifications"
      className="relative p-2 text-slate-300 hover:text-white transition-colors flex items-center justify-center"
      aria-label="Notifications"
    >
      <FaBell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}