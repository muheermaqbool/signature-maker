"use client";
import React from "react";
import { Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-12 py-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4 text-sm text-gray-400">
        
        {/* Left text */}
        <div className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} Signature App — All rights reserved.
        </div>

        {/* Social links */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            Developer Socials
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/muheer_11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Instagram className="w-5 h-5" color="black" />
            </a>
            <a
              href="https://github.com/muheermaqbool"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Github className="w-5 h-5" color="black" />
            </a>
            <a
              href="https://x.com/muheer_11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill="black"
                aria-hidden="true"
                className="w-5 h-5"
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
