"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Edit } from "lucide-react";
import toast from "react-hot-toast";

export default function SavedSignatureCard({ item, onDelete, onDownload, onEdit }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ scale: 1.03 }}
      className="relative bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-3 flex flex-col gap-2">
        {/* Title */}
        <div className="text-sm font-medium truncate text-black capitalize">
          {item.title || "Untitled"}
        </div>

        {/* Preview */}
        <div className="flex-1 flex items-center justify-center h-24 overflow-hidden">
          <motion.img
            src={item.dataUrl}
            alt={item.title}
            className="max-h-full object-contain"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
      </div>

      {/* Hover Action Bar */}
      <motion.div
        className="absolute inset-0  flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => onDownload(item)}
          className="p-2 bg-black rounded-full shadow hover:bg-blue-900/50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(item)}
          className="p-2 bg-gray-400 rounded-full shadow hover:bg-gray-900/50 cursor-pointer"
        >
          <Edit className="w-4 h-4 text-black" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 bg-red-400 rounded-full shadow hover:bg-red-900/50 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </motion.div>
    </motion.div>
  );
}
