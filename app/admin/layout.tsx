// app/admin/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Call auth() directly in NextAuth v5 / Auth.js
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/book");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
        <div className="mb-8">
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Management</span>
          <h2 className="text-lg font-bold text-white">Admin Center</h2>
        </div>
        <nav className="space-y-2 text-xs font-medium">
          <Link href="/admin" className="block px-3 py-2.5 rounded-xl bg-slate-800 text-white">
            Dashboard
          </Link>
          <Link href="/admin/post" className="block px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            Post New Car
          </Link>
          <Link href="/admin/manage" className="block px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            Manage Bookings
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}