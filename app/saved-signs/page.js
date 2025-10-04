"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { Download, Trash2, Edit } from "lucide-react";
import SearchBar from "../../components/SearchBar";
import SavedSignatureCard from "../../components/SavedSignatureCard";
import EditTitleModal from "../../components/EditTitleModal";

export default function SavedSignsPage() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("signatures");
    if (raw) setList(JSON.parse(raw));
  }, []);

  function persist(next) {
    localStorage.setItem("signatures", JSON.stringify(next));
    setList(next);
  }

  function handleDelete(id) {
    const next = list.filter((i) => i.id !== id);
    persist(next);
    toast.success("Signature deleted");
  }

  function handleDownload(item) {
    const a = document.createElement("a");
    a.href = item.dataUrl;
    a.download = `${item.title || "signature"}.png`;
    a.click();
    toast.success("Signature downloaded");
  }

  function handleRename(id, newTitle) {
    const next = list.map((i) =>
      i.id === id ? { ...i, title: newTitle } : i
    );
    persist(next);
  }

  const filtered = list.filter((i) =>
    i.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-white text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Saved Signatures</h1>
          <nav>
            <Link href="/" className="text-sm px-3 py-1 bg-white/10 rounded">
              Create
            </Link>
          </nav>
        </header>

        {/* Search */}
        <div className="bg-white/5 rounded-xl p-6 mb-4 ">
          <SearchBar value={query} onChange={setQuery} />
      

        {/* Signatures Grid */}
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              className="text-gray-400 text-center py-10 "
             
            >
              No signatures found.
            </motion.div>
          ) : (
            <motion.div
              layout
              className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filtered.map((item) => (
                <SavedSignatureCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                  onEdit={(item) => setEditingItem(item)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <EditTitleModal
        isOpen={!!editingItem}
        currentTitle={editingItem?.title}
        onClose={() => setEditingItem(null)}
        onSave={(newTitle) => handleRename(editingItem.id, newTitle)}
      />
    </div>
      </div>
  );
}
