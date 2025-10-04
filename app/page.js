"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HoldButton from "../components/HoldButton";
import SignatureCanvas from "../components/SignatureCanvas/SignatureCanvas";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import toast from "react-hot-toast";

export default function HomePage() {
  

  const canvasApiRef = useRef(null);
  const [savedList, setSavedList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("signatures");
    if (raw) setSavedList(JSON.parse(raw));
  }, []);

  function persist(list) {
    localStorage.setItem("signatures", JSON.stringify(list));
    setSavedList(list);
  }

  function onHoldComplete() {
    // open signing modal
    setIsModalOpen(true);
    // clear existing canvas
    setTimeout(() => canvasApiRef.current?.clear?.(), 80);
  }

  function saveWithTitle() {
    if (canvasApiRef.current?.isEmpty()) {
      toast.error("Canvas is empty. Please draw your signature first.");
      return;
    }

    const dataUrl = canvasApiRef.current?.save();
    const id = `${Date.now()}-${Math.floor(Math.random() * 9999)}`;
    const item = { id, title: title || "Untitled", dataUrl };
    const next = [item, ...savedList];
    persist(next);
    setPreview(dataUrl);
    setIsModalOpen(false);
    setTitle("");
    toast.success("Signature saved successfully ");
  }

  function removeSaved(id) {
    const next = savedList.filter((s) => s.id !== id);
    persist(next);
  }
  return (
    <>
   
      {loading && (
        <LoadingScreen duration={2000} onFinish={() => setLoading(false)} />
      )}

      {!loading && (
        <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 bg-gradient-to-br from-black via-gray-900 to-white text-white">
  <motion.div className="w-full max-w-4xl" layout>
    {/* Header */}
    <header className="flex  sm:flex-row items-start sm:items-center justify-between py-4 sm:py-6 gap-2 sm:gap-0">
      <h1 className="text-1xl sm:text-4xl font-bold">Signature Maker</h1>
      <nav className="flex gap-2 sm:gap-3">
        <a
          href="/saved-signs"
          className="text-sm px-3 py-1 bg-white/10 rounded"
        >
          Saved Signs
        </a>
      </nav>
    </header>

    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Create Signature Section */}
      <div>
        <div className="bg-black/70 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <div className="text-sm opacity-80">Create signature</div>
              <div className="text-xs opacity-60">
                Hold + draw — save with a title
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <HoldButton onComplete={onHoldComplete} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-4 flex items-center justify-center min-h-[160px] sm:min-h-[180px]">
            {preview ? (
              <img
                src={preview}
                className="max-h-36 sm:max-h-40 object-contain"
                alt="preview"
              />
            ) : (
              <div className="text-gray-400 text-sm sm:text-base">
                No preview yet — create a signature
              </div>
            )}
          </div>

          <div className="flex gap-2 sm:gap-3 justify-end mt-3 sm:mt-4">
            <button
              onClick={() => {
                if (savedList.length === 0) return;
                const raw = savedList[0];
                const a = document.createElement("a");
                a.href = raw.dataUrl;
                a.download = `${raw.title || "signature"}.png`;
                a.click();
              }}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base ${
                savedList.length
                  ? "bg-white text-black"
                  : "opacity-40 cursor-not-allowed border"
              }`}
            >
              Download Latest
            </button>
          </div>
        </div>
      </div>

      {/* Recent Saves Section */}
      <div>
        <div className="bg-white/5 rounded-2xl p-4 sm:p-6">
          <div className="mb-3">
            <div className="text-sm opacity-80">Recent saves</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedList.length === 0 ? (
              <div className="text-gray-400 text-sm sm:text-base">
                No saved signatures yet.
              </div>
            ) : (
              savedList.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded p-2 sm:p-3 text-black flex flex-col gap-2"
                >
                  <div className="font-medium truncate text-sm sm:text-base">
                    {item.title}
                  </div>
                  <img
                    src={item.dataUrl}
                    className="max-h-20 sm:max-h-24 object-contain"
                    alt={item.title}
                  />
                </div>
              ))
            )}
          </div>

          <div className="mt-3 sm:mt-4">
            <a
              href="/saved-signs"
              className="text-sm sm:text-base px-3 py-2 bg-white/10 rounded inline-block"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </main>

    {/* Modal for signing */}
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white text-black rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-2xl shadow-lg"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-lg font-medium">
                Draw your signature
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => canvasApiRef.current?.clear?.()}
                  className="px-3 py-1 border rounded cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 border rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            <div>
              <SignatureCanvas onSave={canvasApiRef} />
            </div>

            <div className="mt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveWithTitle();
                }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (e.g. Bank form)"
                  className="flex-1 rounded-md px-3 py-2 border"
                />
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 bg-black text-white rounded hover:shadow transition hover:scale-[1.02]"
                >
                  Save
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
  <Footer />
</div>

      )}
    </>
  );
}
