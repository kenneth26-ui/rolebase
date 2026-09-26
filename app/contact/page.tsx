"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaBuilding, 
  FaUserShield,
  FaArrowRight
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Executive Fleet Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          Executive Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Connect With <span className="text-amber-500">NICON Luxury</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Whether you require bespoke diplomatic transport, corporate account management, or custom armored vehicle security, our team is available 24/7.
        </p>
      </div>

      {/* MAIN CONTACT SECTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* LEFT COLUMN: CONTACT DETAILS & HUB LOCATIONS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* PRIMARY CONTACT INFO CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
              <FaUserShield className="text-amber-500" /> Direct Desk
            </h2>

            <div className="space-y-5 text-xs sm:text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl text-amber-500 border border-slate-800 shrink-0">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Official Contact Email</p>
                  <a 
                    href="mailto:info.niconluxurycars@gmail.com" 
                    className="text-white font-semibold hover:text-amber-400 transition-colors block mt-0.5"
                  >
                    info.niconluxurycars@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl text-amber-500 border border-slate-800 shrink-0">
                  <FaPhoneAlt className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Dispatch Desk Hotline</p>
                  <p className="text-white font-semibold mt-0.5">+234 (0) 800 NICON LUXURY</p>
                  <span className="text-[10px] text-amber-500 font-mono mt-0.5 block">24/7 Priority Support</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl text-amber-500 border border-slate-800 shrink-0">
                  <FaClock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Operating Hours</p>
                  <p className="text-white font-semibold mt-0.5">24 Hours / 7 Days a Week</p>
                  <p className="text-[11px] text-slate-500">Continuous Airport & Hub Operations</p>
                </div>
              </div>
            </div>
          </div>

          {/* REGIONAL HUB LOCATIONS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-2">
              <FaBuilding /> Regional Dispatch Hubs
            </h3>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" /> Area 11 Gariki(Abuja)
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Ahmadu Bello Way, Area 11, FCT Abuja, Nigeria
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" /> Diplomatic Zone (Abuja)
                </p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Central Business District, FCT Abuja, Nigeria
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTACT INQUIRY FORM */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            
            <div className="border-b border-slate-800 pb-4 mb-6">
              <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the form below and an executive representative will respond promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-slate-950/60 border border-slate-800 rounded-xl p-8">
                <FaCheckCircle className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to NICON Luxury. Your message has been routed to our dispatch office. We will reply to <span className="text-amber-400 font-semibold">{formData.email}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "Executive Fleet Inquiry", message: "" });
                  }}
                  className="mt-4 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Chief Alexander Okeke" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alexander@company.com" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 ..." 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-medium">Inquiry Type</label>
                    <select 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    >
                      <option>Executive Fleet Inquiry</option>
                      <option>Corporate Partnership</option>
                      <option>Armored Vehicle Security</option>
                      <option>Diplomatic Chauffeur Request</option>
                      <option>General Support</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-medium">Message *</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your required itinerary, dates, or custom security specifications..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <FaPaperPlane className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* BOTTOM CTA TO BOOKING */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-bold text-white">Ready to Reserve an Executive Vehicle Immediately?</h3>
          <p className="text-xs text-slate-400">Skip the contact form and browse our active fleet matrix in real time.</p>
        </div>
        <Link 
          href="/book" 
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Explore & Book Fleet</span>
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  );
}