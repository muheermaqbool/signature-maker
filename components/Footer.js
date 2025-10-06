"use client";
import React from "react";
import { Github, Instagram } from "lucide-react";
import BuyMeCoffee from "./BuyMeCoffee";

export default function Footer() {
  return (
    <footer className="w-full mt-20 py-10 border-t border-white/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 text-sm">
        
        {/* Left side */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
          <h2 className="text-lg font-semibold text-white">Signature App</h2>
          <p className="text-white/70">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right side - Socials */}
        <div className="flex flex-col items-center sm:items-end gap-3">
          <span className="text-md uppercase tracking-wide ">
            Connect with me
          </span>
          <div className="flex items-center gap-4 bg-white/10 rounded-full px-5 py-2 shadow-md justify-center">
          
              <BuyMeCoffee />
            

            {/* Instagram */}
            <a
              href="https://instagram.com/muheer_11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Instagram className="w-6 h-6 text-white" />
            </a>

            {/* Github */}
            <a
              href="https://github.com/muheermaqbool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Github className="w-6 h-6 text-white" />
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/muheer_11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-6 h-6 text-white"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.653l-5.2-6.82-5.947 6.82H2.02l7.73-8.88L1.5 2.25h6.808l4.713 6.182L18.244 2.25z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
