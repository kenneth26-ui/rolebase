"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaCrown, 
  FaArrowUp, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import { FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // INDIVIDUAL COMPANY LINKS (Edit any individual href below)
  const companyLinks = [
    { label: "Book Fleet", href: "/book" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    // { label: "Corporate Accounts", href: "/corporate" },
  ];

  // INDIVIDUAL FLEET LINKS (Edit any individual href below)
  const fleetLinks = [
    { label: "Executive Sedans", href: "/fleet/executive" },
    { label: "SUVs", href: "/fleet/suv" },
    { label: "Luxury Sprinters", href: "/fleet/luxury-sprinters" },
    // { label: "Supercars", href: "/fleet/supercars" },
    // { label: "Chauffeur Service", href: "/fleet/chauffeur-service" },
  ];

  // INDIVIDUAL LEGAL LINKS
  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  // INDIVIDUAL SOCIAL LINKS
  const socialLinks = [
    { label: "X (Twitter)", href: "https://twitter.com", icon: FaXTwitter },
    { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
    { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* --- MAIN NAVIGATION GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND & NEWSLETTER */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500 text-slate-950">
                <FaCrown className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                NICON <span className="text-amber-500">LUXURY</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Premium executive vehicle rentals and chauffeur services. Designed for discreet, comfortable, and reliable transport across Nigeria.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                Join our private mailing list
              </p>
              {subscribed ? (
                <p className="text-xs text-amber-400 font-medium py-1">
                  Thank you for subscribing.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FLEET CATEGORIES */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Our Fleet
            </h3>
            <ul className="space-y-2.5 text-xs">
              {fleetLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DIRECT CONTACT */}
          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Concierge
            </h3>
            <p className="flex items-start gap-2.5 text-slate-400">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>Area 11 Gariki, Abuja, Nigeria</span>
            </p>
            <p className="flex items-center gap-2.5 text-slate-400">
              <FaPhoneAlt className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <a href="tel:+2348006426689" className="hover:text-white transition-colors">
                +234 (0) 800 6426 689
              </a>
            </p>
            <p className="flex items-center gap-2.5 text-slate-400">
              <FaEnvelope className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <a href="mailto:concierge@niconluxury.com" className="hover:text-white transition-colors">
                concierge@niconluxury.com
              </a>
            </p>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-14 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NICON Luxury Cars. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {legalLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-slate-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                  aria-label={item.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}

            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all ml-2 cursor-pointer"
              aria-label="Back to top"
            >
              <FaArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}