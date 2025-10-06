"use client";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

export default function BuyMeCoffee() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <motion.a
        href="https://buymeacoffee.com/muheermaqbx"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="
          relative flex items-center gap-2
          px-3 py-2 sm:px-4 sm:py-2 lg:px-3 lg:py-2 md:px-2 md:py-2
          rounded-xl shadow-md
          bg-white/10 border border-white/20 backdrop-blur-md
          hover:bg-white/20 transition
          text-sm sm:text-base md:text-sm
        "
      >
        <div className="relative flex items-center">
          <motion.div
            animate={{ scale: hovered ? 1.5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 drop-shadow" />
          </motion.div>

          {/* Steam animation */}
          <motion.div
            className="absolute -top-3 left-1/2 w-2 h-2 rounded-full bg-white/70"
            initial={{ opacity: 0, y: 5, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: [-5, -15], scale: [0.5, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="absolute -top-3 left-[20%] w-2 h-2 rounded-full bg-white/60"
            initial={{ opacity: 0, y: 5, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: [-8, -18], scale: [0.5, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
        </div>

        <span className="font-medium">Buy me a coffee</span>
      </motion.a>
    </div>
  );
}
