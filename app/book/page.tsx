"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/config/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  FaCar, 
  FaSearch, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaGasPump, 
  FaTachometerAlt, 
  FaStar, 
  FaCheckCircle, 
  FaTimes, 
  FaUserTie,
  FaShieldAlt
} from "react-icons/fa";

interface Car {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  imageUrl: string;
  speed?: string;
  fuelType?: string;
  description?: string;
  isAvailable: boolean;
}

export default function UserBookPage() {
  const { data: session } = useSession();
  
  // Fleet State
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Reservation Modal State
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [pickupLocation, setPickupLocation] = useState("Victoria Island HQ (Lagos)");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includeDriver, setIncludeDriver] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch cars from Firestore
  useEffect(() => {
    async function fetchFleet() {
      try {
        const carsRef = collection(db, "cars");
        const q = query(carsRef, where("isAvailable", "==", true));
        const querySnapshot = await getDocs(q);

        const fetchedCars: Car[] = [];
        querySnapshot.forEach((doc) => {
          fetchedCars.push({ id: doc.id, ...doc.data() } as Car);
        });

        setCars(fetchedCars);
      } catch (err) {
        console.error("Error fetching fleet:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFleet();
  }, []);

  // Calculate rental duration in days
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const rentalDays = calculateDays();
  const driverFeePerDay = 50;
  const baseCost = selectedCar ? selectedCar.pricePerDay * rentalDays : 0;
  const driverCost = includeDriver ? driverFeePerDay * rentalDays : 0;
  const totalCost = baseCost + driverCost;

  // Filter cars by category
  const filteredCars = selectedCategory === "All" 
    ? cars 
    : cars.filter(car => car.category.toLowerCase() === selectedCategory.toLowerCase());

  // Submit Booking Request
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar) return;
    
    if (!session?.user) {
      setErrorMessage("Please sign in to complete your reservation.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // 1. Create Booking Document
      const bookingRef = await addDoc(collection(db, "bookings"), {
        userId: session.user.email || "unknown_user",
        userName: session.user.name || "Executive Guest",
        userEmail: session.user.email,
        carId: selectedCar.id,
        carName: selectedCar.name,
        carCategory: selectedCar.category,
        pickupLocation,
        startDate,
        endDate,
        rentalDays,
        includeDriver,
        totalCost,
        status: "pending", // pending admin approval
        createdAt: serverTimestamp(),
      });

      // 2. Trigger Initial Confirmation Notification for User
      await addDoc(collection(db, "notifications"), {
        userId: session.user.email,
        bookingId: bookingRef.id,
        title: "Booking Request Received",
        message: `Your reservation request for ${selectedCar.name} (${rentalDays} days) has been submitted and is awaiting admin approval.`,
        isRead: false,
        type: "info",
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Reservation requested! Check your notifications for live updates.");
      
      setTimeout(() => {
        setSelectedCar(null);
        setSuccessMessage("");
      }, 2500);

    } catch (err) {
      console.error("Error placing booking:", err);
      setErrorMessage("Failed to submit reservation request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Executive Fleet</span>
          <h1 className="text-3xl font-bold text-white mt-1">Available Vehicles</h1>
          <p className="text-xs text-slate-400 mt-1">Select a vehicle to initiate an instant reservation request.</p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {["All", "Executive", "SUV", "Electric"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? "bg-amber-500 text-slate-950 border-amber-500" 
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FLEET GRID */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-xs">Loading available fleet...</div>
      ) : filteredCars.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-12 text-center text-slate-400 text-xs">
          No vehicles currently available in this category. Please check back soon or change filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div 
              key={car.id}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 bg-slate-800 text-amber-400 rounded-md">
                    {car.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available
                  </span>
                </div>

                <div className="h-48 bg-slate-950/40 border-b border-slate-800/80 relative overflow-hidden flex items-center justify-center">
                  {car.imageUrl ? (
                    <img 
                      src={car.imageUrl} 
                      alt={car.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <FaCar className="w-20 h-20 text-slate-700 group-hover:text-amber-500 transition-colors" />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{car.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{car.description || "Premium executive transport with full comfort features."}</p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                    <span className="flex items-center gap-1.5"><FaTachometerAlt className="text-amber-500" /> {car.speed || "V8 Engine"}</span>
                    <span className="flex items-center gap-1.5"><FaGasPump className="text-amber-500" /> {car.fuelType || "Petrol"}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-2">
                <div>
                  <span className="text-xl font-bold text-amber-500">${car.pricePerDay}</span>
                  <span className="text-xs text-slate-500 font-mono"> / day</span>
                </div>
                <button 
                  onClick={() => setSelectedCar(car)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Book Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RESERVATION MODAL */}
      {selectedCar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl space-y-5">
            
            <button 
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Confirm Reservation</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{selectedCar.name}</h2>
            </div>

            {successMessage ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 shrink-0" /> {successMessage}
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                {errorMessage && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-amber-500" /> Pickup Location
                  </label>
                  <select 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Victoria Island HQ (Lagos)</option>
                    <option>Ikeja Executive Hub</option>
                    <option>Abuja Diplomatic Zone</option>
                    <option>Port Harcourt Station</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                      <FaCalendarAlt className="text-amber-500" /> Start Date
                    </label>
                    <input 
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                      <FaCalendarAlt className="text-amber-500" /> Return Date
                    </label>
                    <input 
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <FaUserTie className="text-amber-500 w-4 h-4" />
                    <div>
                      <p className="font-semibold text-white">Dedicated Chauffeur</p>
                      <p className="text-[10px] text-slate-400">+$50 / day</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIncludeDriver(!includeDriver)}
                    className={`px-3 py-1 font-semibold rounded-lg text-[11px] border transition-all ${
                      includeDriver ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    {includeDriver ? "Included" : "Add"}
                  </button>
                </div>

                {/* Breakdown Summary */}
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Rate (${selectedCar.pricePerDay} x {rentalDays} days):</span>
                    <span className="font-mono text-slate-200">${baseCost}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Chauffeur Service:</span>
                    <span className="font-mono text-slate-200">${driverCost}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-white text-sm">
                    <span>Total Estimated Cost:</span>
                    <span className="text-amber-500 font-mono text-base">${totalCost}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  {submitting ? "Submitting Request..." : "Confirm Booking Request"}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}