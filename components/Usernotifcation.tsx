"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  writeBatch,
  getDocs
} from "firebase/firestore";
import { FaBell, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

interface Notification {
  id: string;
  userId: string;
  bookingId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: "success" | "alert";
  createdAt?: any;
}

export default function UserNotifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userEmail = session?.user?.email;

  // Real-time listener for user notifications
  useEffect(() => {
    if (!userEmail) return;

    const notifsRef = collection(db, "notifications");
    const q = query(
      notifsRef, 
      where("userId", "==", userEmail), 
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Notification[] = [];
      snapshot.forEach((docSnap) => {
        fetched.push({ id: docSnap.id, ...docSnap.data() } as Notification);
      });
      setNotifications(fetched);
    });

    return () => unsubscribe();
  }, [userEmail]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark single notification as read
  const markAsRead = async (id: string) => {
    try {
      const notifRef = doc(db, "notifications", id);
      await updateDoc(notifRef, { isRead: true });
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.isRead);
      if (unread.length === 0) return;

      const batch = writeBatch(db);
      unread.forEach((n) => {
        const ref = doc(db, "notifications", n.id);
        batch.update(ref, { isRead: true });
      });
      await batch.commit();
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!userEmail) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500 text-slate-300 hover:text-white transition-colors cursor-pointer"
        aria-label="Notifications"
      >
        <FaBell className="w-4 h-4 text-amber-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono rounded-md">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No notifications yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => !notif.isRead && markAsRead(notif.id)}
                  className={`p-4 transition-colors cursor-pointer flex gap-3 ${
                    notif.isRead ? "bg-slate-900/40 opacity-75" : "bg-slate-900 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {notif.type === "success" ? (
                      <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <FaExclamationCircle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">{notif.title}</p>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
}