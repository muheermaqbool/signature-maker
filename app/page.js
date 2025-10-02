"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HoldButton from "../components/HoldButton";
import SignatureCanvas from "../components/SignatureCanvas/SignatureCanvas";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";


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
  const dataUrl = canvasApiRef.current?.save?.();
  if (!dataUrl) {
    alert("Canvas is empty. Please draw your signature first.");
    return;
  }
  const id = `${Date.now()}-${Math.floor(Math.random() * 9999)}`;
  const item = { id, title: title || "Untitled", dataUrl };
  const next = [item, ...savedList];
  persist(next);
  setPreview(dataUrl);
  setIsModalOpen(false);
  setTitle("");
}



function removeSaved(id) {
const next = savedList.filter((s) => s.id !== id);
persist(next);
}
return (
    <>
    {loading && <LoadingScreen duration={2000} onFinish={() => setLoading(false)} />}

{!loading && (  <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-black via-gray-900 to-white text-white">
<motion.div className="w-full max-w-4xl" layout>
<header className="flex items-center justify-between py-6">
<h1 className="text-3xl font-bold">Signature Maker</h1>
<nav className="flex gap-3">
<a href="/saved-signs" className="text-sm px-3 py-1 bg-white/10 rounded">Saved Signs</a>
</nav>
</header>
<main className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<div className="bg-black/70 rounded-2xl p-6">
<div className="flex items-center justify-between mb-4">
<div>
<div className="text-sm opacity-80">Create signature</div>
<div className="text-xs opacity-60">Hold + draw — save with a title</div>
</div>


<div className="flex items-center gap-3">
<HoldButton onComplete={onHoldComplete} />
</div>
</div>


<div className="bg-white rounded-lg p-4 flex items-center justify-center min-h-[160px]">
{preview ? (
<img src={preview} className="max-h-40 object-contain" alt="preview" />
) : (
<div className="text-gray-400">No preview yet — create a signature</div>
)}
</div>
<div className="flex gap-3 justify-end mt-4">
<button
onClick={() => {
if (savedList.length === 0) return;
const raw = savedList[0];
const a = document.createElement('a');
a.href = raw.dataUrl;
a.download = `${raw.title || 'signature'}.png`;
a.click();
}}
className={`px-4 py-2 rounded-md ${savedList.length ? 'bg-white text-black' : 'opacity-40 cursor-not-allowed border'} `}
>
Download Latest
</button>
</div>
</div>
</div>


<div>
<div className="bg-white/5 rounded-2xl p-6">
<div className="mb-3">
<div className="text-sm opacity-80">Recent saves</div>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
{savedList.length === 0 ? (
<div className="text-gray-400">No saved signatures yet.</div>
) : (
savedList.slice(0,4).map((item) => (
<div key={item.id} className="bg-white rounded p-3 text-black flex flex-col gap-2">
<div className="font-medium truncate">{item.title}</div>
<img src={item.dataUrl} className="max-h-24 object-contain" alt={item.title} />
</div>
))
)}
</div>


<div className="mt-4">
<a href="/saved-signs" className="text-sm px-3 py-2 bg-white/10 rounded">View all</a>
</div>
</div>
</div>
</main>
{/* Modal for signing */}
<AnimatePresence>
{isModalOpen && (
<motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
<div className="absolute inset-0 bg-black/60" onClick={() => setIsModalOpen(false)} />
<motion.div className="relative bg-white text-black rounded-xl p-6 w-full max-w-2xl" initial={{scale:0.95, y:10}} animate={{scale:1, y:0}} exit={{scale:0.95, y:10}}>
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-medium">Draw your signature</h3>
<div className="flex gap-2">
<button onClick={() => canvasApiRef.current?.clear?.()} className="px-3 py-1 border rounded cursor-pointer">Clear</button>
<button onClick={() => setIsModalOpen(false)} className="px-3 py-1 border rounded cursor-pointer">Close</button>
</div>
</div>


<div>
<SignatureCanvas onSave={canvasApiRef} />
</div>


<div className="mt-3">
    <form onSubmit={(e) => { e.preventDefault(); saveWithTitle(); }} className="flex gap-2">
<input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. Bank form)" className="flex-1 rounded-md px-3 py-2 border" />
<button type="submit" className="px-4 py-2 bg-black text-white rounded">Save</button>
</form>
</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
</motion.div>
<Footer/>
</div> )}
</>
);
}