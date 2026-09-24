"use client";

import { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface PostedCarDetails {
  name: string;
  category: string;
  pricePerDay: string;
}

export default function PostCarPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "Executive",
    pricePerDay: "",
    imageUrl: "",
    speed: "",
    fuelType: "Petrol",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastPosted, setLastPosted] = useState<PostedCarDetails | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      await addDoc(collection(db, "cars"), {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        isAvailable: true,
        createdAt: serverTimestamp(),
      });

      // Save summary details for the modal prior to clearing state
      setLastPosted({
        name: formData.name,
        category: formData.category,
        pricePerDay: formData.pricePerDay,
      });

      // Reset form
      setFormData({
        name: "",
        category: "Executive",
        pricePerDay: "",
        imageUrl: "",
        speed: "",
        fuelType: "Petrol",
        description: "",
      });

      // Open Modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding vehicle: ", error);
      setErrorMsg("Failed to post vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl">
        <h1 className="text-xl font-bold text-white mb-2">Add New Vehicle</h1>
        <p className="text-xs text-slate-400 mb-6">Create a fleet listing for public user booking.</p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-950/50 text-red-400 border border-red-500/30 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Car Name / Model</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. NICON Apex GT"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Executive">Executive</option>
                <option value="SUV">SUV</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Daily Rate ($)</label>
              <input
                type="number"
                required
                value={formData.pricePerDay}
                onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                placeholder="180"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
              placeholder="Provide vehicle specifications..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? "Posting Vehicle..." : "Post Vehicle to Fleet"}
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            {/* Success Checkmark Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
              <svg
                className="h-6 w-6 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Vehicle Posted Successfully!</h3>
            <p className="text-xs text-slate-400 mb-4">
              The listing has been added to the fleet and is available for booking.
            </p>

            {lastPosted && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-6 text-left text-xs space-y-1">
                <p className="text-slate-300">
                  <span className="text-slate-500 font-medium">Model:</span> {lastPosted.name}
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-500 font-medium">Category:</span> {lastPosted.category}
                </p>
                <p className="text-slate-300">
                  <span className="text-slate-500 font-medium">Daily Rate:</span> ${lastPosted.pricePerDay}/day
                </p>
              </div>
            )}

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}