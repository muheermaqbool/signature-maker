"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SavedSignatureCard from "../../components/SavedSignatureCard";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";


export default function SavedSignsPage() {
const [list, setList] = useState([]);
const [query, setQuery] = useState("");


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
}


const filtered = list.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()));


return (
<div className="min-h-screen p-6 bg-gradient-to-br from-black via-gray-900 to-white text-white">
<div className="max-w-5xl mx-auto">
<header className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-bold">Saved Signatures</h1>
<nav>
<Link href="/" className="text-sm px-3 py-1 bg-white/10 rounded">Create</Link>
</nav>
</header>


<div className="bg-white/5 rounded-xl p-6">
<div className="mb-4">
<SearchBar value={query} onChange={setQuery} />
</div>


<AnimatePresence>
{filtered.length === 0 ? (
<motion.div  className="text-gray-400">No signatures found.</motion.div>
) : (
<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
{filtered.map((item) => (
<SavedSignatureCard key={item.id} item={item} onDelete={handleDelete} />
))}
</motion.div>
)}
</AnimatePresence>
</div>
</div>
</div>
);
}