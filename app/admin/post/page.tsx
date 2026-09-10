"use client";

import { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "cars"), {
        ...formData,
        pricePerDay: Number(formData.pricePerDay),
        isAvailable: true,
        createdAt: serverTimestamp(),
      });
      setMessage("Car posted successfully to fleet!");
      setFormData({
        name: "",
        category: "Executive",
        pricePerDay: "",
        imageUrl: "",
        speed: "",
        fuelType: "Petrol",
        description: "",
      });
    } catch (error) {
      console.error("Error adding vehicle: ", error);
      setMessage("Failed to post vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl">
      <h1 className="text-xl font-bold text-white mb-2">Add New Vehicle</h1>
      <p className="text-xs text-slate-400 mb-6">Create a fleet listing for public user booking.</p>

      {message && (
        <div className="mb-4 p-3 bg-slate-800 text-amber-400 border border-amber-500/20 text-xs rounded-xl">
          {message}
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
          <label className="block font-medium text-slate-300 mb-1">Image URL</label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
            placeholder="https://..."
          />
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
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
        >
          {loading ? "Posting Vehicle..." : "Post Vehicle to Fleet"}
        </button>
      </form>
    </div>
  );
}