"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-slate-900 border-2 border-slate-700 p-6 shadow-[8px_8px_0px_0px_#f59e0b]">
        
        <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase">
          MEMBER DASHBOARD
        </span>

        <h1 className="text-3xl font-black uppercase text-white mt-4">
          WELCOME, {session?.user?.name || "DRIVER"}
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Logged in as: {session?.user?.email} ({session?.user?.role?.toUpperCase()})
        </p>

        {/* If the user is an admin, show a quick button to open the admin panel */}
        {isAdmin && (
          <div className="mt-6 p-4 bg-red-950/40 border border-red-500">
            <p className="text-xs font-mono text-red-400 mb-2 font-bold">
              ADMIN RIGHTS DETECTED
            </p>
            <Link
              href="/admin"
              className="inline-block px-4 py-2 bg-red-600 text-white font-black text-xs uppercase border-2 border-red-400 shadow-[3px_3px_0px_0px_#ffffff]"
            >
              Open Admin Command Center
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}