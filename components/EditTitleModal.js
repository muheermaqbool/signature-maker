"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import toast from "react-hot-toast";

export default function EditTitleModal({ isOpen, onClose, currentTitle, onSave }) {
  const [newTitle, setNewTitle] = useState(currentTitle || "");

  useEffect(() => {
    if (isOpen) setNewTitle(currentTitle || "");
  }, [isOpen, currentTitle]);

  function handleSave() {
    if (!newTitle.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }
    onSave(newTitle.trim());
    toast.success("Title updated!");
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          <motion.div
            className="relative bg-white text-black rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h3 className="text-lg font-medium mb-4">Edit Signature Title</h3>

            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter new title"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="cursor-pointer px-3 py-1 border rounded flex items-center gap-1 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="cursor-pointer px-4 py-1 bg-black text-white rounded flex items-center gap-1 hover:bg-gray-800"
              >
               Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
