"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Edit, Layers } from "lucide-react";
import toast from "react-hot-toast";

export default function SavedSignatureCard({ item, onDelete, onDownload, onEdit }) {
  const [hovered, setHovered] = useState(false);

  // Transparent PNG download
  function downloadTransparent() {
    const img = new Image();
    img.src = item.dataUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Make white pixels transparent
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);

      const transparentUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = transparentUrl;
      a.download = `${item.title || "signature"}-transparent.png`;
      a.click();

      toast.success("Transparent PNG downloaded!");
    };
  }

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
        className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 p-2 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Normal Download */}
        <button
          onClick={() => onDownload(item)}
          className="flex items-center justify-center p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
          title="Download PNG"
        >
          <Download className="w-4 h-4 text-black" />
        </button>

        {/* Transparent Download */}
        <button
          onClick={downloadTransparent}
          className="flex items-center justify-center p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
          title="Download Transparent PNG"
        >
          <Layers className="w-4 h-4 text-blue-500" />
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(item)}
          className="flex items-center justify-center p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
          title="Edit Title"
        >
          <Edit className="w-4 h-4 text-black" />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(item.id)}
          className="flex items-center justify-center p-2 bg-white rounded-full shadow hover:bg-red-100 cursor-pointer"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </motion.div>
    </motion.div>
  );
}
