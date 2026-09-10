"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  orderBy 
} from "firebase/firestore";
import { 
  FaBell, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaInfoCircle, 
  FaCar, 
  FaCheckDouble 
} from "react-icons/fa";

interface NotificationItem {
  id: string;
  bookingId: string;
  title: string;
  message: string;
  type: "info" | "success" | "danger";
  isRead: boolean;
  createdAt: any;
}

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore Listener
  useEffect(() => {
    if (!session?.user?.email) return;

    const notifRef = collection(db, "notifications");
    const q = query(
      notifRef,
      where("userId", "==", session.user.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotifs: NotificationItem[] = [];
      snapshot.forEach((doc) => {
        fetchedNotifs.push({ id: doc.id, ...doc.data() } as NotificationItem);
      });

      // Sort client-side by creation timestamp (newest first)
      fetchedNotifs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

      setNotifications(fetchedNotifs);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Listener Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [session?.user?.email]);

  // Mark single notification as read
  const markAsRead = async (id: string) => {
    try {
      const notifDoc = doc(db, "notifications", id);
      await updateDoc(notifDoc, { isRead: true });
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.isRead);
    for (const notif of unread) {
      await markAsRead(notif.id);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-emerald-400 w-5 h-5 shrink-0" />;
      case "danger":
        return <FaTimesCircle className="text-rose-400 w-5 h-5 shrink-0" />;
      default:
        return <FaInfoCircle className="text-amber-400 w-5 h-5 shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8">
        <div>
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider flex items-center gap-2">
            <FaBell /> Live Alerts
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Booking Notifications</h1>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer"
          >
            <FaCheckDouble className="text-amber-500" /> Mark all read
          </button>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400 text-xs">
          You have no notifications yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                notif.isRead
                  ? "bg-slate-950/60 border-slate-800/60 opacity-70"
                  : "bg-slate-900 border-amber-500/30 shadow-lg shadow-amber-500/5"
              }`}
            >
              {getIcon(notif.type)}

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-semibold ${notif.isRead ? "text-slate-300" : "text-white"}`}>
                    {notif.title}
                  </h3>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}